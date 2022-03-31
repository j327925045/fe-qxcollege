<template>
  <ImDrawer
    :visible.sync="drawerVisible"
    title="编辑权限"
    @closeDrower="closeDrower"
    @submit="submitForm"
  >
    <ImForm ref="ImForm" :form="formConfig">
      <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />权限树</h3>
      <PermissionTreeSelect slot="PermissionTreeSelect" ref="PermissionTreeSelect" v-model="formConfig.props.permissionCode"></PermissionTreeSelect>
    </ImForm>
  </ImDrawer>
</template>

<script>
import PermissionTreeSelect from '@/views/components/PermissionTreeSelect'
import ImDrawer from '@/views/components/ImDrawer'
import ImForm from '@/views/components/ImForm'
import { setRolePermission, getRolePermissionDetail } from '@/api/rolePermission'

export default {
  name: 'SetPermissionDrawer',
  components: {
    ImDrawer,
    ImForm,
    PermissionTreeSelect
  },
  data() {
    return {
      drawerVisible: false,
      formConfig: {
        attrs: {
          labelWidth: '0',
          labelPosition: 'right'
        },
        props: {
          permissionCode: []
        },
        formItems: [
          {
            type: 'ImSlot',
            notInForm: true,
            slots: {
              info: 'infoSlot'
            }
          },
          {
            type: 'ImSlot',
            prop: 'permissionCode',
            rules: [{ required: true, message: '请选择角色权限' }],
            slots: {
              permissionCode: 'PermissionTreeSelect'
            }
          }
        ]
      }
    }
  },
  methods: {
    edit(editId) {
      this.editId = editId
      this.drawerVisible = true
      this.getItemDetail()
    },

    getItemDetail() {
      getRolePermissionDetail({ objectCode: this.editId }).then(res => {
        if (res.code === 200) {
          const objectCodeArr = res.data.map(item => item.objectCode)
          this.formConfig.props.permissionCode = objectCodeArr
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
          roleCode: this.editId,
          ...this.formConfig.props
        }
        setRolePermission(data).then(res => {
          if (res.code === 200) {
            this.$message.success('操作成功！')
            this.$emit('update')
            this.closeDrower()
          } else {
            this.$message.error(res.message)
          }
        })
        console.log('data', data)
      })
    },

    closeDrower() {
      this.$refs.ImForm.reset()
      this.drawerVisible = false
    }
  }
}
</script>
