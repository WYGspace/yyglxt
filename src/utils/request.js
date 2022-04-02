import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // Url =基础Url +请求Url //dev-api：模拟数据的api
  //baseURL: process.env.BASE_URL, 
  // withCredentials: true， //在跨域请求时发送cookie
  timeout: 5000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求被发送之前做些什么
    
    if (store.getters.token) {
      // 让每个请求携带令牌
      // ['X-Token']是一个自定义头键
      // 请根据实际情况修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 如果你想要获取http信息，例如头信息或状态信息
   * 请返回response => response
  */

  /**
   * 通过自定义代码确定请求状态
   * 这里只是一个例子
   * 您也可以通过HTTP状态码来判断状态
   */
  response => {
    // HTTP状态码
    // const res = response.status;
    // return response.data;// 返回用户数据
    const res = response.data;
    // 如果自定义代码不是20000，则判断为错误。
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法令牌;50012:其他客户端登录;50014:令牌过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登陆
        MessageBox.confirm('您已退出登录，您可以取消以留在此页面，或重新登录', '确认注销', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
