import request from '@/utils/request.js'

/**
 * 添加专栏项
 */
export function addCommentsItem(data) {
  data.createSource = 1 // 创建来源(1.后台创建 2,小程序创建)
  return request({
    url: '/qxcollege/comments/add',
    method: 'post',
    data
  })
}

/**
 * 删除专栏
 */
export function deleteCommentsItem(data) {
  return request({
    url: '/qxcollege/comments/delete',
    method: 'post',
    data
  })
}

/**
 * 更新专栏项
 */
export function updateCommentsItem(data) {
  data.createSource = 1 // 创建来源(1.后台创建 2,小程序创建)
  return request({
    url: '/qxcollege/comments/edit',
    method: 'post',
    data
  })
}

/**
 * 获取专栏详情
 */
export function getCommentsDetail(params) {
  return request({
    url: `/qxcollege/comments/get/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}

/**
 * 获取专栏列表
 */
export function getCommentsList(params) {
  return request({
    url: '/qxcollege/coursecomment/all',
    method: 'get',
    params
  })
}
