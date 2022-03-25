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
        <h2>{{ editId?'编辑员工':'新建员工' }}</h2>
      </el-row>
      <div class="gyl-form-view pb-[60px]">
        <h3 class="gyl-title"><i class="el-icon-s-order" />基本信息</h3>
        <el-form ref="form" :model="form" :rules="rules" label-width="140px">
          <el-form-item label="员工姓名" prop="name">
            <el-input v-model.trim="form.name" placeholder="请输入员工姓名" />
          </el-form-item>
          <el-form-item label="员工性别" prop="gender">
            <el-select v-model="form.gender" placeholder="请选择员工性别">
              <el-option v-for="(item, idx) in enums.genderOptions" :key="idx" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="员工头像" prop="avatar">
            <el-input v-model.trim="form.avatar" placeholder="请输入员工头像地址" />
          </el-form-item>
          <el-form-item label="账号（手机号）" prop="account">
            <el-input v-model.trim="form.account" :maxlength="11" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item v-if="!editId" label="密码" prop="password">
            <el-input v-model.trim="form.password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="员工性质" prop="nature">
            <el-select v-model="form.nature" placeholder="请选择员工性质">
              <el-option v-for="(item, idx) in enums.employeeNatureOptions" :key="idx" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="员工状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择员工状态">
              <el-option v-for="(item, idx) in enums.employeeStatusOptions" :key="idx" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="fixed bottom-0 right-0 text-right w-[650px] p-4 bg-white shadow-dark-50 shadow-2xl">
        <el-button @click="closeDrower">取 消</el-button>
        <el-button type="primary" @click="submitForm">保 存</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { addEmployeesItem, getEmployeesDetail, updateEmployeesItem } from '@/api/employees'
import { mapGetters } from 'vuex'
export default {
  name: 'AddOrEdit',
  data() {
    return {
      form: {
        name: undefined,
        gender: undefined,
        avatar: undefined,
        account: undefined,
        password: undefined,
        nature: undefined,
        status: undefined
      },
      rules: {
        name: [{ required: true, message: '请输入员工姓名' }],
        gender: [{ required: true, message: '请选择员工性别' }],
        account: [{ required: true, message: '请输入账号（手机号）' }, { validator: this.phoneValidate }],
        password: [{ required: true, message: '请输入密码' }],
        nature: [{ required: true, message: '请选择员工性质' }],
        status: [{ required: true, message: '请选择员工状态' }]
      },
      editId: undefined,
      drawerVisible: false
    }
  },
  computed: {
    ...mapGetters(['enums'])
  },
  methods: {
    phoneValidate(rule, value, callback) {
      const regex = /^1\d{10}$/
      if (regex.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号'))
      }
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
      getEmployeesDetail({ id: this.editId }).then(res => {
        if (res.code === 200 && res.data) {
          this.form = {
            name: res.data.name,
            gender: res.data.gender,
            avatar: res.data.avatar,
            account: res.data.account,
            nature: res.data.nature,
            status: res.data.status
          }
        }
      })
    },

    submitForm() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          this.$message('请检查表单项！')
          return
        }
        const data = {
          ...this.form
        }
        if (this.editId) {
          data.id = this.editId
          updateEmployeesItem(data).then(res => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addEmployeesItem(data).then(res => {
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
      this.$refs.form.resetFields()
      this.drawerVisible = false
    }
  }
}
</script>
