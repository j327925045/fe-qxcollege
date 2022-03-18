import Layout from '@/components/common/index.vue'

export const RouterBreadcrumb = [
  {
    path: '/routerBreadcrumb',
    name: 'RouterBreadcrumb',
    component: Layout,
    meta: { title: '模块二', icon: 'el-icon-s-marketing' },
    children: [
      {
        path: '/routerBreadcrumb/page1',
        name: 'Page1',
        component: () => import('@/views/routerBreadcrumb/children/page1/index.vue'),
        meta: { title: 'Page1', icon: 'el-icon-s-marketing' },
        children: [
          {
            path: '/routerBreadcrumb/page11',
            name: 'Page11',
            component: () => import('@/views/routerBreadcrumb/children/page1/children/page1-1/index.vue'),
            meta: { title: 'Page11', icon: 'el-icon-s-marketing' }
          },
          {
            path: '/routerBreadcrumb/page12',
            name: 'Page12',
            component: () => import('@/views/routerBreadcrumb/children/page1/children/page1-2/index.vue'),
            meta: { title: 'Page12', icon: 'el-icon-s-marketing' }
          }
        ]
      },
      {
        path: '/routerBreadcrumb/page2',
        name: 'Page2',
        component: () => import('@/views/routerBreadcrumb/children/page2/index.vue'),
        meta: { title: 'Page2', icon: 'el-icon-s-marketing' }
      },
      {
        path: '/routerBreadcrumb/page3',
        name: 'Page3',
        component: () => import('@/views/routerBreadcrumb/children/page3/index.vue'),
        meta: { title: 'Page3', icon: 'el-icon-s-marketing' }
      }
    ]
  }
]
