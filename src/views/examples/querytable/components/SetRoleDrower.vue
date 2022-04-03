<template>
  <ImDrawer
    :visible.sync="drawerVisible"
    title="编辑角色"
    @closeDrower="closeDrower"
    @submit="submitForm"
  >
    <ImForm ref="ImForm" :form="formConfig">
      <h3 slot="baseInfo" class="gyl-title"><i class="el-icon-s-order" />角色选择</h3>
      <RoleSelect slot="RoleSelectSlot" v-model="formConfig.props.roleCodeList" placeholder="请选择角色" style="width: 100%;"></RoleSelect>
    </ImForm>
  </ImDrawer>
</template>

<script>
import RoleSelect from '@/views/components/RoleSelect'
import ImDrawer from '@/views/components/ImDrawer'
import ImForm from '@/views/components/ImForm'
import { setEmployeesRole, getEmployeesRoleDetail } from '@/api/employeesRole'

export default {
  name: 'SetRoleDrawer',
  components: {
    ImDrawer,
    ImForm,
    RoleSelect
  },
  data() {
    return {
      formConfig: {
        attrs: {
          labelWidth: '100px'
        },
        props: {
          roleCodeList: []
        },
        formItems: [
          {
            type: 'ImSlot',
            notInForm: true,
            slots: {
              info: 'baseInfo'
            }
          },
          {
            type: 'ImSlot',
            prop: 'roleCodeList',
            label: '员工角色',
            rules: [{ required: true, message: '请选择角色' }],
            slots: {
              roleCodeList: 'RoleSelectSlot'
            }
          }
        ]
      },
      drawerVisible: false
    }
  },
  methods: {
    edit(editId) {
      this.editId = editId
      this.drawerVisible = true
      this.getItemDetail()
    },

    getItemDetail() {
      getEmployeesRoleDetail({ objectCode: this.editId }).then(res => {
        if (res.code === 200) {
          const objectCodeArr = res.data.map(item => item.objectCode)
          this.formConfig.props.roleCodeList = objectCodeArr
        }
      })
    },

    submitForm() {
      this.$refs.ImForm.validate(valid => {
        if (!valid) {
          this.$message('请检查表单项！')
          return
        }
        const data = {
          employeeCode: this.editId,
          ...this.formConfig.props
        }
        setEmployeesRole(data).then(res => {
          if (res.code === 200) {
            this.$message.success('操作成功！')
            this.$emit('update')
            this.closeDrower()
          } else {
            this.$message.error(res.message)
          }
        })
      })
    },

    closeDrower() {
      this.$refs.ImForm.reset()
      this.drawerVisible = false
    }
  }
}
</script>
