<template>
  <el-dialog title="员工信息" width="820px" :visible.sync="detailDialogVisible">
    <el-descriptions size="medium">
      <el-descriptions-item label="员工姓名">{{ employDetail.name }}</el-descriptions-item>
      <el-descriptions-item label="员工性别">{{ getLabelByValue('gender',employDetail.gender) }}</el-descriptions-item>
      <el-descriptions-item label="员工头像">
        <el-avatar style="transform: translate(0, -10px)" size="medium" :src="employDetail.avatar"></el-avatar>
      </el-descriptions-item>
      <el-descriptions-item label="账号（手机号）">{{ employDetail.account }}</el-descriptions-item>
      <el-descriptions-item label="员工性质">{{ getLabelByValue('employeeNature', employDetail.nature) }}</el-descriptions-item>
      <el-descriptions-item label="员工状态">{{ getLabelByValue('employeeStatus', employDetail.status) }}</el-descriptions-item>
    </el-descriptions>

    <div slot="footer">
      <el-button type="primary" @click="detailDialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import utils from '@/utils/utils'

export default {
  name: 'DetailDialog',
  data() {
    return {
      detailDialogVisible: false,
      employDetail: {}
    }
  },
  computed: {
    ...mapGetters(['enums'])
  },
  methods: {
    show(employDetail) {
      this.detailDialogVisible = true
      this.employDetail = employDetail
    },
    getLabelByValue(key, value) {
      const item = utils.getOptionsItemByValue(key, value)
      return item.label || ''
    }
  }
}
</script>
