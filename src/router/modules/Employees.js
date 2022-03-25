import Layout from '@/components/common/index.vue'

export const Employees = [
  {
    path: '/employees',
    name: 'Employees',
    component: Layout,
    redirect: '/employees/list',
    meta: { title: '员工管理', icon: 'menu-icon-employees' },
    children: [
      {
        path: '/employees/list',
        name: 'EmployeesList',
        component: () => import('@/views/employees/list'),
        meta: { title: '员工列表' }
      }
    ]
  }
]
