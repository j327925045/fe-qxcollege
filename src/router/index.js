import Layout from '@/components/common/index.vue'
import Vue from 'vue'
import Router from 'vue-router'
import { Dictionary } from './modules/Dictionary'
import { Employees } from './modules/Employees'
import { Hospital } from './modules/Hospital'
import { Organization } from './modules/Organization'
import { System } from './modules/System'
import { User } from './modules/User'

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
    meta: { title: '工作台', icon: 'menu-icon-home' },
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: { title: '工作台', onlyShow: true }
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
  ...User,
  ...Organization,
  ...Employees,
  ...Hospital,
  ...Dictionary,
  ...System,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

formatRoutes(originRoutes.filter(item => !item.hidden))

export const routes = originRoutes

const router = new Router({
  mode: 'hash',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
