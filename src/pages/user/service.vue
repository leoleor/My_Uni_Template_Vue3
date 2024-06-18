<template>
  <view class="page-wrapper__origin">
    <image
      v-for="item in serverList"
      :key="item.dictCode"
      class="server-img"
      :src="item.dictValue"
      mode="widthFix"/>
  </view>
</template>

<script setup lang='ts'>
import { reactive, toRefs } from 'vue'
import { serviceContactApi } from '@/api/common'
import { onLoad } from '@dcloudio/uni-app'

interface dictItem {
  dictCode: string
  dictValue: string
}

const pageData = reactive<{
  serverList: dictItem[]
}>({
  serverList: []
})

const { serverList } = toRefs(pageData)

onLoad(async () => {
  const res = await serviceContactApi()
  serverList.value = res.data
})
</script>

<style lang='scss' scoped>
.server-img {
  width: 100%;
}
</style>