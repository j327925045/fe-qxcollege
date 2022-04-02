import Layout from '@/components/common/index.vue'

export const audit = [{
  path: '/audit',
  name: 'Audit',
  component: Layout,
  redirect: '/audit/list',
  meta: {
    title: '审批管理',
    icon: 'menu-icon-audit'
  },
  children: [{
    path: '/audit/list',
    name: 'AuditList',
    component: () => import('@/views/audit/list'),
    meta: {
      title: '审批列表'
    }
  }]
}]
