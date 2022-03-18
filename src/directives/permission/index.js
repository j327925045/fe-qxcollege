import { roles } from '@/store/getters.js'

export const permission = {
  inserted(el, binding) {
    const { value } = binding
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some((role) => permissionRoles.includes(role))
      if (!hasPermission && el.parentNode) {
        el.parentNode.removeChild(el)
      }
    } else {
      throw new Error("need roles! Like v-permission=\"['admin','editor']\"")
    }
  }
}
