import request from '@/utils/request.js'

/**
 * 获取评论列表
 */
export function getCommentList(params) {
  return request({
    url: '/qxcollege/coursecomment/list',
    method: 'get',
    params
  })
}
