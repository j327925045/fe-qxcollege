<template>
  <div>
    <ImSearchArea>
      <ImForm ref="ImForm" :form="formConfig"></ImForm>
    </ImSearchArea>

    <ImTableArea>
      <ImTable :loading="loading" :table="tableConfig"></ImTable>
      <div class="mt-4 text-right">
        <ImPagination
          ref="ImPagination"
          :page-size.sync="pageSize"
          :current-page.sync="currentPage"
          :total="total"
          @change="getList"
        ></ImPagination>
      </div>
    </ImTableArea>
  </div>
</template>

<script>
import { getLogList } from '@/api/log'
import ImSearchArea from '@/views/components/ImSearchArea'
import ImForm from '@/views/components/ImForm'
import ImTableArea from '@/views/components/ImTableArea'
import ImTable from '@/views/components/ImTable'
import ImPagination from '@/views/components/ImPagination'
export default {
  name: 'LogList',
  components: {
    ImTableArea,
    ImTable,
    ImPagination,
    ImSearchArea,
    ImForm
  },
  data() {
    return {
      formConfig: {
        column: 3,
        attrs: {
          labelWidth: '100px'
        },
        props: {
          name: ''
        },
        formItems: [
          {
            type: 'ImInput',
            prop: 'name',
            label: '医院名称',
            attrs: {
              type: 'text',
              placeholder: '请输入',
              style: 'width: 100%;'
            }
          },
          {
            type: 'ImButton',
            attrs: {
              style: 'flex: 1; text-align: right;',
              options: [
                {
                  label: '重 置',
                  attrs: {
                    type: 'default'
                  },
                  listeners: {
                    click: this.resetForm
                  }
                },
                {
                  label: '查 询',
                  attrs: {
                    type: 'primary'
                  },
                  listeners: {
                    click: this.search
                  }
                }
              ]
            }
          }
        ]
      },
      tableConfig: {
        data: [],
        tableItems: [
          {
            prop: '',
            label: '序号',
            type: 'index',
            attrs: {
              fixed: 'left',
              width: 60
            }
          },
          {
            prop: 'operation',
            label: '用户操作',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '180'
            }
          },
          {
            prop: 'method',
            label: '请求方法',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '180'
            }
          },
          {
            prop: 'params',
            label: '请求参数',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '150'
            }
          },
          {
            prop: 'time',
            label: '执行时长',
            type: 'customFilter',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            filter(val, row) {
              return `${row.time}ms`
            }
          }
        ]
      },
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  activated() {
    this.getList()
  },
  methods: {
    /**
     * 搜索按钮点击事件，回到第一页
     */
    search() {
      this.$refs.ImPagination.reset()
      this.getList()
    },

    /**
     * 获取列表
     */
    getList() {
      const params = {
        page: this.currentPage,
        limit: this.pageSize,
        ...this.formConfig.props
      }
      this.loading = true
      getLogList(params).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.total = res.data.totalCount || 0
          this.tableConfig.data = res.data.list || []
        }
      }).catch(_ => {
        this.loading = false
      })
    },

    /**
     * 重置表单
     */
    resetForm() {
      this.$refs.ImForm.reset()
      this.$refs.ImPagination.reset()
      this.getList()
    }
  }
}
</script>
