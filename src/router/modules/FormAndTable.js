import Layout from '@/components/common/index.vue'

export const FormAndTable = [
  {
    path: '/formandtable',
    name: 'FormAndTable',
    component: Layout,
    redirect: '/formandtable/index',
    meta: { title: '表单表格', icon: 'menu-icon-formandtable' },
    children: [
      {
        path: '/formandtable/index',
        name: 'FormAndTableIndex',
        component: () => import('@/views/formandtable/index'),
        meta: { title: '表单表格' }
      }
    ]
  }
]
