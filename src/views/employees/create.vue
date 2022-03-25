<template>
  <div class="gyl-with-footer">
    <div class="gyl-form-view">
      <h3 class="gyl-title"><i class="el-icon-s-order" />基本信息</h3>
      <el-row>
        <el-form ref="form" :model="form" :rules="rules" label-width="140px">
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="员工姓名" prop="name">
              <el-input v-model="form.name" placeholder="请输入员工姓名" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="员工性别" prop="gender">
              <el-select v-model="form.gender" placeholder="请选择员工性别">
                <el-option v-for="(item, idx) in enums.genderOptions" :key="idx" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="员工头像" prop="avatar">
              <el-input v-model="form.avatar" placeholder="请输入员工姓名" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="账号（手机号）" prop="account">
              <el-input v-model="form.account" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
          <el-col v-if="!editId" :xs="24" :sm="12" :lg="8">
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="员工性质" prop="nature">
              <el-select v-model="form.nature" placeholder="请选择员工性质">
                <el-option v-for="(item, idx) in enums.employeeNatureOptions" :key="idx" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="员工状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择员工状态">
                <el-option v-for="(item, idx) in enums.employeeStatusOptions" :key="idx" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="gyl-footer-bar">
      <div class="txt-right">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">保 存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addUserItem, getUserDetail, updateUserItem } from '@/api/user'
import { mapGetters } from 'vuex'
export default {
  name: 'UserCreate',
  inject: ['removeTab'],
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
        account: [{ required: true, message: '请输入账号（手机号）' }],
        password: [{ required: true, message: '请输入密码' }],
        nature: [{ required: true, message: '请选择员工性质' }],
        status: [{ required: true, message: '请选择员工状态' }]
      },
      editId: this.$route.query.id
    }
  },
  computed: {
    ...mapGetters(['enums'])
  },
  created() {
    if (this.editId) {
      this.getItemDetail()
    }
  },
  methods: {
    getItemDetail() {
      getUserDetail({ id: this.editId }).then(res => {
        if (res.code === 200) {
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
        }
        const data = {
          ...this.form
        }
        if (this.editId) {
          data.id = this.editId
          updateUserItem(data).then(res => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.closeTab()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addUserItem(data).then(res => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.closeTab()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    cancel() {
      this.$refs.form.resetFields()
      this.closeTab()
    },
    closeTab() {
      this.removeTab(this.$route.name)
    }
  }
}
</script>
