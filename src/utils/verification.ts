/**
 * 中国手机号验证
 */
export const isMobileNumber = (phone: string) => {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(phone)
}

/**
 * 邮箱验证
 */
export const isEmail = (email: string) => {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(email)
}

/**
 * 银行卡号验证
 */
export const isBankCardNo = (cardNo: string) => {
  const reg = /^\d{16}|\d{19}$/
  return reg.test(cardNo)
}

/**
 * 身份证号验证
 */
export const isIdCardNo = (idNo: string) => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(idNo)
}