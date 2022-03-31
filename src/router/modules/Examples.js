import Layout from '@/components/common/index.vue'

const queryUrl = new URL(location.href)

export const Examples = [
  {
    path: '/examples',
    name: 'Examples',
    component: Layout,
    hidden: !queryUrl.searchParams.get('dev'),
    redirect: '/examples/formandtable',
    meta: { title: '示例页面', icon: 'menu-icon-formandtable' },
    children: [
      {
        path: '/examples/formandtable',
        name: 'ExamplesFormAndTable',
        component: () => import('@/views/examples/formandtable'),
        meta: { title: '表单表格' }
      },
      {
        path: '/examples/querytable',
        name: 'ExamplesQueryTable',
        component: () => import('@/views/examples/querytable/index.vue'),
        meta: { title: '列表页' }
      }
    ]
  }
]
