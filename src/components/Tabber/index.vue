<template>
  <u-tabbar
    :value="tabbarValue"
    @change="changeTabbar"
    :fixed="true"
    :placeholder="true"
    :safeAreaInsetBottom="true"
  >
    <u-tabbar-item name="home" text="首页" icon="home" @click="clickTabbar('/pages/home/home')" />
    <u-tabbar-item name="community" text="社区" icon="photo" @click="clickTabbar('/pages_community/community/community')" />
    <u-tabbar-item name="myNft" text="藏品" icon="play-right" @click="clickTabbar('/pages/myNft/myNft')" />
    <u-tabbar-item name="user" text="我的" icon="account" @click="clickTabbar('/pages/user/user')" />
  </u-tabbar>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'

const props = defineProps({
  tabbarName: { type: String, required: true }
})
const { tabbarName } = toRefs(props)

const tabbarValue = ref('')
tabbarValue.value = tabbarName.value

// 改变tabbar
const changeTabbar = (e: string) => {
  tabbarValue.value = e
}

// 点击tabbar
const clickTabbar = (pagesPath: string) => {
  if (tabbarValue.value == props.tabbarName) return
  // 关闭所有页面并跳转指定页面
  uni.reLaunch({
    url: pagesPath
  })
}
</script>

<style lang="scss" scoped>
</style>