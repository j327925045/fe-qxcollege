import request from '@/utils/request.js'

export function getLogList(params) {
  return request({
    url: '/qxcollege/log/list',
    method: 'get',
    params: params
  })
}
