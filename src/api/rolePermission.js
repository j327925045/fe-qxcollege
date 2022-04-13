import request from '@/utils/request.js'

/**
 * 设置角色权限
 * "permissionCode"
 * "roleCode"
 */
export function setRolePermission(data) {
  return request({
    url: '/qxcollege/admin/rolepermission/set',
    method: 'post',
    data: data
  })
}

export function getRolePermissionDetail(params) {
  return request({
    url: `/qxcollege/admin/rolepermission/get/${params.objectCode}`,
    method: 'get',
    params
  })
}
