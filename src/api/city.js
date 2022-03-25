import request from '@/utils/request.js'

/**
 * 获取省市区
 */
export function getRegionData(params) {
  return request({
    url: '/qxcollege/city/tree',
    method: 'get',
    params
  })
}
