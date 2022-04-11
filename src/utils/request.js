import { getToken } from '@/utils/auth.js'
import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000
})

// Request 拦截
service.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers.Authorization = getToken()
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
    const noMessageCode = [300]
    // 业务接口统一处理response异常
    if (res.code !== 200) {
      if (!noMessageCode.includes(res.code)) {
        if (res.list.length > 0 || res.data.length > 0) {
          Message(res.message)
        }
      }
      return Promise.reject(res)
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
