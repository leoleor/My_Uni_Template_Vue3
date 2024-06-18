
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

export default function() {
  /**
   * app端白屏问题https://github.com/dcloudio/uni-app/issues/3853
   * 1. main.ts 中要 return { Pinia }
   * 2. vue 文件中使用, usexxxStore() 要在 setup 之后调用
   * 3. ts 文件中使用, usexxxStore() 放在函数内部调用，不要在 ts 文件顶部 import 之后就调用，这样会报错
   */
  const userStore = useUserStore()
  const { token, userInfo, vipInfo, getToken, getUserInfo } = storeToRefs(userStore)
  return {
    userStore,
    token,
    userInfo,
    vipInfo,
    getToken,
    getUserInfo,
    setToken: userStore.setToken,
    setUserInfo: userStore.setUserInfo,
    getUserInfoById: userStore.getUserInfoById,
    getVipInfo: userStore.getVipInfo,
    logout: userStore.logout
  }
}

