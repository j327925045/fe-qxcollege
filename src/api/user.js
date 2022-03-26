import request from '@/utils/request.js'

/**
 * 获取用户列表
 */
export function getUserList(params) {
  return request({
    url: '/qxcollege/user/list',
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
    url: '/qxcollege/user/add',
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
    url: '/qxcollege/user/delete',
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
    url: '/qxcollege/user/edit',
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
    url: `/qxcollege/user/get/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}