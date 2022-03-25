<template>
  <div class="gyl-with-footer">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px">
      <div class="gyl-form-view">
        <h3 class="gyl-title"><i class="el-icon-s-order" />个人信息</h3>
        <el-row>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="真实姓名" prop="realName">
              <el-input v-model="form.realName" placeholder="请输入真实姓名" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="form.nickname" placeholder="请输入昵称" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="性别" prop="gender">
              <el-select v-model="form.gender" placeholder="请选择性别">
                <el-option v-for="(item, idx) in enums.genderOptions" :key="idx" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="出生年月" prop="birthday">
              <el-date-picker v-model="form.birthday" value-format="yyyy-MM-dd" type="date" placeholder="请选择出生年月"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号码" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="个人照片" prop="personalUrl">
              <el-input v-model="form.personalUrl" placeholder="请输入个人照片" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="gyl-form-view">
        <h3 class="gyl-title"><i class="el-icon-s-order" />职业信息</h3>
        <el-row>

          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="医院" prop="hospitalCode">
              <el-select v-model="form.hospitalCode" placeholder="请选择医院">
                <!--                <el-option v-for="(item, idx) in enums.employeeNatureOptions" :key="idx" :label="item.label" :value="item.value" />-->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="科室" prop="department">
              <el-input v-model="form.department" placeholder="请输入科室" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="医生等级" prop="doctorLevel">
              <el-select v-model="form.doctorLevel" placeholder="请选择医生等级">
                <!--                <el-option v-for="(item, idx) in enums.employeeNatureOptions" :key="idx" :label="item.label" :value="item.value" />-->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="职称" prop="jobTitle">
              <el-input v-model="form.jobTitle" placeholder="请输入职称" />
            </el-form-item>
          </el-col>
          <el-col v-if="!editId" :xs="24" :sm="12" :lg="8">
            <el-form-item label="所在区域(省市县)" prop="regionCode">
              <el-input v-model="form.regionCode" placeholder="请输入所在区域(省市县)" />
            </el-form-item>
          </el-col>
          <el-col v-if="!editId" :xs="24" :sm="12" :lg="8">
            <el-form-item label="执业地点(详细地址)" prop="address">
              <el-input v-model="form.address" placeholder="请输入执业地点(详细地址)" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="是否认证" prop="isCertified">
              <el-select v-model="form.isCertified" placeholder="请选择是否认证">
                <!--                <el-option v-for="(item, idx) in enums.employeeStatusOptions" :key="idx" :label="item.label" :value="item.value" />-->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="是否合作项目" prop="isCooperation">
              <el-select v-model="form.isCooperation" placeholder="请选择是否合作项目">
                <!--                <el-option v-for="(item, idx) in enums.employeeStatusOptions" :key="idx" :label="item.label" :value="item.value" />-->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="是否讲师" prop="isLecturer">
              <el-select v-model="form.isLecturer" placeholder="请选择是否讲师">
                <!--                <el-option v-for="(item, idx) in enums.employeeStatusOptions" :key="idx" :label="item.label" :value="item.value" />-->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="资质认证" prop="isQualification">
              <el-select v-model="form.isQualification" placeholder="请选择资质认证">
                <!--                <el-option v-for="(item, idx) in enums.employeeStatusOptions" :key="idx" :label="item.label" :value="item.value" />-->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="个人介绍" prop="personalIntroduction">
              <el-input v-model="form.personalIntroduction" placeholder="请输入个人介绍" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
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
  name: 'EmployeesCreate',
  inject: ['removeTab'],
  data() {
    return {
      form: {
        nickname: undefined,
        gender: undefined,
        birthday: undefined,
        phone: undefined,
        personalUrl: undefined,
        hospitalCode: undefined,
        department: undefined,
        doctorLevel: undefined,
        jobTitle: undefined,
        regionCode: undefined,
        address: undefined,
        isCertified: undefined,
        isCooperation: undefined,
        isLecturer: undefined,
        isQualification: undefined,
        personalIntroduction: undefined
      },
      rules: {
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
          this.form = {}
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
