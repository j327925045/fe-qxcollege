import Layout from '@/components/common/index.vue'

export const Organization = [
  {
    path: '/organization',
    name: 'Organization',
    component: Layout,
    redirect: '/organization/list',
    meta: { title: '机构管理', icon: 'menu-icon-organization' },
    children: [
      {
        path: '/organization/list',
        name: 'OrganizationList',
        component: () => import('@/views/organization/list'),
        meta: { title: '机构列表' }
      },
      {
        path: '/organization/create',
        name: 'OrganizationCreate',
        hidden: true,
        component: () => import('@/views/organization/create'),
        meta: { title: '添加机构', highlightPath: '/organization/list' }
      },
      {
        path: '/organization/update',
        name: 'OrganizationUpdate',
        hidden: true,
        component: () => import('@/views/organization/create'),
        meta: { title: '修改机构', highlightPath: '/organization/list' }
      }
    ]
  }
]
