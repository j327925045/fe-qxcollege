import request from '@/utils/request.js'

export function addHospitalItem(data) {
  return request({
    url: '/qxcollege/hospital/add',
    method: 'post',
    data: data
  })
}

export function deleteHospitalItem(data) {
  return request({
    url: '/qxcollege/hospital/delete',
    method: 'post',
    data: data
  })
}

export function updateHospitalItem(data) {
  return request({
    url: '/qxcollege/hospital/edit',
    method: 'post',
    data: data
  })
}

export function getAllHospitalItems(params) {
  return request({
    url: '/qxcollege/hospital/findAll',
    method: 'get',
    params: params
  })
}

export function getHospitalDetail(params) {
  return request({
    url: `/qxcollege/hospital/get/${params.id}`,
    method: 'get',
    params: {}
  })
}

export function getHospitalList(params) {
  return request({
    url: '/qxcollege/hospital/list',
    method: 'get',
    params: params
  })
}
