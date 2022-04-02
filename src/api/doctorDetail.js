import request from '@/utils/request.js'

/**
 * 获取词典列表
 */
export function getList(params) {
  return request({
    url: `/qxcollege/user/get/${params.objectCode}`,
    method: 'get'
  })
}
