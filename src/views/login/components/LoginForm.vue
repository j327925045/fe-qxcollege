<template>
  <div class="login-form">
    <h2 class="mb-3 pl-4 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left enter-x">登录</h2>
    <el-form ref="formRef" class="p-4 enter-x" :model="formData" :rules="getFormRules" @keypress.enter="handleLogin">
      <el-form-item label="" class="" prop="account">
        <el-input v-model="formData.account" size="medium" placeholder="账号" auto-complete="new-password" class="fix-auto-fill"></el-input>
      </el-form-item>
      <el-form-item label="" class="" prop="password">
        <el-input v-model="formData.password" size="medium" placeholder="密码" auto-complete="new-password" class="fix-auto-fill" show-password></el-input>
      </el-form-item>
      <el-row class="enter-x">
        <el-col :span="12">
          <el-form-item label="" class="" prop="rememberMe">
            <el-checkbox v-model="formData.rememberMe">记住我</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="text-right">
            <el-button type="text">忘记密码</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="enter-x">
        <el-button class="w-full" type="primary" size="large" block :loading="loading" @click="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from '@/api/login.js'
import { setToken } from '@/utils/auth.js'
export default {
  name: 'LoginForm',
  data() {
    return {
      formData: {
        account: '',
        password: '',
        rememberMe: false
      },
      getFormRules: {
        account: [{ required: true, message: '请输入账号' }],
        password: [{ required: true, message: '请输入密码' }]
      },
      loading: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.$refs.formRef.validate(valid => {
        if (!valid) {
          return
        }
        const data = {
          account: this.formData.account,
          password: this.formData.password,
          remember_me: this.formData.rememberMe
        }
        login(data).then(res => {
          const token = res.data.token
          setToken(token)
          this.$router.push({ path: this.redirect || '/' })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .fix-auto-fill input {
    -webkit-text-fill-color: #c9d1d9 !important;
    box-shadow: inherit !important;
  }

  .login-form {
    /deep/ .el-input__inner {
      height: 48px;
      font-size: 16px;
      line-height: 48px;
    }
  }
</style>
