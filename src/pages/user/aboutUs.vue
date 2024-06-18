<template>
  <view class="top-bg">
    <view class="banner" @click="getProtocolData(1)">用户协议</view>
    <view class="banner" @click="getProtocolData(2)">隐私协议</view>

    <!--  #ifdef APP-PLUS -->
    <view class="banner" @click="updateClick()">升级更新</view>
    <view class="banner">
      <text>版本号</text>
      <text>V {{ config.appVersion }}</text>
    </view>
    <!--  #endif -->
  </view>
  <view class="bottoem">
    <view class="tips" @click="getProtocolData(8)">营业资质</view>
    <view class="tips2"> Copyright © 2023 数字艺术档案 </view>
  </view>
</template>

<script setup lang='ts'>
import config from '@/config/index'
import { getVersionApi } from '@/api/common'

// 点击查询APP更新
const updateClick = async () => {
  const res = await getVersionApi()
  const { dictLabel, dictValue, remark } = res.data[0]
  // 转成字符串比较的原因：12 > 110 => false 而 "12" > "110" => true
  let updateVersion = dictLabel.split('.').join('')
  let localVersion = config.appVersion.split('.').join('')
  if (updateVersion > localVersion) {
    uni.showModal({
      title: '发现新版本,是否更新？',
      content: remark,
      showCancel: false,
      success: (modal) => {
        if (modal.confirm) {
          if (uni.getSystemInfoSync().platform == 'android') {
            downloadApk(dictValue)
          }
        }
      }
    })
  } else {
    uni.showToast({
      title: '当前已是最新版本',
      icon: 'none'
    })
  }
}

// 下载安卓apk
const downloadApk = (url: string) => {
  uni.showLoading({
    title: '正在下载更新包',
    mask: true
  })
  uni.downloadFile({
    url,
    success: ({ tempFilePath: fileUrl }) => {
      plus.runtime.install(
        fileUrl,
        { force: false },
        () => {
          plus.runtime.restart()
        },
        () => {}
      )
    },
    fail: () => {
      uni.showToast({
        title: '下载更新包失败',
        icon: 'error'
      })
    },
    complete: () => {
      uni.hideLoading()
    }
  })
}

// 各种协议
const getProtocolData = (type:number) => {
  uni.navigateTo({
    url: `/pages/user/protocol?type=${type}`
  })
}
</script>

<style lang='scss' scoped></style>