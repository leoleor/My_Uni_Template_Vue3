// 接口返回数据
interface APIResponseInter<T = any> {
  data?: T,
  code?: string | number,
  msg?: string,
  success?: boolean
}

// 上传接口的参数
interface uploadFileParamsInter {
  url?: string,
  filePath: string
  isHideLoading?: boolean
}

// 二次封装的请求参数
interface httpParamsInter<T = any> {
  method: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT',
  url: string,
  params?: T,
  needToken?: boolean,
  needLoading?: boolean,
  headerContentType?: string,
  showErrorMessage?: boolean,
  loginTo?: boolean
}

// 接口参数
interface APIParams<T = any> {
  [key: string]: T
}