<template>
  <ImWrapper>
    <div slot="header" class="wrapper-header">
      <el-steps :active="step" align-center>
        <el-step title="基础信息"></el-step>
        <el-step title="医生信息" description="V2等级及以上需要填写"></el-step>
        <el-step title="专家信息" description="V4等级及以上需要填写"></el-step>
      </el-steps>
    </div>
    <div class="mb-[32px]">
      <BaseInfoForm v-show="step===0" ref="BaseInfoForm" @levelChange="onLevelChanged"></BaseInfoForm>
      <DoctorInfoForm v-show="step===1" ref="DoctorInfoForm"></DoctorInfoForm>
      <ExpertInfoForm v-show="step===2" ref="ExpertInfoForm"></ExpertInfoForm>
    </div>
    <div class="fixed bottom-0 text-right right-0 w-full p-2 bg-white shadow-dark-50 shadow-2xl">
      <el-button @click="closeCurrent">取 消</el-button>
      <el-button v-if="step>0" type="primary" @click="previewStep">上一步</el-button>
      <el-button v-if="step<3&&!showSave" type="primary" @click="nextStep">下一步</el-button>
      <el-button v-if="showSave" type="primary" @click="submitForm">保 存</el-button>
    </div>
  </ImWrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseInfoForm from './components/BaseInfoForm'
import DoctorInfoForm from './components/DoctorInfoForm'
import ExpertInfoForm from './components/ExpertInfoForm'
import { getUserDetail, addUserItem, updateUserItem } from '@/api/user'
export default {
  name: 'UserAddOrEdit-nocache',
  components: {
    BaseInfoForm,
    DoctorInfoForm,
    ExpertInfoForm
  },
  data() {
    return {
      step: 0,
      doctorLevel: 0,
      baseInfoData: {},
      doctorInfoData: {},
      expertInfoData: {},
      editId: this.$route.query.objectCode
    }
  },
  computed: {
    ...mapGetters(['enums']),
    showSave() {
      if (this.doctorLevel === '1' && this.step === 0) {
        return true
      } else if (['2', '3'].includes(this.doctorLevel) && this.step === 1) {
        return true
      } else if (['4', '5'].includes(this.doctorLevel) && this.step === 2) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    if (this.editId) {
      this.getItemDetail()
    }
  },
  methods: {
    previewStep() {
      if (this.step <= 0) {
        this.step = 0
        return
      }
      this.step -= 1
    },

    nextStep() {
      if (this.step >= 2) {
        this.step = 2
        return
      }
      this.validateCurrentForm((valid) => {
        if (valid) {
          this.step += 1
        } else {
          this.$message('请检查表单项！')
        }
      })
    },

    validateCurrentForm(callback) {
      let valid = false
      if (this.step === 0) {
        this.$refs.BaseInfoForm.validate().then(res => {
          valid = res.valid
          this.baseInfoData = res.data
          callback(valid)
        })
      } else if (this.step === 1) {
        this.$refs.DoctorInfoForm.validate().then(res => {
          valid = res.valid
          this.doctorInfoData = res.data
          callback(valid)
        })
      } else if (this.step === 2) {
        this.$refs.ExpertInfoForm.validate().then(res => {
          valid = res.valid
          this.expertInfoData = res.data
          callback(valid)
        })
      }
    },

    getItemDetail() {
      getUserDetail({ objectCode: this.editId }).then((res) => {
        if (res.code === 200) {
          const baseInfoFormProps = this.$refs.BaseInfoForm.formConfig.props
          const doctorInfoFormProps = this.$refs.DoctorInfoForm.formConfig.props
          const expertInfoFormProps = this.$refs.ExpertInfoForm.formConfig.props
          const baseKeys = Object.keys(baseInfoFormProps)
          const doctorKeys = Object.keys(doctorInfoFormProps)
          const expertKeys = Object.keys(expertInfoFormProps)
          const resData = res.data || {}
          this.doctorLevel = resData.doctorLevel
          console.log('this.doctorLevel', this.doctorLevel)
          // 直接遍历进行赋值，特殊属性需要单独拿出来处理
          for (let i = 0; i < baseKeys.length; i++) {
            const key = baseKeys[i]
            baseInfoFormProps[key] = resData[key] || undefined
          }
          for (let i = 0; i < doctorKeys.length; i++) {
            const key = doctorKeys[i]
            doctorInfoFormProps[key] = resData[key] || undefined
          }
          for (let i = 0; i < expertKeys.length; i++) {
            const key = expertKeys[i]
            expertInfoFormProps[key] = resData[key] || undefined
          }
        }
      })
    },

    onLevelChanged(doctorLevel) {
      this.doctorLevel = doctorLevel
    },

    submitForm() {
      this.validateCurrentForm((valid) => {
        if (!valid) {
          this.$message('请检查表单项！')
          return
        }
        const data = {
          ...this.baseInfoData,
          ...this.doctorInfoData,
          ...this.expertInfoData
        }
        if (this.editId) {
          data.objectCode = this.editId
          updateUserItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.closeCurrent()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addUserItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.closeCurrent()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    closeCurrent() {
      this.$router.replace({ name: 'UserList' })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-header {
  max-width: 780px;;
  margin: 0 auto;
  padding: 16px;
  padding-bottom: 0;
}
</style>
