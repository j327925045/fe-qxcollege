<template>
  <ImDrawer
    :visible.sync="drawerVisible"
    :title="editId ? '编辑集团' : '新建集团'"
    @closeDrower="closeDrower"
    @submit="submitForm"
  >
    <ImForm ref="ImForm" :form="formConfig">
      <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />集团信息</h3>
      <EmployeeSelect slot="employeeSelect" v-model="formConfig.props.salesCounterpart" class="w-full"></EmployeeSelect>
    </ImForm>
  </ImDrawer>
</template>

<script>
import { addOrganizationItem, getOrganizationDetail, updateOrganizationItem } from '@/api/organization'
import { mapGetters } from 'vuex'
import EmployeeSelect from '@/views/components/EmployeeSelect'

export default {
  name: 'OrganizationCreate',
  components: {
    EmployeeSelect
  },
  data() {
    return {
      formConfig: {
        attrs: {
          labelWidth: '160px',
          labelPosition: 'right'
        },
        props: {
          name: undefined,
          groupSize: undefined,
          socialCreditCode: undefined,
          salesCounterpart: undefined,
          dealer: undefined,
          cooperationMode: undefined,
          contactName: undefined,
          contactPhone: undefined
        },
        formItems: [
          {
            type: 'ImSlot',
            notInForm: true,
            slots: {
              firstSlot: 'infoSlot'
            }
          },
          {
            type: 'ImInput',
            prop: 'name',
            label: '集团名称',
            rules: [{ required: true, message: '请输入集团名称' }],
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInputNumber',
            prop: 'socialCreditCode',
            label: '统一社会信用代码',
            attrs: {
              controls: false,
              style: 'width: 100%',
              placeholder: '请输入'
            }
          },
          {
            type: 'ImSelect',
            prop: 'groupSize',
            label: '集团规模',
            rules: [{ required: true, message: '请选择集团规模' }],
            attrs: {
              placeholder: '请选择',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'cooperationMode',
            label: '合作方式',
            rules: [{ required: true, message: '请选择合作方式' }],
            attrs: {
              placeholder: '请选择合作方式',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImInput',
            prop: 'dealer',
            label: '所属经销商',
            rules: [{ required: true, message: '请输入所属经销商' }],
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImSelect',
            prop: 'whetherAccounts',
            label: '是否建账',
            rules: [{ required: true, message: '请选择是否建账' }],
            attrs: {
              placeholder: '请选择是否建账',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImInput',
            prop: 'contactName',
            label: '联系人姓名',
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'contactPhone',
            label: '联系电话',
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImSlot',
            prop: 'salesCounterpart',
            label: '销售对接人',
            slots: {
              salesCounterpart: 'employeeSelect'
            }
          }
        ]
      },
      editId: undefined,
      drawerVisible: false
    }
  },
  computed: {
    ...mapGetters(['enums'])
  },
  created() {
    this.setOptions()
  },
  methods: {
    /**
     * 统一处理options
     */
    setOptions() {
      this.setFormPropOptions('groupSize', this.enums.organizationScale)
      this.setFormPropOptions('cooperationMode', this.enums.organizationCooperatType)
      this.setFormPropOptions('whetherAccounts', this.enums.organizationIsPrepareAccount)
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

    add() {
      this.editId = undefined
      this.drawerVisible = true
    },

    edit(editId) {
      this.editId = editId
      this.drawerVisible = true
      this.getItemDetail()
    },

    getItemDetail() {
      getOrganizationDetail({ objectCode: this.editId }).then((res) => {
        if (res.code === 200) {
          const props = this.formConfig.props
          const keys = Object.keys(props)
          // 直接遍历进行赋值，特殊属性需要单独拿出来处理
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            props[key] = res.data[key] || undefined
          }
        }
      })
    },

    submitForm() {
      this.$refs.ImForm.validate((valid) => {
        if (!valid) {
          this.$message('请检查表单项！')
          return
        }
        const data = {
          ...this.formConfig.props
        }
        if (this.editId) {
          data.objectCode = this.editId
          updateOrganizationItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addOrganizationItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.$emit('add')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    closeDrower() {
      this.$refs.ImForm.reset()
      this.drawerVisible = false
    }
  }
}
</script>
