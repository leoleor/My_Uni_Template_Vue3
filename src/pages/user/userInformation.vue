<template>
  <view class="user-menu-wrap">
    <view class="content">
      <view class="banner">
        <text>头像</text>
        <view style="display: flex;align-items: center;">
          <image :src="getUserInfo.avatar || '/static/awesome/default_avator.png'" class="avatar_bg" mode="aspectFill" @click="setUserAvatar"/>
          <u-icon name="arrow-right" color="#00000020"/>
        </view>
      </view>
      <view class="banner" @tap="goUpNickName(1)">
        <text>昵称</text>
        <view style="display: flex;align-items: center;" class="right-text">
          <text style="padding-right: 8rpx;color: #000000;">{{ getUserInfo.nickName }}</text>
          <u-icon name="arrow-right" color="#00000020"/>
        </view>
      </view>
      <view class="banner">
        <text>用户ID</text>
        <text class="right-text">{{ getUserInfo.userId }}</text>
      </view>
      <view class="banner">
        <text>手机号码</text>
        <text class="right-text">{{ getUserInfo.phone }}</text>
      </view>
      <view class="banner">
        <text>邀请码</text>
        <text class="right-text" @click="copyInviteCode">{{ getUserInfo.inviteCode }}</text>
      </view>
      <view class="banner" @tap="goUpNickName(2)">
        <text>个人简介</text>
        <view style="display: flex;align-items: center;" class="right-text">
          <view class="text-over" >{{ getUserInfo.introduce || '介绍一下自己' }}</view>
          <u-icon name="arrow-right" color="#00000020"/>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang='ts'>
import { inject } from 'vue'
import { setUserInfoApi } from '@/api/user'
import userStoreHooks from '@/hooks/store/userStoreHooks'
const { getUserInfo, getUserInfoById } = userStoreHooks()

const global = inject('global') as GlobalMethods

// 设置头像
const setUserAvatar = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    crop: {
      quality: 100, // 图片质量,不填为80
      width: 340, // 裁剪宽度
      height: 248 // 裁剪高度
    },
    success: (res: any) => {
      uni.showLoading()
      // 机审限制（5kb-4M）
      // 1M=1024KB=1048576B
      let minSize = 5 / 1024 // 5kb
      let maxSize = 4 // 4mb
      if (res.tempFiles[0].size < minSize * 1048576 || res.tempFiles[0].size > maxSize * 1048576) {
        uni.hideLoading()
        uni.showToast({
          title: `图片大小应在${minSize * 1024}kb-${maxSize}M之间`,
          icon: 'none'
        })
        return
      }
      let tempFilePaths = res.tempFilePaths
      global.$uploadFile({ url: '/api/system/oss/mini/upload', filePath: tempFilePaths[0] }).then((res) => {
        setUserInfoApi({ avatar: res.data.url }).then(() => {
          uni.hideLoading()
          uni.showToast({
            title: '修改头像成功',
            icon: 'none'
          })
          getUserInfoById()
        })
      })
    }
  })
}

// 复制邀请码
const copyInviteCode = () => {
  uni.setClipboardData({
    data: getUserInfo.value.inviteCode,
    showToast: false,
    success: () => {
      uni.showToast({
        title: '邀请码已复制'
      })
    }
  })
}

// 修改
const goUpNickName = (e:number) => {
  // type 1 修改昵称 2 修改个人简介
  if(e === 1 && getUserInfo.value.isAuthor == 1) {
    uni.showToast({
      title: '创客不能修改昵称',
      icon: 'none'
    })
    return
  }
  uni.navigateTo({
    url: '/pages/user/updateUserInfo?type=' + e
  })
}

</script>

<style lang='scss' scoped></style>