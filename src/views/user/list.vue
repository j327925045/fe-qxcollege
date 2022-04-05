<template>
  <div>
    <ImSearchArea>
      <ImForm ref="ImForm" :form="formConfig">
        <HospitalSelect slot="hospitalSelect" v-model="formConfig.props.realHospitalCode" class="w-full" placeholder="请选择医院"></HospitalSelect>
        <RegionCascader slot="RegionCascader" v-model="formConfig.props.regionCode" class="w-full" placeholder="请输入所在区域(省市县)"></RegionCascader>
      </ImForm>
    </ImSearchArea>
    <ImTableArea>
      <div class="mb-4">
        <el-button type="primary" @click="addItem">新建医生</el-button>
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
    <DetailDialog ref="DetailDialog"></DetailDialog>
    <AddOrEdit ref="AddOrEdit" @update="getList" @add="getList"></AddOrEdit>
  </div>
</template>

<script>
import { getUserList, deleteUserItem } from '@/api/user'
import DetailDialog from './components/DetailDialog'
import AddOrEdit from './components/AddOrEdit'
import ImSearchArea from '@/views/components/ImSearchArea'
import ImTableArea from '@/views/components/ImTableArea'
import ImForm from '@/views/components/ImForm/index'
import ImTable from '@/views/components/ImTable/index'
import ImPagination from '@/views/components/ImPagination'
import { mapGetters } from 'vuex'
import moment from 'moment'

import HospitalSelect from '@/views/components/HospitalSelect'
import RegionCascader from '@/views/components/RegionCascader'
export default {
  name: 'UserList',
  components: {
    ImSearchArea,
    ImForm,
    ImTableArea,
    ImTable,
    ImPagination,
    DetailDialog,
    AddOrEdit,
    HospitalSelect,
    RegionCascader
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

          search: '',
          gender: null,
          doctorLevel: null, // 医生等级
          realAuditStatus: null, // 审核状态
          regionCode: null, // 地区
          realHospitalName: '', // 医院
          realDepartment: null, // 科室
          realJobTitle: null, // 职称
          realAccountManager: '', // 客户经理名字
          bindingWechat: null// 是否绑定微信

        },
        formItems: [
          {
            type: 'ImInput',
            prop: 'name',
            label: '搜索',
            attrs: {
              type: 'text',
              placeholder: '请输入医生编号、昵称、姓名、手机号',
              style: 'width: 100%;'
            }
          },
          {
            type: 'ImSelect',
            prop: 'gender',
            label: '性别',

            hidden: false,
            attrs: {
              clearable: true,
              placeholder: '请选择',
              style: 'width: 100%',
              options: []
            }

          },
          {
            type: 'ImSelect',
            prop: 'doctorLevel',
            label: '医生等级',
            attrs: {
              clearable: true,
              placeholder: '请选择',
              style: 'width: 100%',
              options: []
            }

          },
          {
            type: 'ImSelect',
            prop: 'realAuditStatus',
            label: '审核状态',
            attrs: {
              clearable: true,
              placeholder: '请选择',
              style: 'width: 100%',
              options: []
            }

          },
          {
            type: 'ImSlot',
            prop: 'regionCode',
            label: '地区',
            slots: {
              regionSlot: 'RegionCascader'
            }
          },
          // {
          //   type: 'ImGroupSelect',
          //   prop: 'regionCode',
          //   label: '城市',
          //   attrs: {
          //     style: 'width: 100%',
          //     options: cityOptions
          //   }
          // },
          {
            type: 'ImSlot',
            prop: 'realHospitalCode',
            label: '医院',
            // rules: [{ required: true, message: '请选择医院' }],
            slots: {
              hospitalSlot: 'hospitalSelect'
            }
          },
          // {
          //   type: 'ImInput',
          //   prop: 'realHospitalName',
          //   label: '医院',
          //   attrs: {
          //     type: 'text',
          //     placeholder: '请输入医院名称',
          //     style: 'width: 100%;'
          //   }
          // },
          {
            type: 'ImSelect',
            prop: 'realDepartment',
            label: '科室',
            attrs: {
              clearable: true,
              placeholder: '请选择',
              style: 'width: 100%',
              options: []
            }

          },
          {
            type: 'ImSelect',
            prop: 'realJobTitle',
            label: '职称',
            attrs: {
              clearable: true,
              placeholder: '请选择',
              style: 'width: 100%',
              options: []
            }

          },
          {
            type: 'ImInput',
            prop: 'realHospitalName',
            label: '客户经理',
            attrs: {
              type: 'text',
              placeholder: '请输入客户经理姓名',
              style: 'width: 100%;'
            }
          },
          {
            type: 'ImSelect',
            prop: 'bindingWechat',
            label: '是否绑定微信',
            attrs: {
              clearable: true,
              placeholder: '请选择',
              style: 'width: 100%',
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
          // {
          //   prop: '',
          //   label: '序号',
          //   type: 'index',
          //   attrs: {
          //     fixed: 'left',
          //     width: 60
          //   }
          // },
          {
            prop: 'doctorNumber',
            label: '医生编号',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'nickname',
            label: '昵称',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '100'
            }
          },
          // {
          //   prop: 'realJobTitle',
          //   label: '职称',
          //   type: 'mapList',
          //   attrs: {
          //     'show-overflow-tooltip': true,
          //     'min-width': '120'
          //   },
          //   options: this?.enums?.jobTitle ?? []
          // },
          {
            prop: 'realName',
            label: '姓名',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'gender',
            label: '性别',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this?.enums?.gender ?? []
          },
          {
            prop: 'birthday',
            label: '生日',
            type: 'customFilter',
            attrs: {
              width: '110'
            },
            filter(val, row) {
              return moment(val).format('YYYY-MM-DD')
            }
          },
          {
            prop: 'phone',
            label: '手机号',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'doctorLevel',
            label: '医生等级',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this?.enums?.doctorLevel ?? []
          },
          {
            prop: 'realAuditStatus',
            label: '审核状态',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this?.enums?.realAuditStatus ?? []
          },
          {
            prop: 'regionFullName',
            label: '地区',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '180'
            }
          },
          {
            prop: 'realHospitalName',
            label: '医院',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'realDepartment',
            label: '科室',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this?.enums?.realDepartment ?? []
          },
          {
            prop: 'realJobTitle',
            label: '职称',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this?.enums?.jobTitle ?? []
          },
          {
            prop: 'realAccountManager',
            label: '客户经理',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this?.enums?.realAccountManager ?? []
          },
          {
            prop: 'bindingWechat',
            label: '是否绑定微信',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this?.enums?.jobTitle ?? []
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
  created() {
    this.setOptions()
  },
  methods: {
    /**
     * 统一处理options
     */
    setOptions() {
      // doctorLabel expertNeedleHabit

      this.setFormPropOptions('gender', this.enums.gender) // 男女
      this.setFormPropOptions('doctorLevel', this.enums.doctorLevel)// 医生等级

      this.setFormPropOptions('realJobTitle', this.enums.jobTitle) // 职称
      this.setFormPropOptions('bindingWechat', this.enums.bindingWechat) // 是否绑定微信
      this.setFormPropOptions('realAuditStatus', this.enums.realAuditStatus) // 审核状态
      this.setFormPropOptions('realDepartment', this.enums.realDepartment)// 科室
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
    showDetail($index, record) {
      console.log(record)
      this.$router.push(`/user/detail?objectCode=${record.objectCode}`)
      // this.$refs.DetailDialog.show(record)
    },

    addItem() {
      this.$refs.AddOrEdit.add()
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
          deleteUserItem({ objectCode: record.objectCode }).then((res) => {
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
      getUserList(params)
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
