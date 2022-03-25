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
      },
      {
        path: '/hospital/create',
        name: 'HospitalCreate',
        hidden: true,
        component: () => import('@/views/hospital/create'),
        meta: { title: '添加医院', highlightPath: '/hospital/list' }
      },
      {
        path: '/hospital/update',
        name: 'HospitalUpdate',
        hidden: true,
        component: () => import('@/views/hospital/create'),
        meta: { title: '修改医院', highlightPath: '/hospital/list' }
      }
    ]
  }
]
