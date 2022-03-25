<template>
  <div class="gyl-with-footer">
    <div class="gyl-form-view">
      <h3 class="gyl-title"><i class="el-icon-s-order" />基本信息</h3>
      <el-row>
        <el-form ref="form" :model="form" :rules="rules" label-width="140px">
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="医院名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入医院名称" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="所属机构" prop="organizationCode">
              <el-input v-model="form.organizationCode" placeholder="请选择所属机构" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="区域" prop="regionCode">
              <el-input v-model="form.regionCode" placeholder="请选择区域" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="医院状态" prop="status">
              <el-input v-model="form.status" placeholder="请选择医院状态" />
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
import { addHospitalItem, getHospitalDetail, updateHospitalItem } from '@/api/hospital'
import { mapGetters } from 'vuex'
export default {
  name: 'HospitalCreate',
  inject: ['removeTab'],
  data() {
    return {
      form: {
        name: undefined,
        organizationCode: undefined,
        regionCode: undefined,
        status: undefined
      },
      rules: {},
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
      getHospitalDetail({ id: this.editId }).then(res => {
        if (res.code === 200) {
          this.form = {
            name: res.data.name,
            organizationCode: res.data.organizationCode,
            regionCode: res.data.regionCode,
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
          updateHospitalItem(data).then(res => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.closeTab()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addHospitalItem(data).then(res => {
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
