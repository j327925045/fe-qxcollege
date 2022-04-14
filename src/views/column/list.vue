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
      <ImPagination ref="ImPagination" :page-size.sync="pageSize" :current-page.sync="currentPage" :total="total" @change="getList"></ImPagination>
    </ImTableArea>
  </ImWrapper>
</template>

<script>
import { getColumnList, deleteColumnItem, operateColumnItem } from '@/api/column.js'
import { mapGetters } from 'vuex'

export default {
  name: 'ColumnList',
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
              clearable: true
            }
          },
          {
            type: 'ImInput',
            prop: 'title',
            label: '专栏标题',
            attrs: {
              clearable: true
            }
          },
          {
            type: 'ImSelect',
            prop: 'status',
            label: '专栏状态',
            attrs: {
              class: 'w-full',
              clearable: true,
              options: []
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
            type: 'customFilter',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            filter(value, row) {
              return value || 0
            }
          },
          {
            prop: 'productName',
            label: '产品认证',
            type: 'customFilter',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            filter(value, row) {
              return value || '-'
            }
          },
          {
            prop: 'status',
            label: '上架状态',
            type: 'val2tag',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: [
              {
                prop: 'status',
                value: ['1'],
                label: '上架',
                attrs: {
                  type: 'success'
                }
              },
              {
                prop: 'status',
                value: ['2'],
                label: '下架',
                attrs: {
                  type: 'danger'
                }
              }
            ] // 1上架 2下架
          },
          {
            prop: '',
            label: '操作',
            type: 'val2btn',
            attrs: {
              fixed: 'right',
              width: '200'
            },
            options: [
              {
                prop: 'status',
                value: ['1'],
                label: '下架',
                attrs: {
                  type: 'text'
                },
                onClick: this.stopItem
              },
              {
                prop: 'status',
                value: ['2'],
                label: '上架',
                attrs: {
                  type: 'text'
                },
                onClick: this.startItem
              },
              {
                prop: 'status',
                value: [],
                isNot: true,
                label: '查看',
                attrs: {
                  type: 'text'
                },
                onClick: this.viewItem
              },
              {
                prop: 'status',
                value: [],
                isNot: true,
                label: '编辑',
                attrs: {
                  type: 'text'
                },
                onClick: this.editItem
              },
              {
                prop: 'status',
                value: [],
                isNot: true,
                label: '删除',
                attrs: {
                  type: 'text'
                },
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
    this.setOptions()
  },
  methods: {
    setOptions() {
      this.setFormPropOptions('status', this.enums.columnStatus)
    },
    /**
     * 设置form标单项的options，因为enums异步获取，因此这里需要手动指定一下
     * 放到计算属性会有prop绑定失效的问题
     */
    setFormPropOptions(prop, options) {
      const formItems = this.formConfig.formItems
      const item = formItems.find(item => item.prop === prop)
      item.attrs.options = options
    },

    stopItem($index, record) {
      this.$confirm('确定要下架该专栏吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.operateItem(record.objectCode, 2)
        })
        .catch(() => {})
    },

    startItem($index, record) {
      this.$confirm('确定要上架该专栏吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.operateItem(record.objectCode, 1)
        })
        .catch(() => {})
    },

    /**
     * 操作上下架
     */
    operateItem(objectCode, status) {
      const data = {
        objectCode,
        status
      }
      operateColumnItem(data).then(res => {
        if (res.code === 200) {
          this.$message.success('操作成功！')
          this.getList()
        }
      })
    },

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
        type: 'warning',
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
