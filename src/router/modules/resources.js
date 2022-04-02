import Layout from '@/components/common/index.vue'

export const resources = [{
  path: '/resources',
  name: 'Resources',
  component: Layout,
  redirect: '/resources/list',
  meta: {
    title: '素材管理',
    icon: 'menu-icon-resources'
  },
  children: [{
    path: '/resources/list',
    name: 'resourcesList',
    component: () => import('@/views/resources/list'),
    meta: {
      title: '素材列表'
    }
  }]
}]
