import request from '@/utils/request.js'

/**
 * 添加集团
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
 * 删除集团
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
 * 获取集团详情
 * @param params
 * @returns {*}
 */
export function getOrganizationDetail(params) {
  return request({
    url: `/qxcollege/organization/get/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}

/**
 * 获取集团列表
 * @param params
 * @returns {*}
 */
export function getOrganizationList(params) {
  return request({
    url: '/qxcollege/organization/list',
    method: 'get',
    params
  })
}

export function getAllOrganizationItems(params) {
  return request({
    url: '/qxcollege/organization/findAll',
    method: 'get',
    params
  })
}

/**
 * 获取集团下所有机构
 */
export function getHospitalsInOrg(params) {
  return request({
    url: `/qxcollege/organization/list/hospital/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}
