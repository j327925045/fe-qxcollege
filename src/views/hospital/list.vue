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
              placeholder: '请输入',
              style: 'width: 100%;'
            }
          },
          {
            type: 'ImInput',
            prop: 'mechanismCode',
            label: '机构编号',
            attrs: {
              type: 'text',
              placeholder: '请输入',
              style: 'width: 100%;'
            }
          },
          {
            type: 'ImSelect',
            prop: 'nature',
            label: '机构性质',
            attrs: {
              clearable: true,
              placeholder: '请选择',
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
              placeholder: '请选择',
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
            attrs: {
              fixed: 'left',
              'show-overflow-tooltip': true,
              'min-width': '120'
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
              const date = new Date(val)
              return moment(date.getTime()).format('YYYY-MM-DD')
            }
          },
          {
            prop: 'regionFullName',
            label: '所在城市',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'location',
            label: '机构地址',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '180'
            }
          },
          {
            prop: 'organizationName',
            label: '所属集团',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
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
            prop: 'doctorCount',
            label: '医生数量',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
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
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          deleteHospitalItem({ objectCode: record.objectCode }).then(res => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.getList()
            } else {
              this.$message.error(res.message)
            }
          })
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
