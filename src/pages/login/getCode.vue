<template>
  <view class="page-wrapper">
    <view class="title">输入验证码</view>

    <view class="tip">验证码已发送至<span>{{ phone.substring(0, 3) + '****' + phone.substring(phone.length - 4) }}</span></view>

    <div class='code'>
      <u-code-input v-model="code" :maxlength="6" @finish="overCode" size='42' space='12'/>
    </div>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { sendSmsApi, phoneCodeLoginApi } from '@/api/user'
import { useUserStore } from '@/store/user'
const userStore = useUserStore()

const phone = ref('')
let code = ref('')
let inviteCode = ref('')

onLoad((options) => {
  if (options?.phone) {
    phone.value = options.phone
  }
  if (options?.inviteCode) {
    inviteCode.value = options.inviteCode
  }

  // 发送验证码
  sendSms()
})

// 点击获取验证码
const sendSms = () => {
  sendSmsApi({
    mobile: phone.value,
    type: 2
  }).then((res) => {
    if (res.success) {
      uni.showToast({
        title: res.msg,
        icon: 'none'
      })
    }
  })
}

// 输入完验证码
const overCode = async (e:string) => {
  if (!phone.value) {
    uni.showToast({
      title: '请完善登录信息',
      icon: 'none'
    })
    return
  }
  const res = await phoneCodeLoginApi({
    phone: phone.value,
    code: e,
    bindCode: inviteCode.value
  })
  if (res.code == 200) {
    userStore.setToken(res.data.token)
    userStore.setUserInfo(res.data.user)
    handleLoginSuccessJump()
  } else {
    uni.showToast({
      title: res.msg,
      icon: 'none'
    })
  }
}

const handleLoginSuccessJump = () => {
  // 登录后返回原页面：目前藏品详情购买
  const frontPage = uni.getStorageSync('login_front')
  console.log('handleLoginSuccessJump', frontPage)
  if (frontPage) {
    uni.navigateBack({
      complete: () => {
        uni.removeStorageSync('login_front')
      }
    })
    return
  }
  // uni.switchTab({
  //   url: '/pages/user/user'
  // })
  uni.reLaunch({
    url: '/pages/user/user'
  })
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  height: 100vh;
}
</style>