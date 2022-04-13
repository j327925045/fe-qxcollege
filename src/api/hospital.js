import request from '@/utils/request.js'

export function addHospitalItem(data) {
  return request({
    url: '/qxcollege/admin/hospital/add',
    method: 'post',
    data: data
  })
}

export function deleteHospitalItem(data) {
  return request({
    url: '/qxcollege/admin/hospital/delete',
    method: 'post',
    data: data
  })
}

export function updateHospitalItem(data) {
  return request({
    url: '/qxcollege/admin/hospital/edit',
    method: 'post',
    data: data
  })
}

export function getAllHospitalItems(params) {
  return request({
    url: '/qxcollege/admin/hospital/findAll',
    method: 'get',
    params: params
  })
}

export function getHospitalDetail(params) {
  return request({
    url: `/qxcollege/admin/hospital/get/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}

export function getHospitalList(params) {
  return request({
    url: '/qxcollege/admin/hospital/list',
    method: 'get',
    params: params
  })
}
// 医生标签接口
export function getTagList(params) {
  return request({
    url: '/qxcollege/admin/tag/list',
    method: 'get',
    params: params
  })
}

// 关联信息列表
export function getTabhList(params) {
  return request({
    url: '/qxcollege/admin/hospital/list/doctor',
    method: 'get',
    params: params
  })
}
