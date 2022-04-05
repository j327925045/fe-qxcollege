import App from '@/App.vue'
import * as filters from '@/filters'
import '@/icons/index'
import store from '@/store'
import Modules from '@/views/modules/index'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import Vue from 'vue'
import 'windi.css'
import './assets/styles/theme/index.css'
import './permission.js'
import router from './router'

Vue.use(ElementUI, { size: 'small' })
Vue.use(Modules)

// 注册自定义标签 [如按钮权限控制]
// Object.keys(directives).forEach((key) => {
//   Vue.directive(key, (directives as { [key: string ]: DirectiveOptions })[key])
// })
// todo 有接口以后这里要注释掉
// if (process.env.NODE_ENV === 'development') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// 注册过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.config.devtools = true

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
