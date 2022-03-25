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
      },
      {
        path: '/employees/create',
        name: 'EmployeesCreate',
        hidden: true,
        component: () => import('@/views/employees/create'),
        meta: { title: '新建员工', highlightPath: '/employees/list' }
      },
      {
        path: '/employees/update',
        name: 'EmployeesUpdate',
        hidden: true,
        component: () => import('@/views/employees/create'),
        meta: { title: '修改员工', highlightPath: '/employees/list' }
      }
    ]
  }
]
