import Layout from '@/components/common/index.vue'

export const Hospital = [
  {
    path: '/hospital',
    name: 'Hospital',
    component: Layout,
    redirect: '/hospital/list',
    meta: { title: '医院管理', icon: 'menu-icon-hospital' },
    children: [
      {
        path: '/hospital/list',
        name: 'HospitalList',
        component: () => import('@/views/hospital/list'),
        meta: { title: '医院列表' }
      }
    ]
  }
]
