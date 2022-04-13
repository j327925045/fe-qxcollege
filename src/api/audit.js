import request from '@/utils/request.js'
/**
 * 获取审批列表
 */
export function getDataList(params) {
  return request({
    url: '/qxcollege/admin/userrealapplyrecord/list',
    method: 'get',
    params
  })
}

/**
 * 删除
 * @param data
 * @returns {*}
 */
export function deleteAudit(data) {
  return request({
    url: '/qxcollege/admin/userrealapplyrecord/delete',
    method: 'post',
    data: data
  })
}

/**
 * 获取审批详情
 */
export function getDetail(params) {
  console.log(params)
  return request({
    url: `/qxcollege/admin/userrealapplyrecord/get/${params}`,
    method: 'get'
  })
}

/**
 * 审批
 * @param data
 * @returns {*}
 */
export function auditCommit(data) {
  return request({
    url: '/qxcollege/admin/userrealapplyrecord/commit',
    method: 'post',
    data: data
  })
}
