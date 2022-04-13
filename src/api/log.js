import request from '@/utils/request.js'

export function getLogList(params) {
  return request({
    url: '/qxcollege/admin/log/list',
    method: 'get',
    params: params
  })
}
