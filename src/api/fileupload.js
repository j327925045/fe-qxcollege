import request from '@/utils/request.js'

/**
 * 添加文件上传信息
 */
export function findAliToken() {
  return request({
    url: '/qxcollege/fileUpload/findAliToken',
    method: 'post',
    data: {}
  })
}

/**
 * 获取视频上传信息
 */
export function findAliVideoToken() {
  return request({
    url: '/qxcollege/fileUpload/findAliVideoToken',
    method: 'post',
    data: {}
  })
}

/**
 * 获取阿里播放器权限字段
 */
export function getAliPlayerAuth(params) {
  return request({
    url: `/qxcollege/fileUpload/findAliPlay/${params.vid}`,
    method: 'get',
    params
  })
}
