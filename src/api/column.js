import request from '@/utils/request.js'

/**
 * 添加专栏项
 */
export function addColumnItem(data) {
  data.createSource = 1 // 创建来源(1.后台创建 2,小程序创建)
  return request({
    url: '/qxcollege/admin/column/add',
    method: 'post',
    data
  })
}

/**
 * 删除专栏
 */
export function deleteColumnItem(data) {
  return request({
    url: '/qxcollege/admin/column/delete',
    method: 'post',
    data
  })
}

/**
 * 更新专栏项
 */
export function updateColumnItem(data) {
  data.createSource = 1 // 创建来源(1.后台创建 2,小程序创建)
  return request({
    url: '/qxcollege/admin/column/edit',
    method: 'post',
    data
  })
}

/**
 * 获取专栏详情
 */
export function getColumnDetail(params) {
  return request({
    url: `/qxcollege/admin/column/get/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}

/**
 * 获取专栏列表
 */
export function getColumnList(params) {
  return request({
    url: '/qxcollege/admin/column/list',
    method: 'get',
    params
  })
}

/**
 * 课程专栏上下架操作
 */
export function operateColumnItem(data) {
  return request({
    url: '/qxcollege/admin/column/operation',
    method: 'post',
    data
  })
}

/**
 * 获取专栏下课程列表
 */
export function getColumnCourseList(params) {
  return request({
    url: `/qxcollege/admin/column/list/ref/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}
