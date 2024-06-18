import request from '@/utils/http'

// 查询轮播图
export const getBannerApi = () => {
  return request({
    method: 'GET',
    url: '/api/banner/mini/list'
  })
}

// 获取线上版本号
export const getVersionApi = () => {
  return request({
    method: 'GET',
    url: '/api/mini/dict/data/type/sys_upgrade'
  })
}

// 客服社群图片
export const serviceContactApi = () => {
  return request({
    method: 'GET',
    url: '/api/mini/dict/data/type/customer_service'
  })
}

// 邀请好友 - 海报
export const posterApi = () => {
  return request({
    method: 'GET',
    url: '/api/mini/dict/data/type/poster'
  })
}


// 邀请好友 - 背景图
export const friendBgApi = () => {
  return request({
    method: 'GET',
    url: '/api/mini/dict/data/type/friend_background'
  })
}


// 获取字典配置
export const getDictApi = (params:APIParams) => {
  return request({
    method: 'GET',
    url: '/api/mini/dict/data/findInfo',
    params
  })
}

// 获取协议
export const getProtocolApi = (params:APIParams) => {
  return request({
    method: 'GET',
    url: '/api/specification/getType',
    params
  })
}

