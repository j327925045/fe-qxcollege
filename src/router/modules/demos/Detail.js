
import Layout from '@/components/common/index.vue'

export const Detail = [
  {
    path: '/detail',
    component: Layout,
    name: 'Detail',
    meta: { title: '模块四', icon: 'el-icon-s-marketing' },
    children: [
      {
        path: '/detail/detail',
        name: 'DetailDetail',
        component: () => import('@/views/demos/detail/Index.vue'),
        meta: { title: '详情页(标准/高级)' }
      },
      {
        path: '/detail/detailMultilevel',
        name: 'DetailDetailMultilevel',
        component: () => import('@/views/demos/detail/DetailMultilevel.vue'),
        meta: { title: '详情页(多级)' }
      }
    ]
  }
]
