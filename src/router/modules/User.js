import Layout from '@/components/common/index.vue'

export const User = [
  {
    path: '/user',
    name: 'User',
    component: Layout,
    redirect: '/user/list',
    meta: { title: '用户管理', icon: 'el-icon-s-marketing' },
    children: [
      {
        path: '/user/list',
        name: 'UserList',
        component: () => import('@/views/user/list'),
        meta: { title: '用户列表' }
      }
    ]
  }
]
