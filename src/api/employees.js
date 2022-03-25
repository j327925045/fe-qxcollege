import request from '@/utils/request.js'

/**
 * 获取当前用户信息
 */
export function getCurrentInfo(params) {
  return request({
    url: '/qxcollege/employee/info',
    method: 'get',
    params
  })
}

/**
 * 获取员工列表
 */
export function getEmployeesList(params) {
  return request({
    url: '/qxcollege/employee/list',
    method: 'get',
    params
  })
}

/**
 * 添加新员工
 */
export function addEmployeesItem(data) {
  return request({
    url: '/qxcollege/employee/add',
    method: 'post',
    data
  })
}

/**
 * 删除员工
 */
export function deleteEmployeesItem(data) {
  return request({
    url: '/qxcollege/employee/delete',
    method: 'post',
    data
  })
}

/**
 * 导出
 */
export function exportEmployees(params) {
  return request({
    url: '/qxcollege/employee/export',
    method: 'get',
    params
  })
}

/**
 * 获取详情
 */
export function getEmployeesDetail(params) {
  return request({
    url: `/qxcollege/employee/get/${params.id}`,
    method: 'get',
    params: {}
  })
}

/**
 * 更新
 */
export function updateEmployeeItem(data) {
  return request({
    url: '/qxcollege/employee/edit',
    method: 'post',
    data
  })
}
