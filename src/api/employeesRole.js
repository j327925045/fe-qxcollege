import request from '@/utils/request.js'

/**
 * 设置员工角色
 */
export function setEmployeesRole(data) {
  return request({
    url: '/qxcollege/admin/employeerole/set',
    method: 'post',
    data: data
  })
}

export function getEmployeesRoleDetail(params) {
  return request({
    url: `/qxcollege/admin/employeerole/get/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}
