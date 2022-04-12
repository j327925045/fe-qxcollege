<template>
  <ImWrapper>
    <ImSearchArea>
      <ImForm ref="ImForm" :form="formConfig">
        <HospitalSelect slot="hospitalSelect" v-model="formConfig.props.realHospitalCode" class="w-full" placeholder="请选择"></HospitalSelect>
        <RegionCascader slot="RegionCascader" v-model="formConfig.props.regionCode" class="w-full" placeholder="请选择"></RegionCascader>
        <EmployeeSelect slot="EmployeeSelect" v-model="formConfig.props.realAccountManagerCode" class="w-full" placeholder="请选择"></EmployeeSelect>
      </ImForm>
    </ImSearchArea>
    <ImTableArea>
      <div class="mb-4">
        <el-button type="primary" @click="addItem">新建医生</el-button>
      </div>
      <ImTable :loading="loading" :table="tableConfig">
        <template slot="someSlot" slot-scope="scope">
          <span> {{ scope.row.nickname }}</span>
          <!-- <img v-if="scope.row.nickname" width="24px" height="24px" :src="getIcon(scope.row.doctorLevel)" alt=""> -->
        </template>
        <template slot="realAuditSlot" slot-scope="scope">
          <div style="position:relative">
            <span v-if="scope.row.realAuditStatus==1" style="position: absolute;top:-2px;color:#0093FF;font-size: 50px">·</span>
            <span v-if="scope.row.realAuditStatus==2" style="position: absolute;top:-2px;color:#E1251B;font-size: 50px">·</span>
            <span v-if="scope.row.realAuditStatus==3" style="position: absolute;top:-2px;color:#0093FF;font-size: 50px">·</span>
            <span style="margin-left:13px"> {{ scope.row.realAuditStatus==1?"审核通过":scope.row.realAuditStatus==2?"审核驳回":scope.row.realAuditStatus==3?"审核中":"-" }}</span>
          </div>
        </template>
        <template slot="regionFullNameSlot" slot-scope="scope">
          <div v-if="scope.row.userOrgInfoShowDTOList">
            <div v-for="item,index in scope.row.userOrgInfoShowDTOList" :key="index">
              <span>{{ item.region }}</span>
            </div></div>
        </template>
        <template slot="realHospitalNameSlot" slot-scope="scope">

          <div v-for="item,index in scope.row.userOrgInfoShowDTOList" :key="index">
            <span> {{ item.hospital }}</span>
          </div>
        </template>
        <template slot="realDepartmentSlot" slot-scope="scope">
          <div v-for="item,index in scope.row.userOrgInfoShowDTOList" :key="index">
            <span> {{ getLabelByValue('realDepartment', item.orgDepartment) }}</span>
          </div>
        </template>
        <template slot="realJobTitleSlot" slot-scope="scope">
          <div v-for="item,index in scope.row.userOrgInfoShowDTOList" :key="index">
            <span> {{ getLabelByValue('jobTitle',item.post) }}</span>
          </div>
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
import { getUserList, deleteUserItem } from '@/api/user'
import { mapGetters } from 'vuex'
import moment from 'moment'
import utils from '@/utils/utils'

import HospitalSelect from '@/views/components/HospitalSelect'
import RegionCascader from '@/views/components/RegionCascader'
import EmployeeSelect from '@/views/components/EmployeeSelect'
export default {
  name: 'UserList',
  components: {
    HospitalSelect,
    RegionCascader,
    EmployeeSelect
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
          doctorNumber: undefined, // 医生编号
          phone: undefined, // 手机号
          realName: undefined, // 姓名
          nickname: undefined, // 昵称
          gender: undefined,
          doctorLevel: undefined, // 医生等级
          realAuditStatus: undefined, // 审核状态
          regionCode: undefined, // 地区
          realHospitalName: undefined, // 机构
          realDepartment: undefined, // 科室
          realJobTitle: undefined, // 职称
          realAccountManagerCode: undefined, // 客户经理名字
          bindingWechat: undefined// 是否绑定微信
        },
        formItems: [
          {
            type: 'ImInput',
            prop: 'doctorNumber',
            label: '医生编号',
            attrs: {
              clearable: true,
              placeholder: '请输入',
              style: 'width: 100%;'
            }
          },
          {
            type: 'ImInput',
            prop: 'realName',
            label: '姓名',
            attrs: {
              clearable: true,
              placeholder: '请输入',
              style: 'width: 100%;'
            }
          },
          {
            type: 'ImInput',
            prop: 'nickname',
            label: '昵称',
            attrs: {
              clearable: true,
              placeholder: '请输入',
              style: 'width: 100%;'
            }
          },
          {
            type: 'ImInput',
            prop: 'phone',
            label: '手机号',
            attrs: {
              clearable: true,
              placeholder: '请输入',
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
          {
            type: 'ImSlot',
            prop: 'realHospitalCode',
            label: '机构',
            slots: {
              hospitalSlot: 'hospitalSelect'
            }
          },
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
            prop: 'realAccountManager',
            label: '客户经理',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            type: 'ImSelect',
            prop: 'bindingWechat',
            label: '绑定微信',
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
          {
            prop: 'doctorNumber',
            label: '医生编号',
            attrs: {
              fixed: 'left',
              'show-overflow-tooltip': true,
              'min-width': '180'
            }
          },
          {
            type: 'slot',
            label: '昵称',
            attrs: {
              width: '100'
            },
            slot: 'someSlot'
          },
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
              if (val) {
                return moment(val).format('YYYY-MM-DD')
              } else {
                return '_'
              }
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
            type: 'customFilter',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120',
              'text-align': 'center'
            },
            filter(val, row) {
              return `<h3 style="text-align: center;">V${val}</h3>`
            }
          },
          // {
          //   prop: 'realAuditStatus',
          //   label: '审核状态',
          //   type: 'mapList',
          //   attrs: {
          //     'show-overflow-tooltip': true,
          //     'min-width': '120'
          //   },
          //   options: this?.enums?.realAuditStatus ?? []
          // },

          {
            type: 'slot',
            label: '审核状态',
            attrs: {
              width: '160'
            },
            slot: 'realAuditSlot'
          },

          {
            type: 'slot',
            label: '地区',
            attrs: {
              width: '260'
            },
            slot: 'regionFullNameSlot'
          },

          {
            type: 'slot',
            label: '机构',
            attrs: {
              width: '230'
            },
            slot: 'realHospitalNameSlot'
          },

          {
            type: 'slot',
            label: '科室',
            attrs: {
              width: '160'
            },
            slot: 'realDepartmentSlot'
          },
          {
            type: 'slot',
            label: '职称',
            attrs: {
              width: '160'
            },
            slot: 'realJobTitleSlot'
          },
          {
            type: 'slot',
            label: '客户经理',
            attrs: {
              width: '160'
            },
            slot: 'realAccountManagerSlot'
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
              width: '150'
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
    this.setOptions()
  },
  methods: {
    getLabelByValue(key, value) {
      const item = utils.getOptionsItemByValue(key, value)
      return item.label || ''
    },
    // level动态展示
    getIcon(code) {
      if (code) {
        const iconList = require(`../../assets/img/level/v${code}.png`)
        return iconList
      }
    },
    /**
     * 统一处理options
     */
    setOptions() {
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
      this.$router.push({ name: 'UserDetail', query: { objectCode: record.objectCode } })
    },

    addItem() {
      this.$router.push({ name: 'UserAddOrEdit' })
    },

    editItem($index, record) {
      this.$router.push({ name: 'UserAddOrEdit', query: { objectCode: record.objectCode } })
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
