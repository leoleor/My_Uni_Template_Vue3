<template>
  <view class="content-box">
    <rich-text class="ql-editor" :nodes="richTextStr || ''"/>
  </view>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getProtocolApi } from '@/api/common'

const richTextStr = ref('')

onLoad(async (options) => {
  if(options?.type) {
    // 1 用户协议 2 隐私政策 3 创客申请书（个人） 4 代发行委托证明文件资料说明 5 购买须知 6 授权委托书（品牌） 7 创作者入驻协议
    const res = await getProtocolApi({ type: options.type })
    let details = ''
    if(res.data.details) {
      details = res.data.details.replace(
        /img/gi,
        'img style="width:100%;height:100%;"'
      )
    }
    richTextStr.value = details ? details : res.data.details
    uni.setNavigationBarTitle({
      title: res.data.name
    })
  }
})
</script>

<style lang='scss' scoped></style>