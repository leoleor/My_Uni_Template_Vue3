export const PayType = {
  SCOREPAY: 0, // 积分支付
  WECHATPAY: 1, // 小程序支付
  ALIPAY: 2, // 支付宝支付
  WECHATPAY_SWEEP_CODE: 3, // 微信扫码支付
  WECHATPAY_H5: 4, // 微信H5支付
  WECHATPAY_MP: 5, // 微信公众号支付
  ALIPAY_H5: 6, // 支付宝H5支付
  ALIPAY_APP: 7, // 支付宝APP支付
  WECHATPAY_APP: 8, // 微信APP支付
  BALANCEPAY: 9, // 余额支付
  PAYPAL: 10 // paypal支付
}

// 微信分享固定模板
export const defaultShareParam = {
  title: '数字艺术档案', // 分享标题
  desc: '为原创护航, 让创意自由交易。', // 分享描述
  imgUrl: 'https://www.scugc.com/2023/02/15/2ebe67c4a8494a0c9a04d4e8565d4300.png' // 封面图片
}

// 文昌链-天舟 交易哈希地址
export const wenchangTxHashUrl = {
  test: 'https://explorer.testnet.bianjie.ai/#/txs/', // 测试
  prod: 'https://tianzhou.wenchang.bianjie.ai/#/txs/' // 正式
}

// 国检公众号 appid
export const WXGZH_APPID = 'wx561318cece735a78'

// 极验一键登录 appid
export const GEETEST_ONELOGIN_APP = 'af9123ce45164fab7c81a22118b1fbab'
export const GEETEST_ONELOGIN_H5 = 'eb1de532d003e888089da70cb877d335'

// 极验滑块验证 验证id
export const GEETEST_CAPTCHA = 'f05c9f0fae4fc6b9d644f38663bd8d78'