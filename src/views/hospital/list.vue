<template>
  <ImWrapper>
    <ImSearchArea>
      <ImForm ref="ImForm" :form="formConfig">
        <RegionCascader slot="RegionCascader" v-model="formConfig.props.regionCode" class="w-full" placeholder="请选择所在城市"></RegionCascader>
      </ImForm>
    </ImSearchArea>

    <ImTableArea>
      <div class="mb-4">
        <el-button type="primary" @click="addItem">新建机构</el-button>
      </div>
      <ImTable :loading="loading" :table="tableConfig">
        <template slot="location" slot-scope="scope">
          {{ scope.row.location||'-' }}
        </template>
        <template slot="organizationName" slot-scope="scope">
          {{ scope.row.organizationName||'-' }}
        </template>
        <template slot="contactName" slot-scope="scope">
          {{ scope.row.contactName||'-' }}
        </template>
        <template slot="contactPhone" slot-scope="scope">
          {{ scope.row.contactPhone||'-' }}
        </template>
        <template slot="salesCounterpartName" slot-scope="scope">
          {{ scope.row.salesCounterpartName||'-' }}
        </template>
      </ImTable>
      <ImPagination
        ref="ImPagination"
        :page-size.sync="pageSize"
        :current-page.sync="currentPage"
        :total="total"
        @change="getList"
      ></ImPagination>
    </ImTableArea>
  </ImWrapper>
</template>

<script>
import { getHospitalList, deleteHospitalItem } from '@/api/hospital'
import { mapGetters } from 'vuex'
import RegionCascader from '@/views/components/RegionCascader'
import moment from 'moment'

export default {
  name: 'HospitalList',
  components: {
    RegionCascader
  },
  data() {
    return {
      formConfig: {
        column: 3,
        attrs: {
          labelWidth: '100px'
        },
        props: {
          name: undefined,
          mechanismCode: undefined,
          nature: undefined,
          regionCode: undefined,
          salesName: undefined
        },
        formItems: [
          {
            type: 'ImInput',
            prop: 'name',
            label: '机构名称',
            attrs: {
              type: 'text',
              placeholder: '请输入机构名称',
              style: 'width: 100%;'
            }
          },
          {
            type: 'ImInput',
            prop: 'mechanismCode',
            label: '机构编号',
            attrs: {
              type: 'text',
              placeholder: '请输入机构编号',
              style: 'width: 100%;'
            }
          },
          {
            type: 'ImSelect',
            prop: 'nature',
            label: '机构性质',
            attrs: {
              clearable: true,
              placeholder: '请选择机构性质',
              style: 'width: 100%;',
              options: []
            }
          },
          {
            type: 'ImSlot',
            prop: 'regionCode',
            label: '所在城市',
            attrs: {
              clearable: true,
              placeholder: '请选择所在城市',
              style: 'width: 100%;',
              options: []
            },
            slots: {
              regionCode: 'RegionCascader'
            }
          },
          {
            type: 'ImInput',
            prop: 'salesName',
            label: '销售对接人',
            attrs: {
              type: 'text',
              placeholder: '请输入销售对接人',
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
            prop: 'orgCode',
            label: '机构编号',
            type: 'customFilter',
            attrs: {
              fixed: 'left',
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            filter(val) {
              return val || '-'
            }
          },
          {
            prop: 'name',
            label: '机构名称',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'nature',
            label: '机构性质',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this.enums.hospitalNature
          },
          {
            prop: 'establishedTime',
            label: '成立时间',
            type: 'customFilter',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            filter(val) {
              // const date = new Date(val)
              return val ? moment(val).format('YYYY-MM-DD') : '-'
            }
          },
          {
            prop: 'regionFullName',
            label: '所在城市',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '180'
            }
          },
          {
            prop: 'location',
            label: '机构地址',
            type: 'slot',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '180'
            },
            slot: 'location'
          },
          {
            prop: 'organizationName',
            label: '所属集团',
            type: 'slot',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            slot: 'organizationName'
          },
          {
            prop: 'contactName',
            label: '联系人姓名',
            type: 'slot',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            slot: 'contactName'
          },
          {
            prop: 'contactPhone',
            label: '联系人电话',
            type: 'slot',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            slot: 'contactPhone'
          },
          {
            prop: 'salesCounterpartName',
            label: '销售对接人',
            type: 'slot',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '100'
            },
            slot: 'salesCounterpartName'
          },
          {
            prop: 'doctorCount',
            label: '医生数量',
            type: 'customFilter',
            attrs: {
              'show-overflow-tooltip': true,
              width: '80'
            },
            filter(val) {
              return `<div style="text-align: right;">${val}</div>`
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
                onClick: this.detailItem
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
  created() {
    this.getList()
    this.setOptions()
  },
  activated() {
    this.getList()
    this.setOptions()
  },
  methods: {
    setOptions() {
      this.setFormPropOptions('nature', this.enums.hospitalNature)
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
      this.$router.push({ name: 'HospitalAddOrEdit' })
    },

    editItem($index, record) {
      this.$router.push({ name: 'HospitalAddOrEdit', query: { objectCode: record.objectCode } })
      // this.$refs.AddOrEdit.edit(record.objectCode)
    },

    detailItem($index, record) {
      this.$router.push({ name: 'HospitalDetail', query: { objectCode: record.objectCode } })
    },

    deleteItem($index, record) {
      this.$confirm('确定要删除该项吗？', '提示', {
        type: 'warning',
        customClass: 'deleteConfirm',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          if (record.doctorCount !== '0') {
            this.$message.error('该机构下有医生 ，不允许删除。')
          } else {
            deleteHospitalItem({ objectCode: record.objectCode }).then(res => {
              if (res.code === 200) {
                this.$message.success('操作成功！')
                this.getList()
              } else {
                this.$message.error(res.message)
              }
            })
          }
        })
        .catch(() => {
        })
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
      getHospitalList(params).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.total = res.data.totalCount
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
