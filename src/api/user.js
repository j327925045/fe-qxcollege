import request from '@/utils/request.js'

/**
 * 获取用户列表
 */
export function getUserList(params) {
  return request({
    url: '/qxcollege/admin/user/list',
    method: 'get',
    params
  })
}

/**
 * 添加用户
 * @param data
 * @returns {*}
 */
export function addUserItem(data) {
  return request({
    url: '/qxcollege/admin/user/add',
    method: 'post',
    data: data
  })
}

/**
 * 删除用户
 * @param data
 * @returns {*}
 */
export function deleteUserItem(data) {
  return request({
    url: '/qxcollege/admin/user/delete',
    method: 'post',
    data: data
  })
}

/**
 * 更新用户数据
 * @param data
 * @returns {*}
 */
export function updateUserItem(data) {
  return request({
    url: '/qxcollege/admin/user/edit',
    method: 'post',
    data: data
  })
}

/**
 * 更新需要认证信息
 * @param data
 * @returns {*}
 */
export function realPcAuthentication(data) {
  return request({
    url: '/qxcollege/admin/user/realPcAuthentication',
    method: 'post',
    data: data
  })
}

/**
 * 获取用户详情
 * @param params
 * @returns {*}
 */
export function getUserDetail(params) {
  return request({
    url: `/qxcollege/admin/user/get/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}

/**
 * 校验手机号
 * @param params
 * @returns {*}
 */
export function checkPhone(params) {
  return request({
    url: `/qxcollege/admin/user/check/phone/${params}`,
    method: 'get'
  })
}
