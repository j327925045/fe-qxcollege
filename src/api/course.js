import request from '@/utils/request.js'

/**
 * 添加课程
 */
export function addCourseItem(data) {
  return request({
    url: '/qxcollege/course/add',
    method: 'post',
    data
  })
}

/**
 * 编辑课程
 */
export function updateCourseItem(data) {
  return request({
    url: '/qxcollege/course/edit',
    method: 'post',
    data
  })
}

/**
 * 删除课程
 */
export function deleteCourseItem(data) {
  return request({
    url: '/qxcollege/course/delete',
    method: 'post',
    data
  })
}

/**
 * 获取课程详情
 */
export function getCourseDetail(params) {
  return request({
    url: `/qxcollege/course/get/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}

/**
 * 获取课程列表
 */
export function getCourseList(params) {
  return request({
    url: '/qxcollege/course/list',
    method: 'get',
    params
  })
}
