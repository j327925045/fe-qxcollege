// Filter for article status
export const articleStatusFilter = (status) => {
  const statusMap = {
    published: 'success',
    draft: 'info',
    deleted: 'danger'
  }
  return statusMap[status]
}

// 让第一个字母大写
export const uppercaseFirstChar = (str) => str.charAt(0).toUpperCase() + str.slice(1)

// 数字格式化
export const numberal = (num) => Number(num).toLocaleString()
