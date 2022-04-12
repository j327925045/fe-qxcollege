<template>
  <ImWrapper>
    <ImSearchArea>
      <ImForm ref="ImForm" :form="formConfig"></ImForm>
    </ImSearchArea>

    <ImTableArea>
      <div class="mb-4">
        <el-button type="primary" @click="addItem">新建员工</el-button>
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
    <DetailDialog ref="DetailDialog"></DetailDialog>
    <AddOrEdit ref="AddOrEdit" @update="getList" @add="getList"></AddOrEdit>
    <SetRoleDrower ref="SetRoleDrower" @update="getList"></SetRoleDrower>
  </ImWrapper>
</template>

<script>
import { getEmployeesList, deleteEmployeesItem } from '@/api/employees.js'
import DetailDialog from './components/DetailDialog'
import AddOrEdit from './components/AddOrEdit'
import SetRoleDrower from './components/SetRoleDrower'
import { mapGetters } from 'vuex'

export default {
  name: 'EmployeesList',
  components: {
    DetailDialog,
    AddOrEdit,
    SetRoleDrower
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
            label: '员工名称',
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
            label: '员工姓名',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'gender',
            label: '员工性别',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this?.enums?.gender ?? []
          },
          {
            prop: 'nature',
            label: '员工性质',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this?.enums?.employeeNature ?? []
          },
          {
            prop: 'status',
            label: '员工状态',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this?.enums?.employeeStatus ?? []
          },
          {
            prop: 'account',
            label: '账号（手机号）',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          // {
          //   prop: 'createTime',
          //   label: '创建时间',
          //   type: 'datetime',
          //   attrs: {
          //     'show-overflow-tooltip': true,
          //     'min-width': '120'
          //   }
          // },
          {
            prop: '',
            label: '操作',
            type: 'buttons',
            attrs: {
              fixed: 'right',
              width: '200'
            },
            options: [
              {
                title: '查看',
                type: 'text',
                onClick: this.showDetail
              },
              {
                title: '设置角色',
                type: 'text',
                onClick: this.setRole
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
    showDetail($index, record) {
      this.$refs.DetailDialog.show(record)
    },

    setRole($index, record) {
      this.$refs.SetRoleDrower.edit(record.objectCode)
    },

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
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          deleteEmployeesItem({ objectCode: record.objectCode }).then((res) => {
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
      getEmployeesList(params).then((res) => {
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
