<template>
  <el-dialog title="审批详情" width="860px" :visible.sync="detailDialogVisible" @close="visibleFn">
    <el-descriptions>
      <el-descriptions-item label="创建人">{{ auditDetail.createBy }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">  {{ moment(auditDetail.createTime).format('YYYY-MM-DD') }}</el-descriptions-item>
      <el-descriptions-item label="医师执业证书编码">{{ auditDetail.realPracticeCertificateCode }}</el-descriptions-item>
      <el-descriptions-item label="审批编号">{{ auditDetail.objectCode }}</el-descriptions-item>
      <el-descriptions-item label="申请人名字">{{ auditDetail.userName }}</el-descriptions-item>
      <el-descriptions-item label="医生编号">{{ "接口没反" }}</el-descriptions-item>
      <el-descriptions-item label="医生手机号">{{ "接口没反" }}</el-descriptions-item>
      <el-descriptions-item label="执业地点">{{ auditDetail.realAddress }}</el-descriptions-item>
      <el-descriptions-item label="执业类别">{{ auditDetail.realPracticeCategory }}</el-descriptions-item>
      <el-descriptions-item label="执业范围">{{ auditDetail.realPracticeArea }}</el-descriptions-item>
      <el-descriptions-item label="医师资格证书编码">{{ auditDetail.realQualificationCode }}</el-descriptions-item>
      <el-descriptions-item label="身份证号">{{ auditDetail.realIdNumber }}</el-descriptions-item>
      <el-descriptions-item label="学历">{{ auditDetail.realEducation }}</el-descriptions-item>
      <el-descriptions-item label="毕业学校">{{ auditDetail.realGraduationSchool }}</el-descriptions-item>
      <el-descriptions-item label="类别">{{ auditDetail.realCategory }}</el-descriptions-item>
      <el-descriptions-item label="专业">{{ auditDetail.realMajor }}</el-descriptions-item>
    </el-descriptions>

    <div v-if="auditDetail.status=='0'" slot="footer">
      <el-button type="primary" @click="submit(1)">同意</el-button>
      <el-button type="primary" @click="submit(2)">拒绝</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import utils from '@/utils/utils'

import { getDetail, auditCommit } from '@/api/audit'
export default {
  name: 'DetailDialog',
  data() {
    return {
      moment,
      detailDialogVisible: false,
      auditDetail: {},
      examineDTO: {
        applyCode: '',
        comment: '',
        status: ''
      }
    }
  },
  computed: {
    ...mapGetters(['enums'])
  },
  methods: {
    // 审批
    submit(statucs) {
      const examineDTO = {
        applyCode: this.examineDTO.objectCode,
        comment: '',
        status: statucs
      }
      this.loading = true
      auditCommit(examineDTO).then((res) => {
        this.loading = false
        this.detailDialogVisible = false
        this.$emit('update')
        this.$message.success(res.message)
      })
    },
    show(auditDetail) {
      this.examineDTO.objectCode = auditDetail.objectCode
      this.detailDialogVisible = true
      this.getInfos(auditDetail.objectCode)
    },
    getInfos(data) {
      console.log(data)
      this.loading = true
      getDetail(data)
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
