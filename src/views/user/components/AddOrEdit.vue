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
        <h2>{{ editId?'编辑用户':'新建用户' }}</h2>
      </el-row>
      <div class="gyl-form-view pb-[60px]">
        <el-form ref="form" :model="form" :rules="rules" label-width="140px">
          <div class="gyl-form-view">
            <h3 class="gyl-title"><i class="el-icon-s-order" />个人信息</h3>
            <el-form-item label="真实姓名" prop="realName">
              <el-input v-model="form.realName" placeholder="请输入真实姓名" />
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="form.nickname" placeholder="请输入昵称" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select v-model="form.gender" placeholder="请选择性别">
                <el-option v-for="(item, idx) in enums.genderOptions" :key="idx" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="出生年月" prop="birthday">
              <el-date-picker v-model="form.birthday" value-format="yyyy-MM-dd" type="date" placeholder="请选择出生年月"></el-date-picker>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="form.phone" :maxlength="11" placeholder="请输入手机号码" />
            </el-form-item>
            <el-form-item label="个人照片" prop="personalUrl">
              <el-input v-model="form.personalUrl" placeholder="请输入个人照片" />
            </el-form-item>
          </div>
          <div class="gyl-form-view">
            <h3 class="gyl-title"><i class="el-icon-s-order" />职业信息</h3>
            <el-form-item label="医院" prop="hospitalCode">
              <HospitalSelect v-model="form.hospitalCode" placeholder="请选择医院"></HospitalSelect>
            </el-form-item>
            <el-form-item label="科室" prop="department">
              <el-input v-model="form.department" placeholder="请输入科室" />
            </el-form-item>
            <el-form-item label="医生等级" prop="doctorLevel">
              <el-select v-model="form.doctorLevel" placeholder="请选择医生等级">
                <el-option
                  v-for="item in [{label: 'V1', value: 1}, {label: 'V2', value: 2}, {label: 'V3', value: 3}, {label: 'V4', value: 4}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职称" prop="jobTitle">
              <el-input v-model="form.jobTitle" placeholder="请输入职称" />
            </el-form-item>
            <el-form-item label="所在区域(省市县)" prop="regionCode">
              <RegionSelect v-model="form.regionCode" placeholder="请输入所在区域(省市县)"></RegionSelect>
            </el-form-item>
            <el-form-item label="执业地点(详细地址)" prop="address">
              <el-input v-model="form.address" placeholder="请输入执业地点(详细地址)" />
            </el-form-item>
            <el-form-item label="是否认证" prop="isCertified">
              <el-select v-model="form.isCertified" placeholder="请选择是否认证">
                <el-option
                  v-for="item in [{label: '认证', value: 1}, {label: '未认证', value: 2}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否合作项目" prop="isCooperation">
              <el-select v-model="form.isCooperation" placeholder="请选择是否合作项目">
                <el-option
                  v-for="item in [{label: '是', value: 1}, {label: '否', value: 2}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否讲师" prop="isLecturer">
              <el-select v-model="form.isLecturer" placeholder="请选择是否讲师">
                <el-option
                  v-for="item in [{label: '是', value: 1}, {label:'否', value: 2}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="资质认证" prop="isQualification">
              <el-select v-model="form.isQualification" placeholder="请选择资质认证">
                <el-option
                  v-for="item in [{label: '认证', value: 1},{label: '未认证', value: 2}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="个人介绍" prop="personalIntroduction">
              <el-input v-model="form.personalIntroduction" placeholder="请输入个人介绍" />
            </el-form-item>
          </div>
        </el-form>
        <div class="fixed bottom-0 right-0 text-right w-[650px] p-4 bg-white shadow-dark-50 shadow-2xl">
          <el-button @click="closeDrower">取 消</el-button>
          <el-button type="primary" @click="submitForm">保 存</el-button>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { addUserItem, getUserDetail, updateUserItem } from '@/api/user'
import { mapGetters } from 'vuex'
import HospitalSelect from '@/views/components/HospitalSelect'
import RegionSelect from '@/views/components/RegionSelect'
export default {
  name: 'AddOrEdit',
  components: {
    HospitalSelect,
    RegionSelect
  },
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
        realName: [{ required: true, message: '请输入真实姓名' }],
        nickname: [{ required: true, message: '请输入昵称' }],
        birthday: [{ required: true, message: '请选择出生年月' }],
        gender: [{ required: true, message: '请选择性别' }],
        phone: [{ required: true, message: '请输入手机号' }, { validator: this.phoneValidate }]
      },
      drawerVisible: false,
      editId: undefined
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
          return
        }
        const data = {
          ...this.form
        }
        const formRegionCode = this.form.regionCode
        if (formRegionCode && formRegionCode.length > 0) {
          data.regionCode = formRegionCode[formRegionCode.length - 1]
        }
        if (this.editId) {
          data.id = this.editId
          updateUserItem(data).then(res => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addUserItem(data).then(res => {
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
