import config from '@/config/index'
import { goLogin } from '@/utils/publicMethod'

const request = (obj: httpParamsInter) => {
  let url = obj.url
  const {
    method,
    params,
    needToken = true,
    // needLoading = true,
    // loadingTitle = '加载中',
    headerContentType = 'application/json',
    showErrorMessage = true,
    loginTo = true
  } = obj

  interface httpHeaderInter {
    'Content-Type': string,
    'appVersion': string,
    'Authorization'?: string
  }
  const header: httpHeaderInter = {
    'Content-Type': headerContentType,
    'appVersion': config.appVersion
  }

  if (needToken) {
    header.Authorization = 'Bearer ' + uni.getStorageSync('token')
  }
  if (method === 'DELETE') {
    let queryString = '?'
    Object.keys(params).forEach(item => {
      queryString += `${item}=${params[item]}`
    })
    url += queryString
  }

  return new Promise<APIResponseInter>((resolve, reject) => {
    uni.request({
      url: `${config.server}${url}`,
      method,
      timeout: 15000, // 超时时间，单位 ms
      header,
      data: params,
      success ({ data }: APIResponseInter) {
        // uni.hideLoading()
        if (data.code === 401 || data.code === 4002 || data.code === 4003) {
          if (loginTo) {
            uni.clearStorageSync()
            // 跳登录页
            goLogin()
          }
          resolve(data)
        }
        if (data.success || data.code === 200 || data.code === 4005) {
          data.success = true
          resolve(data)
        } else{
          data.success = false
          if (showErrorMessage) {
            uni.showToast({
              icon: 'none',
              title: data.msg || '服务正在加载中~请稍后重试'
            })
          }
          resolve(data)
        }
      },
      fail: (err) => {
        // uni.hideLoading()
        uni.stopPullDownRefresh() // 收回下拉
        reject(err)
        // resolve({ success: false, result: {}})
      }
    })
  })
}

export function uploadFile(obj: uploadFileParamsInter) {
  const {
    url = '/api/system/oss/mini/upload',
    filePath,
    isHideLoading = false
  } = obj
  return new Promise<APIResponseInter>((resolve, reject) => {
    uni.uploadFile({
      url: config.server + url,
      filePath,
      header: {
        'Authorization': 'Bearer ' + uni.getStorageSync('token')
      },
      name: 'file',
      success: (uploadFileRes) => {
        const { data } = uploadFileRes
        const res = JSON.parse(data)
        if (res.code == 500) {
          return uni.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
        resolve(JSON.parse(data))
      },
      fail: (err) => {
        uni.showToast({
          title: '上传出错，请重试！',
          icon: 'none'
        })
        reject(err)
      },
      complete: () => {
        if (isHideLoading) {
          uni.hideLoading()
        }
      }
    })
  })
}

export default request