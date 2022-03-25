import request from '@/utils/request.js'

export function addRoleItem(data) {
  return request({
    url: '/qxcollege/role/add',
    method: 'post',
    data: data
  })
}

export function deleteRoleItem(data) {
  return request({
    url: '/qxcollege/role/delete',
    method: 'post',
    data: data
  })
}

export function updateRoleItem(data) {
  return request({
    url: '/qxcollege/role/edit',
    method: 'post',
    data: data
  })
}

export function getAllRoleList(params) {
  return request({
    url: '/qxcollege/role/findAll',
    method: 'get',
    params: params
  })
}

export function getRoleDetail(params) {
  return request({
    url: `/qxcollege/role/get/${params.id}`,
    method: 'get',
    params: {}
  })
}

export function getRoleList(params) {
  return request({
    url: '/qxcollege/role/list',
    method: 'get',
    params: params
  })
}
