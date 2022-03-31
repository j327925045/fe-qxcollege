import Layout from '@/components/common/index.vue'

export const System = [
  {
    path: '/system',
    name: 'System',
    component: Layout,
    redirect: '/system/permissions',
    meta: { title: '系统设置', icon: 'menu-icon-system' },
    children: [
      {
        path: '/system/dictionary',
        name: 'DictionaryList',
        component: () => import('@/views/dictionary/list'),
        meta: { title: '字段列表' }
      },
      {
        path: '/system/role',
        name: 'RoleList',
        component: () => import('@/views/role/list'),
        meta: { title: '角色列表' }
      },
      {
        path: '/system/permissions',
        name: 'PermissionsList',
        component: () => import('@/views/permissions/list'),
        meta: { title: '权限列表' }
      },
      {
        path: '/system/log',
        name: 'LogList',
        component: () => import('@/views/log/list'),
        meta: { title: '操作日志' }
      }
    ]
  }
]
