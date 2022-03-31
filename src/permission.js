import { getToken, removeToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
import router from './router'
import store from './store'

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()
  store.commit('app/KEEP_ALIVE', to.name)

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          await store.dispatch('user/getInfo')
          await store.dispatch('app/getEnums')
          next()
        } catch (error) {
          removeToken()
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
