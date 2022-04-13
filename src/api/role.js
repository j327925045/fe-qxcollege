import request from '@/utils/request.js'

export function addRoleItem(data) {
  return request({
    url: '/qxcollege/admin/role/add',
    method: 'post',
    data: data
  })
}

export function deleteRoleItem(data) {
  return request({
    url: '/qxcollege/admin/role/delete',
    method: 'post',
    data: data
  })
}

export function updateRoleItem(data) {
  return request({
    url: '/qxcollege/admin/role/edit',
    method: 'post',
    data: data
  })
}

export function getAllRoleList(params) {
  return request({
    url: '/qxcollege/admin/role/findAll',
    method: 'get',
    params: params
  })
}

export function getRoleDetail(params) {
  return request({
    url: `/qxcollege/admin/role/get/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}

export function getRoleList(params) {
  return request({
    url: '/qxcollege/admin/role/list',
    method: 'get',
    params: params
  })
}
