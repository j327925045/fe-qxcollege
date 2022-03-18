import Layout from '@/components/common/index.vue'

export const Search = [
  {
    path: '/search',
    component: Layout,
    name: 'Search',
    meta: { title: '模块三', icon: 'el-icon-s-marketing' },
    children: [
      {
        path: '/search/tsForm',
        component: () => import('@/views/tsForm/index.vue'),
        name: 'TsForm',
        meta: { title: '查询列表页(标准)' }
      },
      {
        path: '/search/form',
        component: () => import('@/views/form/Index.vue'),
        name: 'Form',
        meta: { title: '查询列表页(标准)' }
      },
      {
        path: '/search/formAdvanced',
        component: () => import('@/views/form/FormAdvanced.vue'),
        name: 'FormAdvanced',
        meta: { title: '查询列表页(高级)' }
      },
      {
        path: '/search/formCard',
        component: () => import('@/views/form/FormCard.vue'),
        name: 'FormCard',
        meta: { title: '查询列表页(卡片式)' }
      },
      {
        path: '/search/formImg',
        component: () => import('@/views/form/FormImg.vue'),
        name: 'FormImg',
        meta: { title: '查询列表页(带图片)' }
      },
      {
        path: '/search/formDataJump',
        component: () => import('@/views/form/FormDataJump.vue'),
        name: 'FormDataJump',
        meta: { title: '查询列表页(数据跳转)' }
      },
      {
        path: '/search/formDataToggle',
        component: () => import('@/views/form/FormDataToggle.vue'),
        name: 'FormDataToggle',
        meta: { title: '查询列表页(数据切换)' }
      },
      {
        path: '/search/create',
        name: 'Create',
        component: () => import('@/views/create/Index.vue'),
        meta: { title: '新建' }
      },
      {
        path: '/search/notice',
        name: 'Notice',
        component: () => import('@/views/notice/Index.vue'),
        meta: { title: '公告列表' }
      },
      {
        path: '/search/notice/detail',
        name: 'NoticeDetail',
        component: () => import('@/views/notice/Detail.vue'),
        meta: { title: '公告详情' }
      },
      {
        path: '/search/kanban',
        name: 'KanBan',
        component: () => import('@/views/kanban/Index.vue'),
        meta: { title: '数据看板' }
      }
    ]
  }
]
