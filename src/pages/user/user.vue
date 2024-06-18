<template>
  <view>
    <view v-if="isLogin" @click="toPageSet">设置</view>
    <view v-if="isLogin">
      用户信息
      <view @click="toPageUserMessage">{{ getUserInfo && getUserInfo.nickName ? getUserInfo.nickName : "" }}</view>
    </view>
    <view v-if="isLogin">
      会员信息
      <view class="user-sign" @click="signClick" v-if="!getUserInfo.isSignIn">签到</view>
      <view class="user-signed" v-if="getUserInfo.isSignIn">已签到</view>
      <view class="level-val">
        {{ Number.parseInt(vipInfo?.userCurrentAddUpGrowth) }}<text> / {{ Number.parseInt(vipInfo?.nextAddUpGrowth) }}</text>
      </view>
    </view>
    <view v-if="!isLogin" @click="toPage('gologin')">登录/注册</view>
  </view>
  <Tabber tabbarName="user" />
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import Tabber from '@/components/Tabber/index.vue'
import { onShow, onLoad } from '@dcloudio/uni-app'
import { signIntegralApi } from '@/api/score'
import userStoreHooks from '@/hooks/store/userStoreHooks'
const { getToken, getUserInfo, vipInfo, getUserInfoById, getVipInfo } = userStoreHooks()

const global = inject('global') as GlobalMethods
let isLogin = ref(false)

onShow(async() => {
  if (getToken.value) {
    isLogin.value = true
    if (getUserInfo.value) {
      // token存在本地可能已经过期了，这一步是确保更新
      // 通过id获取用户信息
      isLogin.value = await getUserInfoById()
    } else {
      isLogin.value = false
    }
  } else {
    isLogin.value = false
  }
})

onLoad(() => {
  // 会员信息
  getVipInfo()
})

// 签到
const signClick = () => {
  signIntegralApi().then(async(res) => {
    if (res.code == 200) {
      uni.showToast({
        icon: 'none',
        title: res.msg
      })
      await getVipInfo()
      await getUserInfoById()
    }
  })
}

// 菜单跳转
const toPage = (url: string, isNeedLogin?: boolean) => {
  // 跳转登录页
  if (url == 'gologin') {
    global.$goLogin()
    return
  }
  // 需要登录才能跳转的
  if (isNeedLogin) {
    if (isLogin.value) {
      uni.navigateTo({ url })
    } else {
      toPage('gologin')
    }
    return
  }
  uni.navigateTo({ url })
}

// 前往设置界面
const toPageSet = () => {
  // if (this.userInfo) {
  uni.navigateTo({
    url: '/pages/user/setUp'
  })
  // }
}

// 前往个人信息界面
const toPageUserMessage = () => {
  if (getUserInfo.value) {
    uni.navigateTo({
      url: '/pages/user/userInformation'
    })
  }
}
</script>

<style lang="scss" scoped>
</style>