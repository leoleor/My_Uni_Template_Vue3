<template>
  <view class="page-container__custom">
    <u-navbar title="艺贝资讯" leftIcon="" />
    <view class="page-content__wrapper">
      <view
        class="notice-list__card"
        v-for="(item, index) in list"
        :key="index"
        @click="noticeClick(item.noticeId)"
      >
        <view class="notice-row__item">
          <!-- <view class="row-icon" v-show="item.isRead == 0"></view> -->
          <view class="row-title">{{ item.title || "" }}</view>
          <view class="row-time">
            {{
              item.isNow
                ? global.$timeFormat(item.createTime, "hh:MM")
                : global.$timeFormat(item.createTime, "yy/mm/dd")
            }}
          </view>
        </view>
        <view class="notice-row__item">
          <view class="row-value">{{ removeTag(item.content) }}</view>
        </view>
      </view>
    </view>

    <u-empty
      v-if="list.length === 0"
      text="暂无更多公告~"
      width="268rpx"
      height="220rpx"
      marginTop="220rpx"
    />
  </view>
</template>

<script setup lang='ts'>
import { reactive, toRefs, inject } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { rollNoticeApi } from '@/api/notice'

const global = inject('global') as GlobalMethods

const pageData = reactive<{
  list: {
    noticeId: string,
    title: string,
    createTime: string,
    content: string,
    isNow: boolean
  }[]
}>({
  list: []
})

const { list } = toRefs(pageData)

onLoad(async() => {
  console.log(process.env.NODE_ENV)
  const res = await rollNoticeApi()
  list.value = res.data
})

// 点击详情
const noticeClick = (id:string) => {
  uni.navigateTo({
    url: '/pages/notice/noticeDetail?noticeId=' + id + '&pageSource=notice'
  })
}

// 去除富文本标签
const removeTag = (content:string) => {
  content = content.replace(/<\/?[^>]*>/g, '') //匹配所有html标签
  content = content.replace(/<p[^>]*>/g, '<p class="tag-class">') //去除标签内所有属性，并设置自定义类名
  content = content.replace(/(\n)/g, '') //去除换行
  content = content.replace(/\s+style="[^"]*"/g, '') //去除style样式
  content = content.replace(/&nbsp;/gi, '') //去除空格
  content = content.replace(/\<img/gi, '<img class="img_class"') //添加自定义样式
  return content
}
</script>

<style lang='scss' scoped>
.page-container__custom {
  background: #f3f4f8;
}
.page-content__wrapper {
  padding: 0 20rpx;
  padding-top: calc(88rpx + 88rpx);
  height: 100vh;
  box-sizing: border-box;
}
.notice-list__card {
  background: #ffffff;
  border-radius: 26rpx;
  margin: 20rpx 0 0;
  box-sizing: border-box;
  padding: 24rpx;
  .notice-row__item {
    display: flex;
    justify-content: space-between;
    letter-spacing: 2rpx;
    align-items: center;

    .row-title {
      font-size: 28rpx;
      font-weight: bold;
      color: #000000;
    }

    .row-time {
      font-size: 24rpx;
      color: #999999;
    }

    .row-value {
      margin-top: 24rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #999999;
      overflow: hidden; //溢出内容隐藏
      text-overflow: ellipsis; //文本溢出部分用省略号表示
      display: -webkit-box; //特别显示模式
      -webkit-line-clamp: 2; //行数
      line-clamp: 2;
      -webkit-box-orient: vertical; //盒子中内容竖直排列
    }
  }
}
</style>