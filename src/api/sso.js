import request from '@/utils/request.js'

export function login(data) {
  return request({
    url: '/qxcollege/admin/sso/login',
    method: 'post',
    data
  })
}
