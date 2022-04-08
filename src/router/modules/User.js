import Layout from '@/components/common/index.vue'

export const User = [
  {
    path: '/user',
    name: 'User',
    component: Layout,
    redirect: '/user/list',
    meta: { title: '医生管理', icon: 'menu-icon-user' },
    children: [
      {
        path: '/user/list',
        name: 'UserList',
        component: () => import('@/views/user/list'),
        meta: { title: '医生列表' }
      },
      {
        path: '/user/detail',
        name: 'UserDetail',
        hidden: true,
        component: () => import('@/views/user/detail'),
        meta: { title: '医生详情', noTab: true, highlightPath: '/user/list' }
      },
      {
        path: '/user/addOrEdit',
        name: 'UserAddOrEdit',
        hidden: true,
        component: () => import('@/views/user/addOrEdit'),
        meta: { title: '医生管理', noTab: true, highlightPath: '/user/list' }
      },
      {
        path: '/user/editExports',
        name: 'editExports',
        hidden: true,
        component: () => import('@/views/user/editExports'),
        meta: { title: '创建医生', noTab: true, highlightPath: '/user/list' }
      }
    ]
    // detail
  }
]
