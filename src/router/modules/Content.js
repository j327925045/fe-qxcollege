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
        path: '/column/detail',
        name: 'ColumnDetail',
        hidden: true,
        component: () => import('@/views/column/detail'),
        meta: { title: '专栏详情', noTab: true, highlightPath: '/column/list' }
      },
      {
        path: '/column/addOrEdit',
        name: 'ColumnAddOrEdit',
        hidden: true,
        component: () => import('@/views/column/addOrEdit'),
        meta: { title: '课程管理', noTab: true, highlightPath: '/column/list' }
      },
      {
        path: '/course/list',
        name: 'CourseList',
        component: () => import('@/views/course/list'),
        meta: { title: '课程列表' }
      },
      {
        path: '/course/detail',
        name: 'CourseDetail',
        hidden: true,
        component: () => import('@/views/course/detail'),
        meta: { title: '课程详情', noTab: true, highlightPath: '/course/list' }
      },
      {
        path: '/course/addOrEdit',
        name: 'CourseAddOrEdit',
        hidden: true,
        component: () => import('@/views/course/addOrEdit'),
        meta: { title: '课程管理', noTab: true, highlightPath: '/course/list' }
      },
      {
        path: '/resources/list',
        name: 'resourcesList',
        component: () => import('@/views/resources/list'),
        meta: { title: '素材列表' }
      },
      {
        path: '/comments/list',
        name: 'CommentsList',
        component: () => import('@/views/comments/list'),
        meta: { title: '评论列表' }
      }
    ]
  }
]
