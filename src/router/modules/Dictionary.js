import Layout from '@/components/common/index.vue'

export const Dictionary = [
  {
    path: '/dictionary',
    name: 'Dictionary',
    component: Layout,
    redirect: '/dictionary/list',
    meta: { title: '字段管理', icon: 'menu-icon-dictionary' },
    children: [
      
    ]
  }
]
