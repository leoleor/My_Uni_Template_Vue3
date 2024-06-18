<template>
  <view class="title">实名认证</view>
  <view class="tips">我的手机号{{ getUserInfo.phone }}</view>

  <view class="content">
    <view class="certification_input">
      <input
        v-model="realName"
        placeholder="请输入您的姓名"
        placeholder-class="login_input_inside"
        class="login_input"
      />
    </view>
  </view>
  <view class="content">
    <view class="certification_input">
      <input
        v-model="idCard"
        placeholder="请输入您的身份证号码"
        maxlength="18"
        placeholder-class="login_input_inside"
        class="login_input"
      />
    </view>
  </view>

  <view class="content_bottom">
    <view class="cert_submit" @click="confirmSubmit()">
      <view class="btn">提交</view>
    </view>
    <view class="bottom-tips">
      <!-- <image src="/static/images/icon/aq.png" mode="aspectFill" class="tips-img"/> -->
      数字艺术档案将对信息加密，保障您的信息安全
    </view>
  </view>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { updUserRealApi } from '@/api/user'
import { isIdCardNo } from '@/utils/verification'
import userStoreHooks from '@/hooks/store/userStoreHooks'
const { getUserInfo, getUserInfoById } = userStoreHooks()

let pageSource = ref('') // 页面来源，扩展用
const realName = ref('') // 实名姓名
const idCard = ref('') // 身份证

onLoad((options) => {
  if (options?.pageSource) pageSource.value = options.pageSource
})

// 确认提交
const confirmSubmit = async () => {
  let _name = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/
  if (realName.value.trim().length === 0) {
    uni.showToast({
      title: '请输入姓名',
      icon: 'none'
    })
    return
  }
  if (idCard.value.trim().length === 0) {
    uni.showToast({
      title: '请输入身份证号',
      icon: 'none'
    })
    return
  }
  if (!_name.test(realName.value)) {
    uni.showToast({
      title: '请输入正确的姓名',
      icon: 'none'
    })
    return
  }
  if (!isIdCardNo(idCard.value)) {
    uni.showToast({
      title: '请输入有效的身份证号',
      icon: 'none'
    })
    return
  }
  let obj = {
    realName: realName.value,
    idCard: idCard.value,
    userId: getUserInfo.value.userId,
    mobile: getUserInfo.value.phone
  }
  const resp = await updUserRealApi(obj)
  if (resp.code == 200) {
    uni.showToast({
      title: '认证成功'
    })
    getUserInfoById()
    setTimeout(() => {
      uni.redirectTo({
        url: `/pages/certification/certificationSuccess?pageSource=${pageSource.value}`
      })
    }, 1000)
  } else {
    uni.showToast({
      title: resp.msg,
      icon: 'none'
    })
  }
}
</script>

<style lang='scss' scoped></style>