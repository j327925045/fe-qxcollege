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
    <DetailDialog ref="DetailDialog" @update="getList"></DetailDialog>
    <AddOrEdit ref="AddOrEdit" @update="getList" @add="getList"></AddOrEdit>
  </div>
</template>

<script>
import { getDataList, deleteAudit } from '@/api/audit'
import DetailDialog from './components/DetailDialog'
import AddOrEdit from './components/AddOrEdit'
import ImSearchArea from '@/views/components/ImSearchArea'
import ImTableArea from '@/views/components/ImTableArea'
import ImForm from '@/views/components/ImForm/index'
import ImTable from '@/views/components/ImTable/index'
import ImPagination from '@/views/components/ImPagination'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'AuditList',
  components: {
    ImSearchArea,
    ImForm,
    ImTableArea,
    ImTable,
    ImPagination,
    DetailDialog,
    AddOrEdit
  },
  data() {
    return {
      moment,
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
            label: '审核编号',
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
      pageSize: 10,
      currentPage: 1,
      total: 0
    }
  },
  computed: {
    ...mapGetters(['enums']),
    // 之所以把tableConfig放在计算属性里边，是因为里边用到了enums计算属性，enums是异步获取
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
            prop: 'createBy',
            label: '创建人',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'createTime',
            label: '创建时间',
            type: 'customFilter',
            attrs: {
              width: '110'
            },
            filter(val, row) {
              return moment(val).format('YYYY-MM-DD')
            }
          },
          {
            prop: 'objectCode',
            label: '审核编号',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '100'
            }
          },
          {
            prop: 'realAuditStatus',
            label: '审核状态',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: [
              {
                value: '1',
                label: '通过'
                // style: 'color:red;'
              },
              {
                value: '2',
                label: '拒绝'
                // style: 'color:brown;'
              }
            ]
          },

          {
            prop: '',
            label: '操作',
            type: 'buttons',
            attrs: {
              fixed: 'right',
              width: '160'
            },
            options: [
              {
                title: '查看',
                type: 'text',
                onClick: this.showDetail
              },
              // {
              //   title: '编辑',
              //   type: 'text',
              //   onClick: this.editItem
              // },
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
    showDetail($index, record) {
      console.log(record)
      // this.$router.push(`/user/detail?objectCode=${record.objectCode}`)
      this.$refs.DetailDialog.show(record)
    },

    editItem($index, record) {
      this.$refs.AddOrEdit.edit(record.objectCode)
    },

    deleteItem($index, record) {
      this.$confirm('确定要删除该项吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          deleteAudit({ objectCode: record.objectCode }).then((res) => {
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
      getDataList(params)
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.total = res.data.totalCount
            this.tableConfig.data = res.data.list || []
          }
        })
        .catch((_) => {
          this.loading = false
        })
    }
  }
}
</script>
