import request from '@/utils/http'

// 获取首页公告
export const rollNoticeApi = () => {
  return request({
    method: 'GET',
    url: '/api/shop/notice/mini/findNotice'
  })
}

// 平台公告列表
export const platformNoticeListApi = (params:APIParams) => {
  return request({
    method: 'GET',
    url: '/api/shop/notice/noticeList',
    params
  })
}

// 公告详情
export const noticeDetailApi = (noticeId: string) => {
  return request({
    method: 'GET',
    url: '/api/shop/notice/noticeInfo',
    params: { noticeId }
  })
}