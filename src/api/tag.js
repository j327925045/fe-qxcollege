import request from '@/utils/request.js'

/**
 * 添加标签
 */
export function addTagItem(data) {
  return request({
    url: '/qxcollege/tag/add',
    method: 'post',
    data
  })
}

/**
 * 删除标签
 */
export function deleteTagItem(data) {
  return request({
    url: '/qxcollege/tag/delete',
    method: 'post',
    data
  })
}

/**
 * 更新标签
 */
export function updateTagItem(data) {
  return request({
    url: '/qxcollege/tag/edit',
    method: 'post',
    data
  })
}

/**
 * 获取标签详情
 */
export function getTagDetail(params) {
  return request({
    url: `/qxcollege/tag/get/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}

/**
 * 标签列表
 */
export function getTagList(params) {
  return request({
    url: '/qxcollege/tag/list',
    method: 'get',
    params: params
  })
}
