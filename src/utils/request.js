import store from '@/store/index'
import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000,
  // 跨域时需要带上cookie需要开启
  withCredentials: true
})

// 不需要拦截响应错误的url白名单
const urlWhiteList = []

// Request 拦截
service.interceptors.request.use(
  (config) => {
    // 白名单内不校验拦截器
    if (urlWhiteList.some(item => config.url.indexOf(item) > -1)) {
      return config
    }
    if (store.state.user.token) {
      config.headers['X-Access-Token'] = store.state.user.token
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response 拦截
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 白名单内不校验拦截器
    if (urlWhiteList.some(item => response.config.url.indexOf(item) > -1)) {
      return res
    }
    // 业务接口统一处理response异常
    if (res.code !== 200) {
      Message(res.message)
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
  },
  (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
