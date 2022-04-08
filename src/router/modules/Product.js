import Layout from '@/components/common/index.vue'

export const Product = [
  {
    path: '/product',
    name: 'Product',
    component: Layout,
    redirect: '/product/list',
    meta: { title: '商品管理', icon: 'menu-icon-product' },
    children: [
      {
        path: '/product/list',
        name: 'ProductList',
        component: () => import('@/views/product/list'),
        meta: { title: '产品列表' }
      },
      {
        path: '/project/list',
        name: 'ProjectList',
        component: () => import('@/views/project/list'),
        meta: { title: '项目列表' }
      }
    ]
  }
]
