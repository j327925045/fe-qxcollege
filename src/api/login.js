import request from '@/utils/request.js'

/**
 * 获取用户信息
 * @param {*} params
 * @returns
 */
export function getUserInfoRequest(params) {
  return request({
    url: '/mock/userinfo',
    method: 'get',
    params
  })
}

/**
 * 登出接口
 * @param {} params
 * @returns
 */
export function doLogout(params) {
  return request({
    url: '/mock/userinfo',
    method: 'get',
    params
  })
}
