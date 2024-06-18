import request from '@/utils/http'

// 获取个人积分列表
export const userIntegralListApi = (params:APIParams) => {
  return request({
    method: 'GET',
    url: '/api/score/scoreInfo',
    params
  })
}

// 签到积分
export const signIntegralApi = () => {
  return request({
    method: 'GET',
    url: '/api/score/updateUserScore'
  })
}
