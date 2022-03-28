import request from '@/utils/request.js'

/**
 * 设置角色权限
 * "permissionCode"
 * "roleCode"
 */
export function setRolePermission(data) {
  return request({
    url: '/qxcollege/rolepermission/set',
    method: 'post',
    data: data
  })
}

export function getRolePermissionDetail(params) {
  return request({
    url: `/qxcollege/rolepermission/get/${params.objectCode}`,
    method: 'get',
    params
  })
}
