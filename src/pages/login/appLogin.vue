<template>
  <view />
</template>

<script setup lang="ts">
import { oneClickLoginApi } from '@/api/user'
let gtSDKModule = uni.requireNativePlugin('Geetest-GTOneLoginSDKModule')
let globalEvent = uni.requireNativePlugin('globalEvent')
// import { mapActions } from 'vuex'
import { GEETEST_ONELOGIN_APP } from '@/utils/constant'
// export default {
// 	data() {
// 		return {
// 			account: '',
// 			gt_code: '状态码',
// 			gt_result: '信息描述',
// 			bindCode: ""
// 		}
// 	},

// 	onLoad() {
// 		this.bindCode = uni.getStorageSync('bindCode')
// 		globalEvent.addEventListener('customButtonAction', function(e) {
// 			console.log("=========== custom button pressed =========== ");
// 		});

// 		globalEvent.addEventListener('viewLifeCycleBlock', function(e) {
// 			let jsonString = JSON.stringify(e);
// 			let obj = JSON.parse(jsonString);
// 			let viewLifeCycle = obj['GTOLKey'];
// 			let viewLifeCycleArr = viewLifeCycle.split(',');
// 			console.log("=========== viewLifeCycle: " + viewLifeCycleArr);
// 			if (viewLifeCycleArr[0] == 'viewDidLoad') {
// 				uni.hideLoading();
// 			}
// 		});

// 		globalEvent.addEventListener('clickBackButtonBlock', function(e) {
// 			console.log("=========== clickBackButtonBlock =========== ");
// 		});

// 		globalEvent.addEventListener('clickSwitchButtonBlock', function(e) {
// 			console.log("=========== clickSwitchButtonBlock =========== ");
// 		});

// 		globalEvent.addEventListener('clickCheckboxBlock', function(e) {
// 			let jsonString = JSON.stringify(e);
// 			let obj = JSON.parse(jsonString);
// 			let isChecked = obj['GTOLKey'];
// 			console.log("=========== clickCheckboxBlock =========== " + isChecked);
// 			if (isChecked == 'true') {
// 				console.log("=========== checkbox is checked =========== ");
// 			} else if (isChecked == 'false') {
// 				console.log("=========== checkbox is unchecked =========== ");
// 			}
// 		});

// 		globalEvent.addEventListener('clickAuthButtonBlock', function(e) {
// 			console.log("=========== clickAuthButtonBlock =========== ");
// 		});

// 		globalEvent.addEventListener('hintBlock', function(e) {
// 			console.log("=========== hintBlock =========== ");
// 		});

// 		this.initOneLogin()
// 	},
// 	methods: {
// 		...mapActions(['changeUserInfo', 'changeToken']),

// 		// 登录
// 		async loginClick(e) {
// 			uni.showToast({
// 				title: e,
// 				icon: 'none'
// 			})
// 			var res = await oneClickLogin(e)
// 			if (res.code == 200) {
// 				try {
// 					this.changeUserInfo(res.data.user)
// 					this.changeToken(res.data.token)
// 					let page = getCurrentPages()
// 					console.log(page.length,'appLogin-页面栈')
// 					// 登录后返回原页面：目前藏品详情购买
// 					const frontPage = uni.getStorageSync("login_front")
// 					if (frontPage) {
// 						uni.navigateBack({
// 							complete: ()=>{
// 								uni.removeStorageSync("login_front")
// 							}
// 						})
// 						return
// 					}
// 					uni.switchTab({
// 						url: '/pages/user/user'
// 					})
// 				} catch (e) {
// 					console.log(e)
// 				}
// 			} else {
// 				uni.showToast({
// 					title: res.msg,
// 					icon: "none"
// 				})
// 				/*切换验证码登录*/
// 				this.otherPhoneLogin()
// 			}
// 		},
// 		initOneLogin() {
// 			//初始化建议在app启动时调用，即App.vue的onLaunch方法中
// 			uni.showLoading({
// 				mask: true,
// 			});

// 			if (gtSDKModule == undefined) {
// 				uni.hideLoading();
// 				console.log("=========== load plugin failed =========== ");
// 				return;
// 			}

// 			let platform = uni.getSystemInfoSync().platform;

// 			if (platform == 'android') {
// 				let sdkVersion = gtSDKModule.sdkVersion();

// 				//极验 SDK 初始化
// 				gtSDKModule.setLogEnabled(true);

// 				//设置请求超时时间，参数1代表预取号超时时间，参数2代表取号超时时间
// 				gtSDKModule.setRequestTimeout(8000, 8000);
// 				gtSDKModule.register({
// 					'appid': GEETEST_ONELOGIN_APP
// 				}, (result) => {
// 					uni.hideLoading();
// 					this.gt_code = JSON.stringify(result.jscode);
// 					this.gt_result = JSON.stringify(result.jsresult);
// 					this.oneLogin()
// 				});

// 			} else if (platform == 'ios') {
// 				let sdkVersion = gtSDKModule.sdkVersion();

// 				//极验 SDK 初始化
// 				gtSDKModule.setLogEnabled(true);
// 				gtSDKModule.registerWithAppID(GEETEST_ONELOGIN_APP, (result) => {
// 					this.oneLogin()
// 					uni.hideLoading();
// 					this.gt_code = JSON.stringify(result.status);
// 					this.gt_result = JSON.stringify(result.number);
// 					console.log(JSON.stringify(result),"极验 SDK 初始化 ios 结果");
// 				});
// 			}

// 		},
// 		oneLogin() {
// 			if (gtSDKModule == undefined) {
// 				console.log("=========== load plugin failed =========== ");
// 				return;
// 			}

// 			uni.showLoading({
// 				mask: true,
// 			});
// 			var that = this;
// 			let systemInfo = uni.getSystemInfoSync();
// 			let platform = systemInfo.platform;
// 			if (platform == 'android') {
// 				let screenInfo = gtSDKModule.getScreenInfo();
// 				/*************************Android*************************/
// 				//极验SDK拉起授权页方法
// 				// let width = systemInfo.screenWidth;
// 				// let height = systemInfo.screenHeight;
// 				// let density = systemInfo.pixelRatio;
// 				// let popWidth = width * 4 / 5;
// 				// let popHeight = height * 3 / 5;

// 				/**
// 				 * 授权页主题样式
// 				 * 0:浮窗式
// 				 * 1:弹窗式
// 				 * 2:沉浸式
// 				 * 3:横屏
// 				 */

// 				let themeConfig = {
// 					// numberOffsetY: 500,
// 					// statusBarColor: 0xffffffff,
// 					// navigationBarColor: 0xffffffff,
// 					// isLightColor: true,
// 					// returnImgPath: 'gt_one_login_ic_chevron_left_black',
// 					// returnImgWidth: 40,
// 					// returnImgHeight: 40,
// 					// returnImgHidden: false,
// 					// returnImgOffsetX: 0,
// 					// logBtnImgPath: 'gt_one_login_btn',
// 					// logBtnUncheckedImgPath: 'gt_one_login_btn_unchecked',
// 					// switchHidden: true,
// 					// logBtnWidth: 290,
// 					// logBtnHeight: 45,
// 					// logBtnOffsetY: 310,
// 					// logBtnOffsetY_B: 0,
// 					// logBtnOffsetX: 0,
// 					// logBtnText: '本机号码一键登录',
// 					// logBtnColor: 0xFFFFFFFF,
// 					// logBtnTextSize: 18,
// 					// loadingView: 'umcsdk_load_dot_white',
// 					// loadingViewWidth: 20,
// 					// loadingViewHeight: 20,
// 					// loadingViewOffsetRight: 12,
// 					// privacyClauseTextStrings: ["我已认真阅读、理解并同意", "《用户协议》",
// 					// 	"https://szdn.scugc.com/#/pages/registered/userAgreement2", "",
// 					// 	"和", "《隐私政策》", "https://szdn.scugc.com/#/pages/registered/privacyPolicy2", "",
// 					// 	"和", "", "", ""
// 					// ], // 一组留空，native SDK会自动填充对应运营商的服务条款
// 					// protocolShakeStyle: 1,
// 					// languageType: 0
// 					numberOffsetY: 250,
// 					logoImgPath: '../../static/images/login/icon_logo',
// 					logBtnText: '本机号码一键登录',
// 					switchHidden: true,
// 					privacyClauseTextStrings: ["我已认真阅读、理解并同意", "《用户协议》",
// 						"https://szdn.scugc.com/#/pages/registered/userAgreement", "",
// 						"和", "《隐私政策》", "https://szdn.scugc.com/#/pages/registered/privacyPolicy", "",
// 						"和", "", "", ""
// 					], // 一组留空，native SDK会自动填充对应运营商的服务条款
// 				};
// 				let widgetConfig = {
// 					widget1: {
// 						viewId: "view_tips",
// 						type: "TextView",
// 						// left: "180",
// 						top: "430",
// 						right: "",
// 						bottom: "",
// 						width: "",
// 						height: "",
// 						text: "其他方式登录",
// 						font: "16",
// 						textColor: "#3A8EE6",
// 					},
// 					widget2: {
// 						viewId: "weixin_login",
// 						type: "ImageView",
// 						// left: "141",
// 						top: "100",
// 						right: "",
// 						bottom: "",
// 						width: "120",
// 						height: "120",
// 						backgroundImgPath: "static/images/login/icon_logo.png"
// 					},
// 				}

// 				//一键登录
// 				gtSDKModule.requestToken({
// 					'ThemeConfig': themeConfig,
// 					'CustomView': widgetConfig
// 				}, (result) => {
// 					uni.hideLoading();
// 					console.log(result, result.jscode, '安卓一键登录');
// 					switch (result.jscode) {
// 						case 100: // onResult
// 							let status = result.status;
// 							if (status == 200) { // 获取 token 成功
// 								let processId = result.process_id;
// 								let token = result.token;
// 								let authcode = result.authcode;
// 								this.loginClick({
// 									...result,
// 									isAPP: 1,
// 									processId: result.process_id,
// 									authCode: result.authcode,
// 									token: result.token,
// 									phone: result.phone,
// 									bindCode: this.bindCode,
// 									timestamp: new Date().getTime()
// 								})

// 							} else {
// 								uni.showToast({
// 									icon: "none",
// 									title: "一键登录授权失败",
// 									duration: 2000
// 								});
// 								return uni.redirectTo({
// 									url:"/pages/login/otherLogin"
// 								})

// 							}
// 							this.gt_code = status
// 							this.gt_result = JSON.stringify(result);
// 							gtSDKModule.dismissAuthActivity();
// 							break;
// 						case 101: // onPrivacyClick
// 							let name = result.name;
// 							let url = result.url;
// 							console.log("=========== requestToken onPrivacyClick ===== ");
// 							console.log("=========== requestToken name =============== " + name);
// 							console.log("=========== requestToken url ================ " + url);
// 							break;
// 						case 102: // onPrivacyCheckBoxClick
// 							let isChecked = result.isChecked;
// 							console.log("=========== requestToken onPrivacyCheckBoxClick ===== ");
// 							console.log("=========== requestToken isChecked =============== " + isChecked);
// 							break;
// 						case 103: // onLoginButtonClick
// 							console.log("=========== requestToken onLoginButtonClick ===== ");
// 							break;
// 						case 104: // onLoginLoading
// 							console.log("=========== requestToken onLoginLoading ===== ");
// 							break;
// 						case 105: // onAuthActivityCreate
// 							console.log("=========== requestToken onAuthActivityCreate ===== ");
// 							break;
// 						case 106: // onAuthWebActivityCreate
// 							console.log("=========== requestToken onAuthWebActivityCreate ===== ");
// 							break;
// 						case 107: // onRequestTokenSecurityPhone
// 							let phone = result.phone;
// 							console.log("=========== requestToken onRequestTokenSecurityPhone ===== ");
// 							console.log("=========== requestToken phone =================== " + phone);
// 							break;
// 						case 120: // 自定义控件点击事件回调
// 							let viewId = result.jsresult;
// 							switch (viewId) {
// 								case "view_tips":
// 									that.otherPhoneLogin()
// 									break;

// 							}
// 					}
// 				})
// 			} else if (platform == 'ios') {
// 				/*************************iOS*************************/
// 				//极验SDK拉起授权页方法
// 				let screenWidth = gtSDKModule.screenWidth();
// 				let screenHeight = gtSDKModule.screenHeight();
// 				console.log("=========== screenWidth: =========== " + screenWidth);
// 				console.log("=========== screenHeight: =========== " + screenHeight);
// 				// 文档 ---> https://docs.geetest.com/onelogin/deploy/ios#%E6%8E%88%E6%9D%83%E9%A1%B5%E9%9D%A2-UI-%E4%BF%AE%E6%94%B9
// 				let viewModel = {
// 					statusBarStyle: 0,
// 					// naviTitle: '一键登录uni-app',
// 					naviTitleColor: '#1F90FF',
// 					naviTitleFont: 20,
// 					naviBgColor: '#FFFFFF',
// 					naviBackImage: 'Pandora/apps/__UNI__0D3E2E0/www/static/close_black.png',
// 					naviHidden: false,
// 					backButtonRect: [0, 0, 0, 0, 0, 0, 20, 20],
// 					backButtonHidden: false,
// 					// 这里__UNI__0D3E2E0换成您应用的AppID，static后的路径和本地路径一样
// 					appLogo: 'Pandora/apps/__UNI__37F3573/www/static/images/login/icon_logo.png',
// 					logoRect: [0, 0, 0, 0, 0, 0, 120, 120],
// 					// logoHidden: false,
// 					// logoCornerRadius: 5,
// 					// phoneNumColor: '#FF00FF',
// 					phoneNumFont: 25,
// 					phoneNumRect: [],
// 					switchButtonText: '其他方式登录',
// 					switchButtonColor: '#3A8EE6',
// 					switchButtonBackgroundColor: '#FFFFFF',
// 					switchButtonFont: 12,
// 					switchButtonRect: [],
// 					switchButtonHidden: false,
// 					authButtonImages: [],
// 					authButtonTitle: '本机号码一键登录',
// 					authButtonTitleColor: '#FFFFFF',
// 					authButtonTitleFont: 15,
// 					authButtonRect: [],
// 					// authButtonCornerRadius: 20,
// 					// sloganRect: [],
// 					// sloganTextColor: '#FFFF00',
// 					// sloganTextFont: 13,
// 					defaultCheckBoxState: false,
// 					checkedImage: '',
// 					uncheckedImage: '',
// 					// checkBoxRect: [],
// 					// privacyTermsColor: '#3A8EE6',
// 					// privacyTermsFont: 12,
// 					additionalPrivacyTerms: [
// 						['《用户协议》', 'https://szdn.scugc.com/#/pages/registered/userAgreement2'],
// 						['《隐私政策》', 'https://szdn.scugc.com/#/pages/registered/privacyPolicy2']
// 					],
// 					// termTextColor: '#0000FF',
// 					// termsRect: [],
// 					auxiliaryPrivacyWords: ['登录表示同意', '与', '&', '并使用本机号码登录'],
// 					// termsAlignment: 0,
// 					backgroundColor: '#00000000',
// 					backgroundImage: 'Pandora/apps/__UNI__0D3E2E0/www/static/background.png',
// 					landscapeBackgroundImage: '',
// 					isPopup: false,
// 					popupRect: [],
// 					popupCornerRadius: 3,
// 					popupRectCorners: [],
// 					popupAnimationStyle: 0,
// 					closePopupImage: '',
// 					closePopupTopOffset: 5,
// 					closePopupRightOffset: -5,
// 					canClosePopupFromTapGesture: true,
// 					// webNaviTitle: '一键登录uni-app服务条款',
// 					// webNaviTitleColor: '#1F90FF',
// 					// webNaviTitleFont: 20,
// 					// webNaviBgColor: '#0F0F00',
// 					notCheckProtocolHint: '请先阅读服务条款',
// 					modalPresentationStyle: 0,
// 					pullAuthVCStyle: 0,
// 					userInterfaceStyle: 0,
// 					languageType: 0,
// 					shakeStyle: 1,
// 					widgets: [
// 						// {
// 						// 	type: "UIImageView",
// 						// 	backgroundColor: '#48A75B',
// 						// 	cornerRadius: 5,
// 						// 	image: "Pandora/apps/__UNI__37F3573/www/static/images/login/icon_logo.png",
// 						// 	frame: [10, 180, 40, 40]
// 						// },
// 					],
// 					authVCTransitionBlock: 'authVCTransitionBlock',
// 					tapAuthBackgroundBlock: 'tapAuthBackgroundBlock',
// 					viewLifeCycleBlock: 'viewLifeCycleBlock',
// 					clickBackButtonBlock: 'clickBackButtonBlock',
// 					clickSwitchButtonBlock: 'clickSwitchButtonBlock',
// 					clickCheckboxBlock: 'clickCheckboxBlock',
// 					clickAuthButtonBlock: 'clickAuthButtonBlock',
// 					// hintBlock: 'hintBlock' // 可使用hintBlock自定义未勾选隐私条款勾选框点击授权按钮的操作，然后调用此接口勾选条款
// 				}

// 				//一键登录
// 				gtSDKModule.requestTokenWithViewModel(viewModel, (result) => {
// 					console.log(result,'ios一键登录')
// 					uni.hideLoading();
// 					// 点一键登录回调
// 					gtSDKModule.dismissAuthViewController();
// 					if (result.status != 200) {
// 						uni.showToast({
// 							icon: "none",
// 							title: "一键登录授权失败",
// 							duration: 2000
// 						});
// 						return uni.redirectTo({
// 							url:"/pages/login/otherLogin"
// 						})
// 					} else {
// 						this.loginClick({
// 							...result,
// 							isAPP: 1,
// 							processId: result.processID,
// 							authCode: result.authcode,
// 							token: result.token,
// 							phone: result.phone,
// 							bindCode: this.bindCode,
// 							timestamp: new Date().getTime()
// 						})
// 					}
// 					this.gt_code = JSON.stringify(result.status);
// 					this.gt_result = JSON.stringify(result.token);
// 					console.log(JSON.stringify(result));
// 				});
// 			}
// 		},

// 		otherPhoneLogin() {
// 			// #ifdef APP-PLUS
// 			gtSDKModule.dismissAuthActivity();
// 			// #endif
// 			uni.redirectTo({
// 				url: '/pages/login/otherLogin?inviteCode='+this.bindCode
// 			})
// 		},
// 	}
// }
</script>

<style lang="scss" scoped>
</style>