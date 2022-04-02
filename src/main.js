import Vue from 'vue'

import 'normalize.css/normalize.css' // CSS重置的一个现代替代方案

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // 只是 i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // 权限控制

/**
 * 如果您不想使用mock-server
 * 你想用MockJs来模拟api
 * 你可以执行:mockXHR()
 *
 * 目前，MockJs将用于生产环境，
 * 请在上线前删除它!！ ！
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
