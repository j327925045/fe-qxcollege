import request from '@/utils/request.js'

/**
 * 获取词典列表
 */
export function getDictionaryList(params) {
  return request({
    url: '/qxcollege/admin/dictionary/list',
    method: 'get',
    params
  })
}

export function deleteDictionaryItem(data) {
  return request({
    url: '/qxcollege/admin/dictionary/delete',
    method: 'post',
    data
  })
}

export function addDictionaryItem(data) {
  return request({
    url: '/qxcollege/admin/dictionary/add',
    method: 'post',
    data
  })
}

export function updateDictionaryItem(data) {
  return request({
    url: '/qxcollege/admin/dictionary/edit',
    method: 'post',
    data
  })
}

export function getDictionaryDetail(params) {
  return request({
    url: `/qxcollege/admin/dictionary/get/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}

export function getAllDictionaryItems(params) {
  return request({
    url: '/qxcollege/admin/dictionary/tree',
    method: 'get',
    params
  })
}

export function setDictionaryByOnce(data) {
  return request({
    url: '/qxcollege/admin/dictionary/wholeAdd',
    method: 'post',
    data
  })
}

export function getDictionaryBySine(params) {
  return request({
    url: '/qxcollege/admin/dictionary/getListBySign',
    method: 'post',
    params
  })
}
