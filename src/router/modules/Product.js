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
        path: '/product/addOrEdit',
        name: 'ProductAddOrEdit',
        hidden: true,
        component: () => import('@/views/product/addOrEdit'),
        meta: { title: '产品操作', noTab: true, highlightPath: '/product/list' }
      },
      {
        path: '/product/detail',
        name: 'ProductDetail',
        hidden: true,
        component: () => import('@/views/product/detail'),
        meta: { title: '产品详情', noTab: true, highlightPath: '/product/list' }
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
