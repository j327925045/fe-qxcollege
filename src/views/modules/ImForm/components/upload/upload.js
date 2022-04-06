import { findAliToken } from '@/api/fileupload'
const OSS = require('ali-oss')

export function beforeUpload(file, maxSize) {
  if (file.size > maxSize * 1024 * 1024) {
    this.$message.error(`上传文件大小不能超过 ${maxSize}MB!`)
    return false
  }
  return true
}

export async function fnUploadRequest(options) {
  try {
    const res = await findAliToken()
    const resData = res.data
    const client = new OSS({
      accessKeyId: resData.accessKeyId, // 查看你自己的阿里云KEY
      accessKeySecret: resData.accessKeySecret, // 查看自己的阿里云KEYSECRET
      stsToken: resData.securityToken,
      bucket: 'imeiktest', // 你的 OSS bucket 名称
      region: 'oss-cn-beijing', // bucket 所在地址，我的是 华北2 北京
      endpoint: 'oss-cn-beijing.aliyuncs.com' // 自己的域名
    })
    const file = options.file // 拿到 file
    const fileName = file.name.substr(0, file.name.lastIndexOf('.'))
    const date = new Date().getTime()
    const fileNames = `${date}_${fileName}` // 拼接文件名，保证唯一，这里使用时间戳+原文件名
    // 上传文件,这里是上传到OSS的 uploads文件夹下
    client.put('pcUploads/' + fileNames, file).then(res => {
      if (res.res.statusCode === 200) {
        options.onSuccess(res)
      } else {
        options.onError('上传失败')
      }
    })
  } catch (e) {
    options.onError('上传失败')
  }
}
