import request from '@/utils/request.js'

/**
 * 添加机构
 * @param data
 * @returns {*}
 */
export function addOrganizationItem(data) {
  return request({
    url: '/qxcollege/organization/add',
    method: 'post',
    data: data
  })
}

/**
 * 删除结构
 * @param data
 * @returns {*}
 */
export function deleteOrganizationItem(data) {
  return request({
    url: '/qxcollege/organization/delete',
    method: 'post',
    data: data
  })
}

/**
 * 删除机构
 * @param data
 * @returns {*}
 */
export function updateOrganizationItem(data) {
  return request({
    url: '/qxcollege/organization/edit',
    method: 'post',
    data: data
  })
}

/**
 * 获取机构详情
 * @param params
 * @returns {*}
 */
export function getOrganizationDetail(params) {
  return request({
    url: `/qxcollege/organization/get/${params.id}`,
    method: 'get',
    params: {}
  })
}

/**
 * 获取机构列表
 * @param params
 * @returns {*}
 */
export function getOrganizationList(params) {
  return request({
    url: '/qxcollege/organization/list',
    method: 'get',
    params: params
  })
}
