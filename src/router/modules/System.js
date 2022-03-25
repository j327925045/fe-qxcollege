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
        path: '/system/permissions',
        name: 'SystemPermissionsList',
        component: () => import('@/views/system/permissions/list'),
        meta: { title: '权限列表' }
      },
      {
        path: '/system/permissions/create',
        name: 'SystemPermissionsCreate',
        hidden: true,
        component: () => import('@/views/system/permissions/create'),
        meta: { title: '添加权限', highlightPath: '/system/permissions' }
      },
      {
        path: '/system/permissions/update',
        name: 'SystemPermissionsUpdate',
        hidden: true,
        component: () => import('@/views/system/permissions/create'),
        meta: { title: '修改用户', highlightPath: '/system/permissions' }
      },
      {
        path: '/system/role',
        name: 'SystemRoleList',
        component: () => import('@/views/system/role/list'),
        meta: { title: '角色列表' }
      },
      {
        path: '/system/log',
        name: 'SystemLogList',
        component: () => import('@/views/system/log/list'),
        meta: { title: '操作日志' }
      }
    ]
  }
]
