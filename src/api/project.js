import request from '@/utils/request.js'

/**
 * 获取用户列表
 */
export function getProjectList(params) {
  return request({
    url: '/qxcollege/admin/project/list',
    method: 'get',
    params
  })
}

/**
 * 添加用户
 * @param data
 * @returns {*}
 */
export function addProjectItem(data) {
  return request({
    url: '/qxcollege/admin/project/add',
    method: 'post',
    data: data
  })
}

/**
 * 删除用户
 * @param data
 * @returns {*}
 */
export function deleteProjectItem(data) {
  return request({
    url: '/qxcollege/admin/project/delete',
    method: 'post',
    data: data
  })
}

/**
 * 更新用户数据
 * @param data
 * @returns {*}
 */
export function updateProjectItem(data) {
  return request({
    url: '/qxcollege/admin/project/edit',
    method: 'post',
    data: data
  })
}

/**
 * 获取用户详情
 * @param params
 * @returns {*}
 */
export function getProjectDetail(params) {
  return request({
    url: `/qxcollege/admin/project/get/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}

// /qxcollege/admin/product/list
/**
 * 获取用户详情
 * @param params
 * @returns {*}
 */
export function getProjectProduct(params) {
  return request({
    url: '/qxcollege/admin/product/list',
    method: 'get',
    params: params
  })
}
