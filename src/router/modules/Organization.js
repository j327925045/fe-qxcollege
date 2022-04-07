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
        path: '/hospital/list',
        name: 'HospitalList',
        component: () => import('@/views/hospital/list'),
        meta: { title: '机构列表' }
      },
      {
        path: '/hospital/addOrEdit',
        name: 'HospitalAddOrEdit',
        hidden: true,
        component: () => import('@/views/hospital/addOrEdit'),
        meta: { title: '机构操作', noTab: true, highlightPath: '/hospital/list' }
      },
      {
        path: '/organization/list',
        name: 'OrganizationList',
        component: () => import('@/views/organization/list'),
        meta: { title: '集团列表' }
      },
      {
        path: '/organization/addOrEdit',
        name: 'OrganizationAddOrEdit',
        hidden: true,
        component: () => import('@/views/organization/addOrEdit'),
        meta: { title: '机构操作', noTab: true, highlightPath: '/organization/list' }
      }
    ]
  }
]
