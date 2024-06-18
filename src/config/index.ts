import devConfig from './dev.config'
// import prodConfig from './prod.config'
import testConfig from './test.config'
/*
	修改这些配置文件的时候注意：
	1. 藏品详情跳转文昌链（三处：goodInfo、jishouDetail、collection）
	2. 分享页面的二维码地址（goodInfo/share、author/share、community/share、examine/depositShare）
	dev.config.js --- 本地开发环境/运行基座
	test.config.js --- 测试/正式环境-打包的时候记得切换
	prod.config.js --- 正式环境
*/
const config = process.env.NODE_ENV === 'development' ? devConfig : testConfig
export default {
  ...config,
  appVersion: '1.0.0',
  interfaceTime: 1000
}