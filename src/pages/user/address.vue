<template>
  <view class="wrapper">
    <view class="cell">
      <view class="cell-tip">收货人</view>
      <input
        class="cell-input"
        placeholder="请输入收货人的姓名"
        placeholder-class="placeholder-style"
        v-model="receivingUsername"
      />
    </view>
    <view class="cell">
      <view class="cell-tip">手机号码</view>
      <input
        class="cell-input"
        type="number"
        placeholder-class="placeholder-style"
        placeholder="请输入手机号码"
        v-model="receivingPhone"
      />
    </view>
    <view class="cell">
      <view class="cell-tip">收货地址</view>
      <view class="dizhi-cont" @click="openPicker">
        <view class="dizhi">
          <view class="shenglve" :style="province ? 'color: #333333' : ''">{{ province ? province : "省" }}</view>
          <u-icon name="arrow-down-fill" size="24rpx" color="#D9D9D9"/>
        </view>
        <view class="dizhi">
          <view class="shenglve" :style="city ? 'color: #333333' : ''">{{ city ? city : '市' }}</view>
          <u-icon name="arrow-down-fill" size="24rpx" color="#D9D9D9"/>
        </view>
        <view class="dizhi">
          <view class="shenglve" :style="region ? 'color: #333333' : ''">{{ region ? region : '区/县' }}</view>
          <u-icon name="arrow-down-fill" size="24rpx" color="#D9D9D9"/>
        </view>
      </view>
    </view>
    <view class="textarea-cell">
      <textarea
        class="cell-input"
        placeholder="请输入收货地址"
        placeholder-class="placeholder-style"
        v-model="detail"
      />
    </view>
    <view class="submit-button" @click="handleAddAddress">保存</view>
    <!-- 选择省市区 -->
    <ProvincialSelector v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData"/>

    <!-- 选择省份 -->
    <!-- <u-picker @cancel="provinceFlag = false" @confirm="provinceConfirm" :show="provinceFlag" :columns="provinceList">
    </u-picker> -->
    <!-- 选择市 -->
    <!-- <u-picker @cancel="cityFlag = false" @confirm="cityConfirm" :show="cityFlag" :columns="cityList"></u-picker> -->
  </view>
</template>

<script setup lang='ts'>
import { reactive, toRefs, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getReceivingAddressApi, addReceivingAddressApi, editReceivingAddressApi } from '@/api/user'
import ProvincialSelector from '@/components/ProvincialSelector/index.vue'

onLoad(() => {
  getAddressInfo()
})

const pageData = reactive({
  receivingUsername: '',
  receivingPhone: '',
  province: '',
  city: '',
  region: '',
  detail: '',
  lotusAddressData: {
    visible: false,
    provinceName: '',
    cityName: '',
    townName: ''
  }
})


const {
  receivingUsername,
  receivingPhone,
  province,
  city,
  region,
  detail,
  lotusAddressData
} = toRefs(pageData)


// 获取收获地址信息
const getAddressInfo = async () => {
  const res = await getReceivingAddressApi()
  receivingUsername.value = res?.data?.receivingUsername
  receivingPhone.value = res?.data?.receivingPhone
  province.value = res?.data?.province
  city.value = res?.data?.city
  region.value = res?.data?.region
  detail.value = res?.data?.detail
}
const choseValue = (e) => {
  console.log(e)
}
const openPicker = () => {
  lotusAddressData.value.visible = true
  lotusAddressData.value.provinceName = province.value
  lotusAddressData.value.cityName = city.value
  lotusAddressData.value.townName = region.value
}
const handleAddAddress = () => {}
</script>

<style lang='scss' scoped></style>