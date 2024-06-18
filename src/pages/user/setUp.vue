<template>
  <view>
    <view @tap="toPage('/pages/user/userInformation')">个人资料</view>
    <view @tap="toPage('/pages/certification/certification')">实名认证 {{ getUserInfo.realNameState == 1 ? '已认证' : '未认证' }}</view>
    <view @tap="toPage('/pages/user/operaPassword')">设置操作密码</view>
    <view @tap="toPage('/pages/user/address')">收货地址</view>
    <view @tap="toPage('/pages/user/service')">咨询客服</view>
    <view @tap="toPage('/pages/user/aboutUs')">关于我们</view>
    <view @click="logout">退出</view>
  </view>
</template>

<script setup lang='ts'>
import userStoreHooks from '@/hooks/store/userStoreHooks'
const { getUserInfo, logout } = userStoreHooks()

// 跳转页面
const toPage = (url: string) => {
  if (getUserInfo.value) {
    if (url == '/pages/certification/certification' && getUserInfo.value.realNameState == 1) {
      return uni.showToast({
        title: '已实名，无需重复认证',
        icon: 'none'
      })
    }
    uni.navigateTo({
      url
    })
  }
}
</script>

<style lang='scss' scoped></style>