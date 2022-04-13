<template>
  <ImWrapper>
    <ImSearchArea>
      <ImForm ref="ImForm" :form="formConfig"></ImForm>
    </ImSearchArea>
    <ImTableArea>
      <div class="mb-4">
        <el-button type="primary">批量删除</el-button>
        <el-button type="primary">批量审核</el-button>
      </div>
      <ImTable :loading="loading" :table="tableConfig"></ImTable>
      <ImPagination ref="ImPagination" :page-size.sync="pageSize" :current-page.sync="currentPage" :total="total" @change="getList"></ImPagination>
    </ImTableArea>
    <AddOrEdit ref="AddOrEdit"></AddOrEdit>
  </ImWrapper>
</template>

<script>
import { getCommentsList, deleteCommentsItem } from '@/api/comments.js'
import { mapGetters } from 'vuex'
import AddOrEdit from './components/AddOrEdit'

export default {
  name: 'CommentsList',
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
          content: undefined,
          courseCode: undefined,
          courseTitle: undefined
        },
        formItems: [
          {
            type: 'ImInput',
            prop: 'content',
            label: '评论内容',
            attrs: {
              clearable: true
            }
          }, {
            type: 'ImInput',
            prop: 'courseCode',
            label: '课程编码',
            attrs: {
              clearable: true
            }
          }, {
            type: 'ImInput',
            prop: 'courseTitle',
            label: '课程标题',
            attrs: {
              clearable: true
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
        listeners: {
          'sort-change'() {
            console.log('sort-change')
          },
          'selection-change'(selection) {
            console.log('selection', selection)
          }
        },
        tableItems: [
          {
            type: 'selection'
          },
          {
            prop: 'courseTitle',
            label: '课程标题',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'content',
            label: '评论内容',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'replyContent',
            label: '管理员回复',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'createBy',
            label: '评论人',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'createTime',
            label: '评论时间',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'status',
            label: '审核状态',
            type: 'val2tag',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: [
              {
                prop: 'status',
                value: ['1'],
                label: '审核通过',
                attrs: {
                  type: 'success'
                }
              },
              {
                prop: 'status',
                value: ['2'],
                label: '审核驳回',
                attrs: {
                  type: 'danger'
                }
              },
              {
                prop: 'status',
                value: ['2'],
                label: '审核中',
                attrs: {
                  type: ''
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
                value: [],
                isNot: true,
                label: '回复',
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
      // this.setFormPropOptions('status', this.enums.columnStatus)
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
    /**
     * 回复
     */

    editItem($index, record) {
      console.log(record)
      this.$refs.AddOrEdit.edit(record)
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
          deleteCommentsItem({ objectCode: record.objectCode }).then((res) => {
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
      getCommentsList(params).then((res) => {
        console.log(res)
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
