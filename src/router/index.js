import Layout from '@/components/common/index.vue'
import store from '@/store/index'
import Vue from 'vue'
import Router from 'vue-router'
import { Components } from './modules/Components'
import { Detail } from './modules/Detail'
import { HtmlStyle } from './modules/HtmlStyle'
import { RouterBreadcrumb } from './modules/RouterBreadcrumb'
import { Search } from './modules/Search'

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
        component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
        meta: { title: '找不到该页面', icon: 'el-icon-date-solid' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Index.vue'),
        meta: { title: '首页', icon: 'el-icon-s-marketing' }
      }
    ]
  },
  ...HtmlStyle,
  ...RouterBreadcrumb,
  ...Search,
  ...Detail,
  ...Components,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

formatRoutes(originRoutes.filter(item => !item.hidden))

console.log('originRoutes', originRoutes)

export const routes = originRoutes

// 找不到页面的路由，需要追加在路由表末尾
const notFoundRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

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

// 全局路由状态
// const checkStatus = false

// 前端校验路由权限 [通过接口返回的路由与本地全量的路由进行对比]
const checkRouterRole = (routers, checkRouter) => {
  // routers.forEach((route) => {
  //   if (route.name === checkRouter) {
  //     checkStatus = true
  //     return checkStatus
  //   }
  //   return route.children && route.children.length && checkRouterRole(route.children, checkRouter)
  // })
  return true
}

// 依赖服务端接口动态注册路由
// const dynamicRegistRouters = (routers: any) => {
//   router.addRoutes()
// }

// 递归替换异步路由为对应组件
const replaceAsyncRoutes = (routes, asyncRoutes) => {
  routes.forEach((item, index) => {
    const { name, path, meta, href, type } = item
    // const { name, path, meta } = item
    const curRoute = {
      name,
      path,
      meta,
      href,
      type,
      children: []
    }
    asyncRoutes.push(curRoute)
    if (item.children && item.children.length) {
      replaceAsyncRoutes(item.children, asyncRoutes[index].children)
    }
  })
}

// 添加服务端异步路由
export const addAsyncRoutes = async(routes) => {
  const asyncRoutes = []
  routes.forEach((item, index) => {
    if (item && item.children) {
      asyncRoutes[index] = {
        path: '/',
        component: Layout,
        children: []
      }
      replaceAsyncRoutes(item.children, asyncRoutes[index].children)
    }
  })
  let allRoutes = []
  allRoutes = allRoutes.concat(asyncRoutes, notFoundRoutes)
  await router.addRoutes(allRoutes)
  // 兼容 vue-router this.$router.options.routes 不赋值的问题
  router.options.routes = router.options.routes.concat(allRoutes)
}

// 路由守卫
router.beforeEach(async(to, from, next) => {
  store.commit('app/INIT_FRAMEWORK')
  // 使用keepAlive缓存组件
  store.commit('app/KEEP_ALIVE', to.name)
  // 重置路由状态
  // checkStatus = false
  // 获取用户信息
  await store.dispatch('user/getUserInfo')
  // 获取菜单
  // if (!store.state.app.menus.length) {
  // await store.dispatch('app/getMenus')
  // 追加iframe路由
  // await addAsyncRoutes(store.state.app.menus)
  // }
  // 校验菜单权限
  const routerWhiteList = ['/', '404']
  if (routerWhiteList.some((white) => white === to.name) || checkRouterRole(store.state.app.menus, to.name)) {
    next()
  } else {
    next({ name: '404' })
  }
})

export default router
