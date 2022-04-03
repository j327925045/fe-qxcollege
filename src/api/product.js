import request from '@/utils/request.js'

/**
 * 获取用户列表
 */
export function getProductList(params) {
  return request({
    url: '/qxcollege/product/list',
    method: 'get',
    params
  })
}

/**
 * 添加用户
 * @param data
 * @returns {*}
 */
export function addProductItem(data) {
  return request({
    url: '/qxcollege/product/add',
    method: 'post',
    data: data
  })
}

/**
 * 删除用户
 * @param data
 * @returns {*}
 */
export function deleteProductItem(data) {
  return request({
    url: '/qxcollege/product/delete',
    method: 'post',
    data: data
  })
}

/**
 * 更新用户数据
 * @param data
 * @returns {*}
 */
export function updateProductItem(data) {
  return request({
    url: '/qxcollege/product/edit',
    method: 'post',
    data: data
  })
}

/**
 * 获取用户详情
 * @param params
 * @returns {*}
 */
export function getProductDetail(params) {
  return request({
    url: `/qxcollege/product/get/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}
