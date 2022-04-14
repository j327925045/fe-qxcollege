<template>
  <ImWrapper>
    <ImSearchArea>
      <ImForm ref="ImForm" :form="formConfig"></ImForm>
    </ImSearchArea>

    <ImTableArea>
      <div class="mb-4">
        <el-button type="primary" @click="addItem">新建标签</el-button>
      </div>
      <ImTable :loading="loading" :table="tableConfig"></ImTable>
      <ImPagination
        ref="ImPagination"
        :page-size.sync="pageSize"
        :current-page.sync="currentPage"
        :total="total"
        @change="getList"
      ></ImPagination>
    </ImTableArea>
    <AddOrEdit ref="AddOrEdit" @update="getList" @add="getList"></AddOrEdit>
  </ImWrapper>
</template>

<script>
import { getTagList, deleteTagItem } from '@/api/tag.js'
import AddOrEdit from './components/AddOrEdit'
import { mapGetters } from 'vuex'

export default {
  name: 'TagList',
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
          name: ''
        },
        formItems: [
          {
            type: 'ImInput',
            prop: 'name',
            label: '标签名称',
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
            prop: '',
            label: '序号',
            type: 'index',
            attrs: {
              fixed: 'left',
              width: 60
            }
          },
          {
            prop: 'name',
            label: '标签名称',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'type',
            label: '标签类别',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this?.enums?.tagType ?? []
          },
          {
            prop: '',
            label: '操作',
            type: 'buttons',
            attrs: {
              fixed: 'right',
              width: '100'
            },
            options: [
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
     * 编辑
     */
    editItem($index, record) {
      this.$refs.AddOrEdit.edit(record.objectCode)
    },

    /**
     * 添加
     */
    addItem() {
      this.$refs.AddOrEdit.add()
    },

    /**
     * 删除
     */
    deleteItem($index, record) {
      this.$confirm('确定要删除该项吗？', '提示', {
        type: 'warning',
        customClass: 'deleteConfirm',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          deleteTagItem({ objectCode: record.objectCode }).then((res) => {
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
      getTagList(params).then((res) => {
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
