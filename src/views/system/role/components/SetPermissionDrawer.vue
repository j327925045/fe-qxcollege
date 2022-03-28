<template>
  <el-drawer
    :visible.sync="drawerVisible"
    size="650px"
    custom-class="gyl-detail-drawer"
    :with-header="false"
    :wrapper-closable="false"
  >
    <div class="gyl-hamburger" @click="drawerVisible = false">
      <i class="el-icon-arrow-right" />
    </div>
    <div class="drawer-content">
      <el-row type="flex" align="middle" justify="start" class="drawer-tit">
        <h2>编辑权限</h2>
      </el-row>
      <div class="gyl-form-view pb-[60px]">
        <h3 class="gyl-title"><i class="el-icon-s-order" />权限树</h3>
        <el-form ref="form" :model="form" :rules="rules" label-position="top">
          <el-form-item label="" prop="name">
            <PermissionTreeSelect ref="PermissionTreeSelect" v-model="form.permissionCode"></PermissionTreeSelect>
          </el-form-item>
        </el-form>
      </div>
      <div class="fixed bottom-0 right-0 z-10 text-right w-[650px] p-4 bg-white shadow-dark-50 shadow-2xl">
        <el-button @click="closeDrower">取 消</el-button>
        <el-button type="primary" @click="submitForm">保 存</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import PermissionTreeSelect from '@/views/components/PermissionTreeSelect'
import { setRolePermission, getRolePermissionDetail } from '@/api/rolePermission'
export default {
  name: 'SetPermissionDrawer',
  components: {
    PermissionTreeSelect
  },
  data() {
    return {
      drawerVisible: false,
      form: {
        permissionCode: []
      },
      rules: {
        permissionCode: [{ required: true, message: '请选择权限' }]
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
          this.form.permissionCode = objectCodeArr
        }
      })
    },

    submitForm() {
      console.log('this.form', this.form)
      this.$refs.form.validate(valid => {
        if (!valid) {
          this.$message('请检查表单项！')
          return
        }
        const data = {
          roleCode: this.editId,
          ...this.form
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
      this.$refs.form.resetFields()
      this.drawerVisible = false
    }
  }
}
</script>
