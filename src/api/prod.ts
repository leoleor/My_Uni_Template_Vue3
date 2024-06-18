import request from '@/utils/http'

// 查询商品列表
export const getProdApi = (params:APIParams) => {
  return request({
    method: 'GET',
    url: '/api/shop/prod/mini/list',
    params
  })
}