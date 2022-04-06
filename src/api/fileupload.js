import request from '@/utils/request.js'

/**
 * 添加专栏项
 */
export function findAliToken() {
  return request({
    url: '/qxcollege/fileUpload/findAliToken',
    method: 'post',
    data: {}
  })
}
