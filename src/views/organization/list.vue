<template>
  <ImWrapper>
    <ImSearchArea>
      <ImForm ref="ImForm" :form="formConfig"></ImForm>
    </ImSearchArea>
    <ImTableArea>
      <div class="mb-4">
        <el-button type="primary" @click="addItem">新建集团</el-button>
      </div>
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
  </ImWrapper>
</template>

<script>
import { getOrganizationList, deleteOrganizationItem } from '@/api/organization'
import { mapGetters } from 'vuex'
export default {
  name: 'OrganizationList',
  data() {
    return {
      formConfig: {
        column: 3,
        attrs: {
          labelWidth: '100px'
        },
        props: {
          cooperationMode: undefined,
          groupCode: undefined,
          groupSize: undefined,
          groupName: undefined,
          salesName: undefined,
          whetherAccounts: undefined
        },
        formItems: [
          {
            type: 'ImInput',
            prop: 'groupName',
            label: '集团名称',
            attrs: {
              clearable: true,
              placeholder: '请输入集团名称',
              style: 'width: 100%;'
            }
          },
          {
            type: 'ImSelect',
            prop: 'groupSize',
            label: '集团规模',
            attrs: {
              clearable: true,
              placeholder: '请选择集团规模',
              style: 'width: 100%;',
              options: []
            }
          },
          {
            type: 'ImInput',
            prop: 'groupCode',
            label: '集团编号',
            attrs: {
              clearable: true,
              placeholder: '请输入集团编号',
              style: 'width: 100%;'
            }
          },
          {
            type: 'ImSelect',
            prop: 'cooperationMode',
            label: '合作方式',
            attrs: {
              clearable: true,
              placeholder: '请选择合作方式',
              style: 'width: 100%;',
              options: []
            }
          },
          {
            type: 'ImInput',
            prop: 'salesName',
            label: '销售对接人',
            attrs: {
              clearable: true,
              placeholder: '请输入销售对接人',
              style: 'width: 100%;'
            }
          },
          {
            type: 'ImSelect',
            prop: 'whetherAccounts',
            label: '是否建账',
            attrs: {
              clearable: true,
              placeholder: '请输入是否建账',
              style: 'width: 100%;',
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
      tableData: [],
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      isShow: true
    }
  },
  computed: {
    ...mapGetters(['enums']),
    tableConfig() {
      return {
        data: [],
        tableItems: [
          {
            prop: 'groupCode',
            label: '集团编号',
            attrs: {
              fixed: 'left',
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'name',
            label: '集团名称',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'groupSize',
            label: '集团规模',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this.enums.organizationScale
          },
          {
            prop: 'cooperationMode',
            label: '合作方式',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this.enums.organizationCooperatType
          },
          {
            prop: 'whetherAccounts',
            label: '是否建账',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this.enums.organizationIsPrepareAccount
          },
          {
            prop: 'contactName',
            label: '联系人姓名',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'contactPhone',
            label: '联系人电话',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'salesCounterpartName',
            label: '销售对接人',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'mechanismCount',
            label: '机构数量',
            type: 'customFilter',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            filter(val, row) {
              return val || 0
            }
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
                onClick: this.showItemDetail
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
    this.setOptions()
  },
  methods: {
    setOptions() {
      this.setFormPropOptions('cooperationMode', this.enums.organizationCooperatType)
      this.setFormPropOptions('whetherAccounts', this.enums.organizationIsPrepareAccount)
      this.setFormPropOptions('groupSize', this.enums.organizationScale)
    },

    showItemDetail($index, record) {
      this.$router.push({ name: 'OrganizationDetail', query: { objectCode: record.objectCode } })
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

    addItem() {
      // this.$refs.AddOrEdit.add()
      this.$router.push({ name: 'OrganizationAddOrEdit' })
    },

    editItem($index, record) {
      this.$router.push({ name: 'OrganizationAddOrEdit', query: { objectCode: record.objectCode } })
      // this.$refs.AddOrEdit.edit(record.objectCode)
    },

    deleteItem($index, record) {
      this.$confirm('确定要删除该项吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          if (record.mechanismCount > 0) {
            this.$message.error('删除失败，该集团下存在机构')
          } else {
            (
              deleteOrganizationItem({ objectCode: record.objectCode }).then(res => {
                if (res.code === 200) {
                  this.$message.success('操作成功！')
                  this.getList()
                } else {
                  this.$message.error(res.message)
                }
              }))
          }
        })
        .catch(() => {
        })
    },

    /**
     * 重置表单
     */
    resetForm() {
      this.$refs.ImForm.reset()
      this.$refs.ImPagination.reset()
      this.getList()
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
      getOrganizationList(params).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.total = res.data.totalCount
          this.tableConfig.data = res.data.list || []
        }
      }).catch(_ => {
        this.loading = false
      })
    }
  }
}
</script>
