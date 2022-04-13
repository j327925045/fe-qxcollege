import request from '@/utils/request.js'
/**
 * 获取素材列表
 */
export function getDataList(params) {
  return request({
    url: '/qxcollege/admin/material/list',
    method: 'get',
    params
  })
}

/**
 * 获取素材详情
 */
export function getDetail(params) {
  return request({
    url: `/qxcollege/admin/material/get/${params}`,
    method: 'get'
  })
}

/**
 * 导出
 */
export function getExport(params) {
  return request({
    url: `/qxcollege/admin/material/export/${params}`,
    method: 'get'
  })
}
/**
 * 修改
 * @param data
 * @returns {*}
 */
export function editResources(data) {
  return request({
    url: '/qxcollege/admin/material/edit',
    method: 'post',
    data: data
  })
}

/**
 * 删除
 * @param data
 * @returns {*}
 */
export function deleteResources(data) {
  return request({
    url: '/qxcollege/admin/material/delete',
    method: 'post',
    data: data
  })
}

/**
 * 新增
 * @param data
 * @returns {*}
 */
export function resourcesCommit(data) {
  return request({
    url: '/qxcollege/admin/material/add',
    method: 'post',
    data: data
  })
}
