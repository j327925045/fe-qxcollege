import Layout from '@/components/common/index.vue'
import store from '@/store/index'
import Vue from 'vue'
import Router from 'vue-router'
import { Production } from './modules/Production'

Vue.use(Router)

function formatRoutes(routes, parentItem) {
  for (let i = 0; i < routes.length; i++) {
    const item = routes[i]
    item.meta = item.meta || {}
    if (!parentItem) {
      item.id = `${i}`
      item.meta.topIndex = i
    } else {
      item.id = `${parentItem.id}-${i}`
      item.meta.topIndex = parentItem.meta.topIndex
    }
    if (item.children && item.children.length > 0) {
      formatRoutes(item.children, item)
    }
  }
}

const originRoutes = [
  {
    path: '/404',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue'),
        meta: { title: '找不到该页面', icon: 'el-icon-date-solid' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    meta: { title: '首页', linkPageName: 'home' },
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Index.vue'),
        meta: { title: '首页', icon: 'el-icon-s-marketing' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
    meta: { title: '登录' }
  },
  ...Production,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

formatRoutes(originRoutes.filter(item => !item.hidden))

console.log('originRoutes', originRoutes)

export const routes = originRoutes

const router = new Router({
  mode: 'hash', // 推荐使用 history 便于埋点统计且地址栏路径较直观
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 路由守卫
router.beforeEach(async(to, from, next) => {
  store.commit('app/INIT_FRAMEWORK')
  // 使用keepAlive缓存组件
  store.commit('app/KEEP_ALIVE', to.name)
  // 获取用户信息
  await store.dispatch('user/getUserInfo')
  // 校验菜单权限
  next()
})

export default router
