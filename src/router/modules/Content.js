import Layout from '@/components/common/index.vue'

export const Content = [
  {
    path: '/content',
    name: 'Content',
    component: Layout,
    redirect: '/column/list',
    meta: { title: '内容管理', icon: 'menu-icon-content' },
    children: [
      {
        path: '/column/list',
        name: 'ColumnList',
        component: () => import('@/views/column/list'),
        meta: { title: '专栏列表' }
      },
      {
        path: '/course/list',
        name: 'CourseList',
        component: () => import('@/views/course/list'),
        meta: { title: '课程列表' }
      },
      {
        path: '/resources/list',
        name: 'resourcesList',
        component: () => import('@/views/resources/list'),
        meta: { title: '素材列表' }
      }
    ]
  }
]
