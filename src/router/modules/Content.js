import Layout from '@/components/common/index.vue'

export const Content = [
  {
    path: '/content',
    name: 'Content',
    component: Layout,
    redirect: '/album/list',
    meta: { title: '内容管理', icon: 'menu-icon-content' },
    children: [
      {
        path: '/album/list',
        name: 'AlbumList',
        component: () => import('@/views/album/list'),
        meta: { title: '专栏列表' }
      },
      {
        path: '/course/list',
        name: 'AlbumList',
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
