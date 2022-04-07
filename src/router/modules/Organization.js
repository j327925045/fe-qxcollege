import Layout from '@/components/common/index.vue'

export const Organization = [
  {
    path: '/organization',
    name: 'Organization',
    component: Layout,
    redirect: '/organization/list',
    meta: { title: '集团管理', icon: 'menu-icon-organization' },
    children: [
      {
        path: '/organization/list',
        name: 'OrganizationList',
        component: () => import('@/views/organization/list'),
        meta: { title: '集团列表' }
      },
      {
        path: '/hospital/list',
        name: 'HospitalList',
        component: () => import('@/views/hospital/list'),
        meta: { title: '机构列表' }
      }
    ]
  }
]
