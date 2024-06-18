// @ts-nocheck
// 判断网络方法
export const getNetworkType = () => {
  // ios 系统无论如何都会返回 unknown
  const common_cell = ['cellular', '2g', '3g', '4g', '5g', '3G/2G']
  const user_agent = navigator.userAgent.toLowerCase()
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {
    type: 'unknown'
  }
  let type
  // 判断是否是微信内置浏览器
  const isWeixin = /micromessenger/.test(user_agent)
  if (isWeixin) {
    if (user_agent.indexOf('nettype') !== -1) {
      type = user_agent.match(/nettype\/\w+/) ? user_agent.match(/nettype\/\w+/)[0] : 'nettype/unknow'
      type = type.replace('nettype/', '')
    } else {
      const weixinType = {
        'network_type:wifi': 'wifi',
        'network_type:edge': '3G/2G',
        'network_type:fail': 'fail',
        'network_type:wwan': '3G/2G'
      }
      document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
          type = weixinType[e.err_msg]
        })
      })
    }
  } else {
    type = connection && connection.type || 'unknown'
  }
  // 对type 做统一处理
  if (type && common_cell.indexOf(type) !== -1) {
    return 'cellular'
  } else if (type === 'wifi') {
    return 'wifi'
  }
  return 'unknown'
}

/**
 * 判断是否微信环境
 * @returns Boolean
 */
export const isWechat = () => {
  const ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/micromessenger/i) == 'micromessenger') {
    // console.log('是微信客户端')
    return true
  }
  // console.log('不是微信客户端')
  return false
}


/**
 * oss图片
 * @returns String
 */
export const setOssCover = (url:string, w = 1000, q = 80) => {
  let newUrl = ''
  // w宽度调整，高度等比缩放，转换格式，质量调整为80%，渐进显示
  newUrl = url + `?x-oss-process=image/resize,w_${w},m_lfit/format,webp/quality,q_${q}`
  return newUrl
}

/**
 * @description 格式化时间
 * @param {String|Number} dateTime 需要格式化的时间戳
 * @param {String} fmt 格式化规则 yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合 默认yyyy-mm-dd
 * @returns {string} 返回格式化后的字符串
 */
export function timeFormat(dateTime = '', formatStr = 'yyyy-mm-dd') {
  let date
  // 若传入时间为假值，则取当前时间
  if (!dateTime) {
    date = new Date()
  } else if (/^\d{10}$/.test(dateTime.toString().trim())) { // 若为unix秒时间戳，则转为毫秒时间戳（逻辑有点奇怪，但不敢改，以保证历史兼容）
    date = new Date(dateTime * 1000)
  } else if (typeof dateTime === 'string' && /^\d+$/.test(dateTime.trim())) { // 若用户传入字符串格式时间戳，new Date无法解析，需做兼容
    date = new Date(Number(dateTime))
  } else { // 其他都认为符合 RFC 2822 规范
    // 处理平台性差异，在Safari/Webkit中，new Date仅支持/作为分割符的字符串时间
    date = new Date(
      typeof dateTime === 'string'
        ? dateTime.replace(/-/g, '/')
        : dateTime
    )
  }

  const timeSource = {
    'y': date.getFullYear().toString(), // 年
    'm': (date.getMonth() + 1).toString().padStart(2, '0'), // 月
    'd': date.getDate().toString().padStart(2, '0'), // 日
    'h': date.getHours().toString().padStart(2, '0'), // 时
    'M': date.getMinutes().toString().padStart(2, '0'), // 分
    's': date.getSeconds().toString().padStart(2, '0') // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }

  for (const key in timeSource) {
    const [ret] = new RegExp(`${key}+`).exec(formatStr) || []
    if (ret) {
      // 年可能只需展示两位
      const beginIndex = key === 'y' && ret.length === 2 ? 2 : 0
      formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex))
    }
  }

  return formatStr
}