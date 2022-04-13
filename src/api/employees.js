import request from '@/utils/request.js'

/**
 * 获取当前用户信息
 */
export function getCurrentInfo(params) {
  return request({
    url: '/qxcollege/admin/employee/info',
    method: 'get',
    params
  })
}

/**
 * 获取员工列表
 */
export function getEmployeesList(params) {
  return request({
    url: '/qxcollege/admin/employee/list',
    method: 'get',
    params
  })
}

/**
 * 添加新员工
 */
export function addEmployeesItem(data) {
  return request({
    url: '/qxcollege/admin/employee/add',
    method: 'post',
    data
  })
}

/**
 * 删除员工
 */
export function deleteEmployeesItem(data) {
  return request({
    url: '/qxcollege/admin/employee/delete',
    method: 'post',
    data
  })
}

/**
 * 获取详情
 */
export function getEmployeesDetail(params) {
  return request({
    url: `/qxcollege/admin/employee/get/${params.objectCode}`,
    method: 'get',
    params: {}
  })
}

/**
 * 更新
 */
export function updateEmployeesItem(data) {
  return request({
    url: '/qxcollege/admin/employee/edit',
    method: 'post',
    data
  })
}
