import { defineStore } from 'pinia'
import { loginOutApi, getUserInfoApi, vipLevelPersonalApi } from '@/api/user'

// 新增state、getters、actions都需要在hooks/store/useUserStore里加相应的
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      userInfo: null as any,
      vipInfo: null as any
    }
  },
  getters: {
    getToken: (state):string => {
      let tempToken = state.token
      try {
        tempToken = uni.getStorageSync('token')
      } catch(e) {
        tempToken = state.token
      }
      return tempToken
    },
    getUserInfo: (state): any => {
      let tempUser = state.userInfo
      try {
        tempUser = JSON.parse(uni.getStorageSync('userInfo'))
      } catch(e) {
        tempUser = null
      }
      return tempUser
    }
  },
  actions: {
    setToken(token: string) {
      uni.setStorageSync('token', token)
      this.token = token
    },
    setUserInfo(userInfo: any) {
      uni.setStorageSync('userInfo', JSON.stringify(userInfo))
      this.userInfo = userInfo
    },
    // 获取用户信息
    async getUserInfoById() {
      const resp = await getUserInfoApi(this.getUserInfo?.userId)
      if (resp.success) {
        const userInfo = resp.data
        this.setUserInfo(userInfo)
        return true
      }
      return false
    },
    // 获取会员信息
    async getVipInfo() {
      const res = await vipLevelPersonalApi()
      this.vipInfo = res.data
    },
    // 退出登录
    logout() {
      uni.showModal({
        title: '提示',
        content: '是否确定退出登录',
        success: async (res) => {
          if (res.confirm) {
            const resp = await loginOutApi()
            if (resp.success) {
              uni.showToast({
                icon: 'none',
                duration: 2000,
                title: resp.msg
              })
              this.token = ''
              this.userInfo = null
              this.$reset()
              uni.clearStorage()
              // uni.switchTab({
              //   url: '/pages/home/home'
              // })
              uni.reLaunch({
                url: '/pages/home/home'
              })
            }
          }
        }
      })
    }
  }
})