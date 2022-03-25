import request from '@/utils/request.js'

/**
 * 获取词典列表
 */
export function getDictionaryList(params) {
  return request({
    url: '/qxcollege/dictionary/list',
    method: 'get',
    params
  })
}

export function deleteDictionaryItem(data) {
  return request({
    url: '/qxcollege/dictionary/delete',
    method: 'post',
    data
  })
}

export function addDictionaryItem(data) {
  return request({
    url: '/qxcollege/dictionary/add',
    method: 'post',
    data
  })
}

export function updateDictionaryItem(data) {
  return request({
    url: '/qxcollege/dictionary/edit',
    method: 'post',
    data
  })
}

export function getDictionaryDetail(params) {
  return request({
    url: `/qxcollege/dictionary/get/${params.id}`,
    method: 'get',
    params: {}
  })
}

export function getAllDictionaryItems(params) {
  return request({
    url: '/qxcollege/dictionary/tree',
    method: 'get',
    params
  })
}
