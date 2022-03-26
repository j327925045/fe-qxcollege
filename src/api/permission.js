import request from '@/utils/request.js'

export function addPermissionItem(data) {
  return request({
    url: '/qxcollege/permission/add',
    method: 'post',
    data: data
  })
}

export function deletePermissionItem(data) {
  return request({
    url: '/qxcollege/permission/delete',
    method: 'post',
    data: data
  })
}

export function updatePermissionItem(data) {
  return request({
    url: '/qxcollege/permission/edit',
    method: 'post',
    data: data
  })
}

export function getPermissionDetail(params) {
  return request({
    url: `/qxcollege/permission/get/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}

export function getPermissionList(params) {
  return request({
    url: '/qxcollege/permission/list',
    method: 'get',
    params
  })
}

export function getPermissionTree(params) {
  return request({
    url: '/qxcollege/permission/tree',
    method: 'get',
    params
  })
}
