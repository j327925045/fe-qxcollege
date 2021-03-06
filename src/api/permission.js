import request from '@/utils/request.js'

export function addPermissionItem(data) {
  return request({
    url: '/qxcollege/admin/permission/add',
    method: 'post',
    data: data
  })
}

export function deletePermissionItem(data) {
  return request({
    url: '/qxcollege/admin/permission/delete',
    method: 'post',
    data: data
  })
}

export function updatePermissionItem(data) {
  return request({
    url: '/qxcollege/admin/permission/edit',
    method: 'post',
    data: data
  })
}

export function getPermissionDetail(params) {
  return request({
    url: `/qxcollege/admin/permission/get/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}

export function getPermissionList(params) {
  return request({
    url: '/qxcollege/admin/permission/list',
    method: 'get',
    params
  })
}

export function getPermissionTree(params) {
  return request({
    url: '/qxcollege/admin/permission/tree',
    method: 'get',
    params
  })
}
