import request from '@/utils/request.js'

// 医生标签接口
export function getTagList(params) {
  return request({
    url: '/qxcollege/tag/list',
    method: 'get',
    params: params
  })
}
