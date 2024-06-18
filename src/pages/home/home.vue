<template>
  <view class="page-wrapper">
    <image class="logo" src="/static/logo/logo.png" />
    <text class="title">{{ title }}</text>
    <view class="text-area"/>
    <view class="home-list__wrapper">
      <view
        class="home-list__container"
        v-for="(item,index) in popularList"
        :key="index"
      >
        <image
          :src="global.$setOssCover(item.pic)"
          class="item-image"
          mode="aspectFill"
          lazy-load
          lazy-load-margin="0"
        />
        <!--  #ifdef APP-PLUS -->
        <!-- <image
          :src="global.$setOssCover(item.pic)"
          class="item-image"
          mode="aspectFill"
          :lazy-load="true"
        /> -->
        <!--  #endif -->
        <!-- #ifdef H5 -->
        <!-- <img v-lazy="global.$setOssCover(item.pic)" class="item-image" /> -->
        <!-- #endif -->
      </view>
    </view>
  </view>
  <Tabber tabbarName="home" />
</template>

<script setup lang="ts">
import Tabber from '@/components/Tabber/index.vue'
import { ref, inject, reactive, toRefs } from 'vue'
import { getBannerApi } from '@/api/common'
import { getProdApi } from '@/api/prod'
import { onLoad } from '@dcloudio/uni-app'

const global = inject('global') as GlobalMethods

const title = ref('标题')
const pageData = reactive<{
  popularForm: any,
  popularList: any
}>({
  popularForm: {
    pageNum: 1,
    pageSize: 6,
    type: 4
  },
  popularList: []
})

const { popularForm, popularList } = toRefs(pageData)

onLoad(() => {
  getProdApi(popularForm.value).then((res) => {
    const { records, total, current } = res.data.prodList
    popularList.value = records
  })
  getBannerApi()
})
</script>

<style lang="scss" scoped>
.page-wrapper {
  height: 100vh;
}
.home-list__wrapper {
  background-color: red;
}
.item-image {
  width: 702rpx;
  height: 702rpx;
}
</style>
