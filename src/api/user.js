import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    //url:'/api/YYGLXT/demo/select1',
    method: 'post',
    data
  })
}

// 获取信息
export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    //url:'/api/YYGLXT/demo/select1',
    method: 'get',
    params: { token }
  })
}

// 注销
export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

