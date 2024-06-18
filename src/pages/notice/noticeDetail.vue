<template>
  <view class="page-content__wrapper__default">
    <view class="title">{{ noticeInfo.title || '' }}</view>
    <view class="time">{{ noticeInfo.createTime || '' }}</view>
    <view class="line"/>
    <rich-text class="detail" :nodes="noticeInfo.content || ''"/>
  </view>
</template>

<script setup lang='ts'>
import { onLoad } from '@dcloudio/uni-app'
import { reactive, toRefs } from 'vue'
import { noticeDetailApi } from '@/api/notice'

let pageData = reactive({
  pageSource: '',
  newsId: '',
  noticeInfo: {
    title: '',
    createTime: '',
    content: ''
  }
})

const { pageSource, newsId, noticeInfo } = toRefs(pageData)

onLoad((options) => {
  pageSource.value = options?.pageSource
  newsId.value = options?.noticeId
  getNewsDetail()
})

const getNewsDetail = async () => {
  if (pageSource.value == 'notice') {
    const res = await noticeDetailApi(newsId.value)
    noticeInfo.value = res.data
    noticeInfo.value.content = res.data.content?.replace(/img/gi, 'img style="width:100%;height:100%;"')
  }
}
</script>

<style lang='scss' scoped>
.page-content__wrapper__default {
  padding: 40rpx;

  .title {
    font-size: 30rpx;
    font-weight: 400;
    color: #333333;
  }

  .time {
    font-size: 24rpx;
    font-weight: 400;
    color: #999999;
    margin-top: 10rpx;
  }

  .line {
    border: 1rpx solid #E5E5E5;
    margin: 20rpx 0 36rpx;
  }
}
</style>