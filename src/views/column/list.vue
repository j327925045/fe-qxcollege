<template>
  <ImWrapper>
    <ImSearchArea>
      <ImForm ref="ImForm" :form="formConfig"></ImForm>
    </ImSearchArea>

    <ImTableArea>
      <div class="mb-4">
        <el-button type="primary" @click="addItem">新建专栏</el-button>
      </div>
      <ImTable :loading="loading" :table="tableConfig"></ImTable>
      <div class="mt-4 text-right">
        <ImPagination ref="ImPagination" :page-size.sync="pageSize" :current-page.sync="currentPage" :total="total" @change="getList"></ImPagination>
      </div>
    </ImTableArea>
    <AddOrEdit ref="AddOrEdit" @update="getList" @add="getList"></AddOrEdit>
  </ImWrapper>
</template>

<script>
import { getColumnList, deleteColumnItem } from '@/api/column.js'
import AddOrEdit from './components/AddOrEdit'
import { mapGetters } from 'vuex'

export default {
  name: 'ColumnList',
  components: {
    AddOrEdit
  },
  data() {
    return {
      formConfig: {
        column: 3,
        attrs: {
          labelWidth: '100px'
        },
        props: {
          columnNumber: undefined,
          title: undefined,
          status: undefined
        },
        formItems: [
          {
            type: 'ImInput',
            prop: 'columnNumber',
            label: '专栏编号',
            attrs: {
            }
          },
          {
            type: 'ImInput',
            prop: 'title',
            label: '专栏标题',
            attrs: {
            }
          },
          {
            type: 'ImSelect',
            prop: 'status',
            label: '专栏状态',
            attrs: {
              class: 'w-full'
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
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  computed: {
    ...mapGetters(['enums']),
    tableConfig() {
      return {
        data: [],
        tableItems: [
          {
            prop: 'columnNumber',
            label: '专栏编号',
            attrs: {
              fixed: 'left',
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'title',
            label: '专栏标题',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '180'
            }
          },
          {
            prop: 'courseCount',
            label: '课程数量',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'productName',
            label: '产品认证',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'status',
            label: '上架状态',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: [] // 1上架 2下架
          },
          {
            prop: '',
            label: '操作',
            type: 'buttons',
            attrs: {
              fixed: 'right',
              width: '150'
            },
            options: [
              {
                title: '查看',
                type: 'text',
                onClick: this.viewItem
              },
              {
                title: '编辑',
                type: 'text',
                onClick: this.editItem
              },
              {
                title: '删除',
                type: 'text',
                onClick: this.deleteItem
              }
            ]
          }
        ]
      }
    }
  },
  activated() {
    this.getList()
  },
  methods: {
    /**
     * 展示详情
     */
    viewItem($index, record) {
      this.$router.push({ name: 'ColumnDetail', query: { objectCode: record.objectCode } })
    },

    /**
     * 编辑
     */
    editItem($index, record) {
      this.$router.push({ name: 'ColumnAddOrEdit', query: { objectCode: record.objectCode } })
    },

    /**
     * 添加
     */
    addItem() {
      this.$router.push({ name: 'ColumnAddOrEdit' })
    },

    /**
     * 删除
     */
    deleteItem($index, record) {
      this.$confirm('确定要删除该项吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          deleteColumnItem({ objectCode: record.objectCode }).then((res) => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.getList()
            } else {
              this.$message.error(res.message)
            }
          })
        })
        .catch(() => {})
    },

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
      getColumnList(params).then((res) => {
        this.loading = false
        if (res.code === 200) {
          this.total = res.data.totalCount
          this.tableConfig.data = res.data.list || []
        } else {
          this.$message.error(res.message)
        }
      })
        .catch((_) => {
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
