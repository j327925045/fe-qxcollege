import request from '@/utils/request.js'

/**
 * 添加专栏项
 */
export function addColumnItem(data) {
  data.createSource = 1 // 创建来源(1.后台创建 2,小程序创建)
  return request({
    url: '/qxcollege/column/add',
    method: 'post',
    data
  })
}

/**
 * 删除专栏
 */
export function deleteColumnItem(data) {
  return request({
    url: '/qxcollege/column/delete',
    method: 'post',
    data
  })
}

/**
 * 更新专栏项
 */
export function updateColumnItem(data) {
  return request({
    url: '/qxcollege/column/edit',
    method: 'post',
    data
  })
}

/**
 * 获取专栏详情
 */
export function getColumnDetail(params) {
  return request({
    url: `/qxcollege/column/get/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}

/**
 * 获取专栏列表
 */
export function getColumnList(params) {
  return request({
    url: '/qxcollege/column/list',
    method: 'get',
    params
  })
}
