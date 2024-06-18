import request from '@/utils/http'

// 发送短信
export const sendSmsApi = (params:APIParams) => {
  return request({
    method: 'GET',
    url: '/api/mini/sendSms',
    params
  })
}

// 验证码登录
export const phoneCodeLoginApi = (params:APIParams) => {
  return request({
    method: 'POST',
    url: '/api/mini/phoneCodeLogin',
    params
  })
}

// 一键登录
export const oneClickLoginApi = (params:APIParams) => {
  return request({
    method: 'GET',
    url: '/api/mini/oneClickLogin',
    params
  })
}

// 退出登录
export const loginOutApi = () => {
  return request({
    method: 'POST',
    url: '/api/logout'
  })
}

// 获取用户信息
export const getUserInfoApi = (id?: string | number, params?:APIParams) => {
  return request({
    method: 'GET',
    url: `/api/user/${id}`,
    params
  })
}

// 修改用户头像
export const setUserInfoApi = (params:APIParams) => {
  return request({
    method: 'PUT',
    url: '/api/user/user',
    params
  })
}

// 实名认证
export const updUserRealApi = (params:APIParams) => {
  return request({
    method: 'PUT',
    url: '/api/user/realNameAuthentication',
    params
  })
}

// 获取已邀请的用户列表
export const getBindCodeUserApi = (params:APIParams) => {
  return request({
    method: 'GET',
    url: '/api/user/getBindCodeUser',
    params
  })
}

// 获取邀请榜单列表
export const inviteRankApi = (params:APIParams) => {
  return request({
    method: 'GET',
    url: '/api/user/getUserList',
    params
  })
}

// 操作密码/二级密码
export const updateSecondaryPwdApi = (params:APIParams) => {
  return request({
    method: 'PUT',
    url: '/api/user/resetPwd',
    params
  })
}

// 操作密码/二级密码-发送验证码
export const sendSecondarySmsApi = (params:APIParams) => {
  return request({
    method: 'GET',
    url: '/api/user/sendSms',
    params
  })
}

// 关注和粉丝
export const getFansOrConcernApi = (params:APIParams) => {
  return request({
    method: 'GET',
    url: '/api/user/myFansOrConcern',
    params
  })
}

// 获取空投列表
export const airDropListApi = (params:APIParams) => {
  return request({
    method: 'GET',
    url: '/api/airDrop/v3/list',
    params
  })
}

// 领取空投receive
export const receiveAirDropApi = (params:APIParams) => {
  return request({
    method: 'POST',
    url: '/api/airDrop/airDrop',
    params
  })
}

// 一键领取
export const getPullNewAirDropApi = (params:APIParams) => {
  return request({
    method: 'POST',
    url: '/api/airDrop/oneClick/receivePullNewAirDrop',
    params
  })
}

// 查询银卡列表
export const bankCardListApi = (params:APIParams) => {
  return request({
    method: 'GET',
    url: '/api/card/list',
    params
  })
}

// 删除银行卡
export const delBankCardApi = (params:APIParams) => {
  return request({
    method: 'POST',
    url: '/api/card/remove',
    params
  })
}

// 新增银行卡
export const addBankCardApi = (params:APIParams) => {
  return request({
    method: 'POST',
    url: '/api/card',
    params
  })
}

// 设置默认卡
export const setDefaultCardApi = (params:APIParams) => {
  return request({
    method: 'PUT',
    url: '/api/card/updateDefaultCard',
    params
  })
}

// 撤回出售的藏品
export const cancelSellProdApi = (params:APIParams) => {
  return request({
    method: 'POST',
    url: '/api/collectionProd/cancel',
    params
  })
}

// 转赠前检查数据
export const checkDataBeforePassOn = (address: string | number) => {
  return request({
    method: 'GET',
    url: `/api/collectionProd/checkDataBeforePassOn/${address}`
  })
}

// 藏品商品转赠
export const collectionProdPassOn = (params:APIParams) => {
  return request({
    method: 'POST',
    url: '/api/collectionProd/passOn',
    params
  })
}

// 转赠记录
export const transferListApi = (params:APIParams) => {
  return request({
    method: 'GET',
    url: '/api/collectionProd/donationList',
    params
  })
}

// 拆盲盒
export const collectionProdOpenBoxApi = (params:APIParams) => {
  return request({
    method: 'POST',
    url: '/api/collectionProd/openBox',
    params
  })
}


// 新增用户收货地址
export const addReceivingAddressApi = (params:APIParams) => {
  return request({
    method: 'POST',
    url: '/api/shop/receivingAddress',
    params
  })
}

// 修改用户收货地址
export const editReceivingAddressApi = (params:APIParams) => {
  return request({
    method: 'PUT',
    url: '/api/shop/receivingAddress',
    params
  })
}

// 获取用户收货地址
export const getReceivingAddressApi = () => {
  return request({
    method: 'GET',
    url: '/api/shop/receivingAddress/address'
  })
}

// 获取作者列表
export const findAuthorApi = (params:APIParams) => {
  return request({
    method: 'GET',
    url: '/api/shop/concern/mini/findAuthor',
    params
  })
}


// 兑换码兑换藏品
export const exchangeProdApi = (params:APIParams) => {
  return request({
    method: 'POST',
    url: '/shop/exchangeCodeDetail/exchange',
    params
  })
}

// 会员等级
export const vipLevelListApi = (params:APIParams) => {
  return request({
    method: 'GET',
    url: '/api/vipLevel/list',
    params
  })
}

// 个人会员信息
export const vipLevelPersonalApi = (params?:APIParams) => {
  return request({
    method: 'GET',
    url: '/api/vipLevel/personal/detail',
    params
  })
}

// 会员成长任务
export const vipUpgradeListApi = (params:APIParams) => {
  return request({
    method: 'GET',
    url: '/api/vipUpgrade/list',
    params
  })
}