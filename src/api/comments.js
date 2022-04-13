import request from '@/utils/request.js'

/**
 * 列表-删除评论
 */
export function replyCommentsItem(data) {
  return request({
    url: '/qxcollege/admin/coursecomment/reply',
    method: 'post',
    data
  })
}
/**
 * 列表-删除评论
 */
export function deleteCommentsItem(data) {
  return request({
    url: '/qxcollege/admin/coursecomment/delete',
    method: 'post',
    data
  })
}

/**
 * 获取评论列表
 */
export function getCommentsList(params) {
  return request({
    url: '/qxcollege/admin/coursecomment/all',
    method: 'get',
    params
  })
}
