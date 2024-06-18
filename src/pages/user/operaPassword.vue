<template>
  <view>
    <view class="setting-boxs">
      <view class="list">
        <view class="list-title">设置密码</view>
        <input
          class="input none-bottom"
          type="password"
          placeholder="请输入密码"
          v-model="password"
          maxlength="6"
          placeholder-class="placeholder-style"
        />
        <view class="tips">请设置6位数字密码</view>
      </view>
      <view style="width: 100%; height: 32rpx"/>
      <view class="list">
        <view class="list-title"/>
        <input
          class="input bottom"
          type="password"
          v-model="confirmPassword"
          placeholder="请再次输入密码"
          maxlength="6"
          placeholder-class="placeholder-style"
        />
      </view>
      <view class="list">
        <view class="list-title">验证码</view>
        <input
          class="input"
          type="number"
          placeholder="请输入验证码"
          v-model="checkCode"
          maxlength="6"
          placeholder-class="placeholder-style"
        />
        <u-code
          :seconds="countDown"
          @end="btnDisabled = false"
          @start="btnDisabled = true"
          ref="uCodeRef"
          @change="codeChange"
        />
        <button
          class="send-box"
          :style="btnDisabled ? 'color: #b6b6b6;' : ''"
          @tap="handleSendCode"
          :disabled="btnDisabled"
        >
          {{ codeLabel }}
        </button>
        <view class="tips">
          验证码将发送至 <text>{{ getUserInfo.phone }}</text>
        </view>
      </view>
    </view>
    <view class="btn-wrap">
      <button class="save-btn" @click="confirmUpdate">确认</button>
      <view class="tips">
        <!-- <image
          src="/static/images/icon/aq.png"
          class="tips-img"
          mode=""
        /> -->
        数字艺术档案将对信息加密，保障您的信息安全
      </view>
    </view>
  </view>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { sendSecondarySmsApi, updateSecondaryPwdApi } from '@/api/user'
import userStoreHooks from '@/hooks/store/userStoreHooks'
const { getUserInfo } = userStoreHooks()

const REG = /^\d{6}$/
let password = ref('')
let confirmPassword = ref('')
let codeLabel = ref('获取验证码')
let countDown = ref(120) // 验证码倒计时时长
let checkCode = ref('') // 验证码
let btnDisabled = ref(false)
const uCodeRef = ref(null)

// 倒计时期间，每秒触发一次
const codeChange = (text: string) => {
  codeLabel.value = text
}

// 点击获取验证码，初始化滑块校验
const handleSendCode = () => {
  if (!REG.test(password.value)) {
    return uni.showToast({
      title: '请输入6位数字密码',
      icon: 'none'
    })
  }
  const a = getPwdContinueNumberScore(password.value)
  const b = getPwdRepeatedLetterScore(password.value)
  if (a == 4 || b == 5) {
    return uni.showToast({
      title: '密码过于简单',
      icon: 'none'
    })
  }
  if (!confirmPassword.value) {
    return uni.showToast({
      title: '请输入确认密码',
      icon: 'none'
    })
  }
  if (password.value != confirmPassword.value) {
    return uni.showToast({
      title: '两次密码输入不一致',
      icon: 'none'
    })
  }

  // 弹出滑块-之后补
  // 发送验证码
  sendCode()
}

// 重复字符
const getPwdRepeatedLetterScore = (password: string) => {
  let nRepInc = 0
  let arrPwd = password.replace('\s+', '').split('')
  let arrPwdLen = arrPwd.length

  for (let a = 0; a < arrPwdLen; a++) {
    if (arrPwd[a] === arrPwd[a + 1]) {
      nRepInc++
    }
  }
  console.log('重复字符', nRepInc)
  return nRepInc
}

// 连续数字
const getPwdContinueNumberScore = (password: string) => {
  let j = 0
  // 3位以上连续才算 如123
  for (let i = 0; i < password.length - 2; i++) {
    if (password.charCodeAt(i) >= '0'.charCodeAt(0) && password.charCodeAt(i) <= '9'.charCodeAt(0)) {
      if (password.charCodeAt(i + 1) === password.charCodeAt(i) + 1 && password.charCodeAt(i + 2) === password.charCodeAt(i) + 2) {
        j++
      }
      if (password.charCodeAt(i + 1) === password.charCodeAt(i) - 1 && password.charCodeAt(i + 2) === password.charCodeAt(i) - 2) {
        j++
      }
    }
  }
  console.log('连续数字', j)
  return j
}

// 验证成功-发送验证码请求
const sendCode = async () => {
  const resp = await sendSecondarySmsApi({
    mobile: getUserInfo.value.phone,
    type: 3
  })
  if (resp.success) {
    uni.showToast({
      title: resp.msg,
      duration: 1500,
      icon: 'success'
    })
    // @ts-ignore
    uCodeRef.value.start()
    btnDisabled.value = true
  } else {
    uni.showToast({
      title: resp.msg,
      duration: 1500,
      icon: 'none'
    })
  }
}

// 确认发送
const confirmUpdate = async () => {
  if (!checkCode.value) {
    return uni.showToast({
      title: '请输入验证码',
      icon: 'none'
    })
  }
  const resp = await updateSecondaryPwdApi({
    password: password.value,
    checkCode: checkCode.value,
    newPassword: confirmPassword.value
  })
  if (!resp.success) {
    return uni.showToast({
      title: resp.msg,
      icon: 'none'
    })
  }
  uni.showToast({
    title: '设置成功',
    duration: 1500
  })
  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
}
</script>

<style lang='scss' scoped></style>