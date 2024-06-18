<template>
  <view>
    <view>登录</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { GEETEST_ONELOGIN_H5 } from '@/utils/constant'
// import { getNetworkType } from '@/utils/tools'
// #ifdef H5
import '@/static/libs/oneloginh5'
// #endif

let inviteCode = ref('')

onLoad((options) => {
  if (uni.getStorageSync('inviteCode')) {
    inviteCode.value = uni.getStorageSync('inviteCode')
  }
  if (options?.inviteCode) {
    inviteCode.value = options.inviteCode
    uni.setStorageSync('inviteCode', options.inviteCode)
  }

  // #ifdef H5
  // const nettype = getNetworkType()
  // if (nettype === 'wifi') {
  //   // this.otherPhoneLogin()
  //   // 可选方案：
  //   // 1: 提示用户关闭wifi 进行体验
  //   // 2: 直接降级走其他验证形式
  //   initOl().gateway()
  // } else {
  //   initOl().gateway()
  //   // stpe3: 初始化H5一键登录
  //   // if(!this.ol) {
  //   // this.ol = this.initOl();
  //   // }
  //   // this.ol.gateway()
  // }
  // #endif
  setTimeout(() => {
    uni.redirectTo({
      url: `/pages/login/otherLogin?inviteCode=${inviteCode.value}`
    })
  }, 1000)

})
const initOl = () => {
  // @ts-ignore
  const olinstance = new GOL({
    app_id: GEETEST_ONELOGIN_H5,
    logo: import('@/static/logo/icon_logo.png'),
    timeout: 10000, // 超时设置 默认30000,
    app: '数字艺术档案'
  })
  uni.showLoading()
  console.log(olinstance)
  olinstance.onTokenFail((e:any) => {
    console.log(e, '失败的')
    uni.hideLoading()
    // uni.showToast({
    // 	title: e,
    // 	icon: "none"
    // })

    // uni.redirectTo({
    // 	url: `/pages/login/otherLogin?inviteCode=${inviteCode.value}`
    // })
  }).onTokenSuccess((e:any) => {
    console.log(e, '成功的')
    uni.hideLoading()
    // this.loginClick({
    // 	...e,
    // 	processId: e.process_id,
    // 	authCode: e.auth_code,
    // 	token: e.token,
    // 	phone:e.phone,
    // 	bindCode: this.bindCode,
    // 	timestamp: new Date().getTime()
    // })
  })
  return olinstance
}
</script>

<style lang="scss" scoped>
</style>