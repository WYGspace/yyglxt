import Cookies from 'js-cookie'

const TokenKey = 'YYGLXT_token'

// 获取Cookies数据
export function getToken() {
  return Cookies.get(TokenKey)
}

// 添加/修改Cookies数据
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 删除Cookies数据
export function removeToken() {
  return Cookies.remove(TokenKey)
}
