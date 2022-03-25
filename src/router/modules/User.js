import Layout from '@/components/common/index.vue'

export const User = [
  {
    path: '/user',
    name: 'User',
    component: Layout,
    redirect: '/user/list',
    meta: { title: '用户管理', icon: 'menu-icon-user' },
    children: [
      {
        path: '/user/list',
        name: 'UserList',
        component: () => import('@/views/user/list'),
        meta: { title: '用户列表' }
      },
      {
        path: '/user/create',
        name: 'UserCreate',
        hidden: true,
        component: () => import('@/views/user/create'),
        meta: { title: '添加用户', highlightPath: '/user/list' }
      },
      {
        path: '/user/update',
        name: 'UserUpdate',
        hidden: true,
        component: () => import('@/views/user/create'),
        meta: { title: '修改用户', highlightPath: '/user/list' }
      }
    ]
  }
]
