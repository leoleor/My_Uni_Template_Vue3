<template>
  <view class="page-wrapper">
    <view class="title">账号登录</view>
    <view class="tip">未注册手机号验证后默认注册</view>
    <input
      class="uni-input phone-input"
      type="number"
      placeholder="请输入手机号码"
      maxlength="11"
      v-model="phone"
    />
    <view class="phone-input" v-if="isInviteCodeIn">
      {{ inviteCode }}
    </view>
    <input
      class="uni-input phone-input"
      style="margin-top: 0"
      placeholder="邀请码(选填)"
      maxlength="6"
      v-model="inviteCode"
      v-else
    />
    <u-checkbox-group @change="handleAgreeChange">
      <u-checkbox shape="circle" name="1"/>
      <view class="info">
        我已认真阅读、理解并同意<span @click="goUser">《用户协议》</span>、<span @click="goPollcy">《隐私政策》</span>
      </view>
    </u-checkbox-group>
    <view @click="getCode">获取验证码</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { isMobileNumber } from '@/utils/verification'

const phone = ref('')
let inviteCode = ref('')
let isInviteCodeIn = ref(false)
let userAgree = ref(false)

onLoad((options) => {
  console.log(options, 'otherLogin-onLoad')
  if (options?.inviteCode) {
    isInviteCodeIn.value = true
    inviteCode.value = options.inviteCode
  }
})

// 切换是否已读
const handleAgreeChange = (detail = []) => {
  if (detail.length == 0) {
    userAgree.value = false
  } else {
    userAgree.value = true
  }
}

// 点击获取验证码
const getCode = () => {
  if (!userAgree.value) {
    uni.showToast({
      title: '请先同意《用户协议》和《隐私政策》',
      icon: 'none'
    })
    return
  }
  if (!isMobileNumber(phone.value)) {
    return uni.showToast({
      icon: 'none',
      title: '请输入正确的11位手机号'
    })
  }
  goGetCode()
}

// 跳转获取验证码页面
const goGetCode = () => {
  uni.redirectTo({
    url: `/pages/login/getCode?phone=${phone.value}&inviteCode=${inviteCode.value}`
  })
}

// 用户协议
const goUser = () => {

}

// 隐私政策
const goPollcy = () => {

}
</script>

<style lang="scss" scoped>
.page-wrapper {
  height: 100vh;
}
</style>