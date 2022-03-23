
import Layout from '@/components/common/index.vue'
export const HtmlStyle = [
  {
    path: '/htmlStyle',
    component: Layout,
    name: 'HtmlStyle',
    meta: { title: '模块一', icon: 'el-icon-s-marketing' },
    children: [
      {
        path: '/htmlStyle/index',
        name: 'HtmlStyleHome',
        component: () => import('@/views/demos/htmlStyle/index.vue'),
        meta: { title: '常用样式', icon: 'el-icon-s-marketing' }
      },
      {
        path: '/htmlStyle/flex',
        name: 'HtmlStyleFlex',
        component: () => import('@/views/demos/htmlStyle/Flex.vue'),
        meta: { title: 'Flex布局' }
      }
    ]
  }
]
