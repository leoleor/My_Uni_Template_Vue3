// 跳转登录
export const goLogin = () => {
  //#ifdef APP-PLUS
  // uni.navigateTo({
  //   url: '/pages/login/appLogin',
  // });
  //#endif

  //#ifdef H5
  // uni.navigateTo({
  //   url: '/pages/login/login',
  // });
  //#endif
  uni.navigateTo({
    url: '/pages/login/login'
  })
}