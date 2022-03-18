import Blank from '@/components/common/Blank.vue'
import Layout from '@/components/common/index.vue'

export const Production = [
  {
    path: '/production',
    name: 'Production',
    component: Blank,
    meta: { title: '产品模块一', linkPageName: 'ProductionDemoDemo1' },
    children: [
      {
        path: '/production/demo',
        name: 'ProductionDemo',
        component: Layout,
        meta: { title: '产品功能1', icon: 'el-icon-s-marketing' },
        children: [
          {
            path: '/production/demo/demo1',
            name: 'ProductionDemoDemo1',
            component: () => import('@/views/production/demo/demo1'),
            meta: { title: '产品子功能1' }
          },
          {
            path: '/production/demo/demo2',
            name: 'ProductionDemoDemo2',
            component: () => import('@/views/production/demo/demo2'),
            meta: { title: '产品子功能2' }
          }
        ]
      }
    ]
  }
]
