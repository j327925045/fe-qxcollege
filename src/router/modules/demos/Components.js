
import Layout from '@/components/common/index.vue'

export const Components = [
  {
    path: '/components',
    component: Layout,
    name: 'Components',
    meta: { title: '模块五', icon: 'el-icon-s-marketing' },
    children: [
      {
        path: '/detail/drawerDetail',
        name: 'DrawerDetail',
        component: () => import('@/views/demos/drawerDetail/Index.vue'),
        meta: { title: '抽屉-侧边展开详情' }
      },
      {
        path: '/dialog',
        component: () => import('@/views/demos/dialog/Index.vue'),
        name: 'Dialog',
        meta: { title: '弹窗' }
      }
    ]
  }
]
