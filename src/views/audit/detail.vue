<template>
  <ImWrapper>
    <div slot="header" class="bg-white rounded p-6 mt-2">
      <div class="header-container">
        <span class="header-text">审核</span>
        <div>
          <el-button type="" @click="submit(2)">拒绝</el-button>
          <el-button type="primary" @click="submit(1)">同意</el-button>
        </div>
      </div>
    </div>

    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">专栏信息</span>
      </div>
      <el-descriptions size="medium" label-class-name="descriptionLabelClass">
        <el-descriptions-item label="医生编号">{{ auditDetail.doctorNumber }}</el-descriptions-item>
        <el-descriptions-item label="创建人">{{ auditDetail.createName }}</el-descriptions-item>
        <el-descriptions-item label="创建时间"> {{ getDateTime(auditDetail.createTime) }}</el-descriptions-item>
        <el-descriptions-item label="审批编号">{{ auditDetail.objectCode }}</el-descriptions-item>
        <el-descriptions-item label="申请人名字">{{ auditDetail.userName }}</el-descriptions-item>
        <el-descriptions-item label="身份证号">{{ auditDetail.realIdNumber }}</el-descriptions-item>
        <el-descriptions-item label="医生手机号">{{ auditDetail.phone }}</el-descriptions-item>
        <el-descriptions-item label="执业地点">{{ auditDetail.realAddress }}</el-descriptions-item>
        <el-descriptions-item label="执业类别">{{ auditDetail.realPracticeCategory != '0' ? auditDetail.realPracticeCategory : '' }}</el-descriptions-item>
        <el-descriptions-item label="执业范围">{{ auditDetail.realPracticeArea != '0' ? auditDetail.realPracticeArea : '' }}</el-descriptions-item>
        <el-descriptions-item label="医师执业证书编码">{{ auditDetail.realPracticeCertificateCode }}</el-descriptions-item>
        <el-descriptions-item label="医师资格证书编码">{{ auditDetail.realQualificationCode }}</el-descriptions-item>
        <el-descriptions-item label="学历">{{ auditDetail.realEducation != '0' ? auditDetail.realEducation : '' }}</el-descriptions-item>
        <el-descriptions-item label="毕业学校">{{ auditDetail.realGraduationSchool }}</el-descriptions-item>
        <el-descriptions-item label="类别">{{ auditDetail.realCategory }}</el-descriptions-item>
        <el-descriptions-item label="专业">{{ auditDetail.realMajor }}</el-descriptions-item>
      </el-descriptions>

      <el-descriptions size="medium" :column="2" label-class-name="descriptionLabelClass">
        <el-descriptions-item label="医师执业证书编码">{{ auditDetail.realPracticeCertificateCode }}</el-descriptions-item>
        <el-descriptions-item label="医师资格证书编码">{{ auditDetail.realQualificationCode }}</el-descriptions-item>
        <el-descriptions-item label="医师执业证书"><img class="imageClass" :src="auditDetail.realDoctorPracticeCertificate" alt="" srcset="" @click="showImgView(auditDetail.realDoctorPracticeCertificate)"></el-descriptions-item>
        <el-descriptions-item label="医师资格证书"><img class="imageClass" :src="auditDetail.realDoctorQualificationCertificate" alt="" srcset="" @click="showImgView(auditDetail.realDoctorQualificationCertificate)"></el-descriptions-item>
      </el-descriptions>
    </el-card>

  </ImWrapper>
</template>

<script>
import { auditCommit, getDetail } from '@/api/audit'
import moment from 'moment'
import { mapGetters } from 'vuex'
import utils from '@/utils/utils'

export default {
  name: 'ColumnDetail--nocache',
  data() {
    return {
      auditDetail: {},
      objectCode: this.$route.query.objectCode,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['enums'])
    // 之所以把tableConfig放在计算属性里边，是因为里边用到了enums计算属性，enums是异步获取

  },
  created() {
    this.getInfos()
  },
  methods: {
    showImgView(url) {
      this.$viewerApi({
        images: [url]
      })
    },
    
    getDateTime(date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    // 审批
    submit(statucs) {
      this.$confirm('确定' + (statucs === 2 ? '拒绝' : '同意') + '该审批吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          const examineDTO = {
            applyCode: this.objectCode,
            comment: '',
            status: statucs
          }
          this.loading = true
          auditCommit(examineDTO).then((res) => {
            this.loading = false
            this.detailDialogVisible = false
            this.$emit('update')
            this.visibleFn()
            this.$message.success('更新成功')
          })
        })
        .catch(() => {
        })
    },

    getInfos() {
      this.loading = true
      getDetail(this.objectCode)
        .then((res) => {
          this.loading = false
          this.auditDetail = res.data || []
        })
        .catch((_) => {
          this.loading = false
        })
    },
    getLabelByValue(key, value) {
      const item = utils.getOptionsItemByValue(key, value)
      return item.label || ''
    },
    visibleFn() {
      this.$router.push('/audit/list')
    }
  }
}
</script>
<style lang="scss" scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-text {
    color: #000;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
}

.box-card {
  margin-bottom: 16px;

  .headertext {
    color: #000;
    font-weight: 600;
    font-size: 16px;
  }

  .imageClass {
    width: 124px;
    height: 124px;
    cursor: pointer;
  }
}

/deep/ .descriptionLabelClass {
  justify-content: right;
  width: 120px;
  margin-bottom: 24px;
}

/deep/ .el-descriptions-item__label {
  padding-bottom: 10px;
  font-weight: bold;
}
</style>
