<template>
  <ImDrawer
    :visible.sync="drawerVisible"
    :title="editId ? '编辑员工' : '新建员工'"
    @closeDrower="closeDrower"
    @submit="submitForm"
  >
    <ImForm ref="ImForm" :form="formConfig">
      <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />基本信息</h3>
    </ImForm>
  </ImDrawer>
</template>

<script>
import { addEmployeesItem, getEmployeesDetail, updateEmployeesItem } from '@/api/employees'
import { mapGetters } from 'vuex'

export default {
  name: 'AddOrEdit',
  data() {
    return {
      formConfig: {
        attrs: {
          labelWidth: '140px',
          labelPosition: 'right'
        },
        props: {
          name: undefined,
          gender: undefined,
          avatar: undefined,
          account: undefined,
          password: undefined,
          nature: undefined,
          status: undefined
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
            label: '员工姓名',
            rules: [{ required: true, message: '请输入员工姓名' }],
            attrs: {
              placeholder: '请输入员工姓名'
            }
          },
          {
            type: 'ImSelect',
            prop: 'gender',
            label: '员工性别',
            rules: [{ required: true, message: '请选择员工性别' }],
            attrs: {
              placeholder: '请选择员工性别',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImImgUpload',
            prop: 'avatar',
            label: '员工头像',
            rules: [{ required: true, message: '请上传员工头像' }]
          },
          {
            type: 'ImInput',
            prop: 'account',
            label: '账号（手机号）',
            rules: [{ required: true, message: '请输入手机号' }, 'phone'],
            attrs: {
              type: 'text',
              placeholder: '请输入手机号',
              maxLength: 11
            }
          },
          {
            type: 'ImInput',
            prop: 'password',
            label: '密码',
            hidden: false,
            rules: [{ required: true, message: '请输入密码' }],
            attrs: {
              placeholder: '请输入密码'
            }
          },
          {
            type: 'ImSelect',
            prop: 'nature',
            label: '员工性质',
            rules: [{ required: true, message: '请选择员工性质' }],
            attrs: {
              placeholder: '请选择员工性质',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'status',
            label: '员工状态',
            rules: [{ required: true, message: '请选择员工状态' }],
            attrs: {
              placeholder: '请选择员工状态',
              clearable: true,
              class: 'w-full',
              options: []
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
      this.setFormPropOptions('gender', this.enums.gender)
      this.setFormPropOptions('nature', this.enums.employeeNature)
      this.setFormPropOptions('status', this.enums.employeeStatus)
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
      this.setPasswordVisible(true)
    },

    edit(editId) {
      this.editId = editId
      this.drawerVisible = true
      this.getItemDetail()
      this.setPasswordVisible(false)
    },

    setPasswordVisible(visible) {
      const formItems = this.formConfig.formItems
      const item = formItems.find(item => item.prop === 'password')
      item.hidden = !visible
    },

    getItemDetail() {
      getEmployeesDetail({ objectCode: this.editId }).then((res) => {
        if (res.code === 200 && res.data) {
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
          updateEmployeesItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addEmployeesItem(data).then((res) => {
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
