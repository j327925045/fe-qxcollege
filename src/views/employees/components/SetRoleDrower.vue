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
        <h2>编辑角色</h2>
      </el-row>
      <div class="gyl-form-view pb-[60px]">
        <h3 class="gyl-title"><i class="el-icon-s-order" />角色选择</h3>
        <el-form ref="form" :model="form" :rules="rules" label-position="top">
          <el-form-item label="" prop="name">
            <RoleSelect ref="RoleSelect" v-model="form.roleCodeList"></RoleSelect>
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
import RoleSelect from '@/views/components/RoleSelect'
import { setEmployeesRole, getEmployeesRoleDetail } from '@/api/employeesRole'
export default {
  name: 'SetRoleDrawer',
  components: {
    RoleSelect
  },
  data() {
    return {
      drawerVisible: false,
      form: {
        roleCodeList: []
      },
      rules: {
        roleCodeList: [{ required: true, message: '请选择权限' }]
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
      getEmployeesRoleDetail({ objectCode: this.editId }).then(res => {
        if (res.code === 200) {
          const objectCodeArr = res.data.map(item => item.objectCode)
          this.form.roleCodeList = objectCodeArr
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
          employeeCode: this.editId,
          ...this.form
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
