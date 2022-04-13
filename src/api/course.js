import request from '@/utils/request.js'

/**
 * 添加课程
 */
export function addCourseItem(data) {
  return request({
    url: '/qxcollege/admin/course/add',
    method: 'post',
    data
  })
}

/**
 * 编辑课程
 */
export function updateCourseItem(data) {
  return request({
    url: '/qxcollege/admin/course/edit',
    method: 'post',
    data
  })
}

/**
 * 删除课程
 */
export function deleteCourseItem(data) {
  return request({
    url: '/qxcollege/admin/course/delete',
    method: 'post',
    data
  })
}

/**
 * 获取课程详情
 */
export function getCourseDetail(params) {
  return request({
    url: `/qxcollege/admin/course/get/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}

/**
 * 获取课程列表
 */
export function getCourseList(params) {
  return request({
    url: '/qxcollege/admin/course/list',
    method: 'get',
    params
  })
}

/**
 * 当前课程对应的专栏列表
 */
export function getCourseColumnList(params) {
  return request({
    url: `/qxcollege/admin/course/list/column/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}

/**
 * 课程审核
 */
export function changeCourseStatus(params) {
  return request({
    url: '/qxcollege/admin/course/apply',
    method: 'post',
    params
  })
}

/**
 * 操作课程上下架
 * @param {*} params
 * courseCode
 * shelfStatus 状态（1上架，2下架）
 * @returns
 */
export function operateCourseShelfStatus(params) {
  return request({
    url: '/qxcollege/admin/course/operation',
    method: 'post',
    params
  })
}
