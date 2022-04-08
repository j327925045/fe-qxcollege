import Layout from '@/components/common/index.vue'

export const System = [
  {
    path: '/system',
    name: 'System',
    component: Layout,
    redirect: '/dictionary/list',
    meta: { title: '系统设置', icon: 'menu-icon-system' },
    children: [
      {
        path: '/dictionary/list',
        name: 'DictionaryList',
        component: () => import('@/views/dictionary/list'),
        meta: { title: '字段列表' }
      },
      {
        path: '/tag/list',
        name: 'TagList',
        component: () => import('@/views/tag/list'),
        meta: { title: '标签列表' }
      },
      {
        path: '/audit/list',
        name: 'AuditList',
        component: () => import('@/views/audit/list'),
        meta: { title: '审批列表' }
      },
      {
        path: '/role/list',
        name: 'RoleList',
        component: () => import('@/views/role/list'),
        meta: { title: '角色列表' }
      },
      {
        path: '/permissions/list',
        name: 'PermissionsList',
        component: () => import('@/views/permissions/list'),
        meta: { title: '权限列表' }
      },
      {
        path: '/log/list',
        name: 'LogList',
        component: () => import('@/views/log/list'),
        meta: { title: '操作日志' }
      }
    ]
  }
]
