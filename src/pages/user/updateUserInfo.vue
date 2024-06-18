<template>
  <view>
    <view class="input-box">
      <input
        v-if="type == 1"
        type="text"
        maxlength="20"
        v-model="nickName"
        placeholder="填写你的昵称"
        placeholder-class="input-p"
      />
      <textarea
        v-if="type == 2"
        style="height: 150rpx;"
        v-model="introduce"
        placeholder="请输入个人简介"
        maxlength="50"
        placeholder-class="input-p"
      />
    </view>
    <view class="tips">{{ type == 1 ? nickName?.length || 0 : introduce?.length || 0 }}/{{ maxFontLength }}</view>
  </view>
  <view @click="confirmUpdate">确定</view>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { setUserInfoApi } from '@/api/user'
import userStoreHooks from '@/hooks/store/userStoreHooks'
const { getUserInfo, setUserInfo } = userStoreHooks()

let type = ref(0)
let nickName = ref('')
let introduce = ref('')
let maxFontLength = ref(20)

onLoad((options) => {
  type.value = options?.type
  if (options?.type == 1) {
    nickName.value = getUserInfo.value.nickName
    maxFontLength.value = 20
    uni.setNavigationBarTitle({ title: '修改昵称' })
  } else {
    introduce.value = getUserInfo.value.introduce
    maxFontLength.value = 50
    uni.setNavigationBarTitle({ title: '修改个人简介' })
  }
})

const confirmUpdate = () => {
  if(type.value == 1) {// 修改昵称
    if (!nickName.value) {
      uni.showToast({ title: '昵称不能为空', icon: 'none' })
      return
    }
    setUserInfoApi({ nickName: nickName.value }).then((res) => {
      if(res.code === 200) {
        uni.showToast({
          title: '修改成功'
        })
        setTimeout(() => {
          uni.navigateBack()
        }, 1000)
      }
    })
  } else { // 修改个人简介
    setUserInfoApi({ introduce: introduce.value }).then((res) => {
      if(res.code === 200) {
        const newUserInfo = {
          ...getUserInfo.value,
          introduce: introduce.value
        }
        setUserInfo(newUserInfo)
        uni.showToast({
          title: '修改成功'
        })
        setTimeout(() => {
          uni.navigateBack()
        }, 1000)
      }
    })
  }
}
</script>

<style scoped lang="scss">
.right-text{
  font-size: 28rpx;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #1E4098;
}
.cont{
  width: 100%;
  box-sizing: border-box;
  padding-left: 24rpx ;
  padding-right: 24rpx;
  padding-top: calc( var(--status-bar-height) + 112rpx);
}
.input-box{
  box-sizing: border-box;
  padding: 30rpx 24rpx;
  background: #fff;
  border-radius: 24rpx;
  font-size: 28px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #000;
}
.input-p{
  font-size: 28rpx;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: rgba(0,0,0,0.3);
}
.tips{
  width: 100%;
  margin-top: 4rpx;
  text-align: right;
  font-size: 24rpx;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: rgba(0,0,0,0.3);
}
</style>