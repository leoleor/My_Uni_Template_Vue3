<template>
  <view>
    <view class="auth-success">
      <!-- <image src="/static/images/user/authentication_success_icon.png" class="success-icon"/> -->
      <text class="success-text">认证通过</text>
    </view>
    <view class="bottom-btn">
      <view class="btn_next" @click="goBackCustom()">
        返回上一页
      </view>
      <view class="btn_back" @click="goBackHome()">
        返回首页
      </view>
    </view>
  </view>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const pageSource = ref('')

onLoad((options) => {
  if (options?.pageSource) pageSource.value = options.pageSource
})

// 返回上一页
const goBackCustom = () => {
  uni.navigateBack()
}

// 返回首页
const goBackHome = () => {
  uni.reLaunch({
    url: '/pages/home/home'
  })
}
</script>

<style lang='scss' scoped></style>