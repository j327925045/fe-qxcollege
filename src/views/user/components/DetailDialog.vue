<template>
  <el-dialog title="医生信息" width="860px" :visible.sync="detailDialogVisible">
    <el-descriptions>
      <el-descriptions-item label="真实姓名">{{ userDetail.realName }}</el-descriptions-item>
      <el-descriptions-item label="昵称">{{ userDetail.nickname }}</el-descriptions-item>
      <el-descriptions-item label="手机号码">{{ userDetail.phone }}</el-descriptions-item>
      <el-descriptions-item label="医生省市">{{ userDetail.regionFullName }}</el-descriptions-item>
      <el-descriptions-item label="医院">{{ userDetail.realHospitalName }}</el-descriptions-item>
      <el-descriptions-item label="科室">{{ userDetail.realDepartment }}</el-descriptions-item>
      <el-descriptions-item label="职称">
        <!-- todo realJobTitle应该返回字符串 这里返回的数据字段类型有问题 -->
        {{ getLabelByValue('jobTitle', userDetail.realJobTitle+'') }}
      </el-descriptions-item>
      <el-descriptions-item label="出生日期">
        {{ moment(userDetail.birthday).format('YYYY-MM-DD') }}
      </el-descriptions-item>
    </el-descriptions>

    <div slot="footer">
      <el-button type="primary" @click="detailDialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import utils from '@/utils/utils'

export default {
  name: 'DetailDialog',
  data() {
    return {
      moment,
      detailDialogVisible: false,
      userDetail: {}
    }
  },
  computed: {
    ...mapGetters(['enums'])
  },
  methods: {
    show(userDetail) {
      this.detailDialogVisible = true
      this.userDetail = userDetail
    },
    getLabelByValue(key, value) {
      const item = utils.getOptionsItemByValue(key, value)
      return item.label || ''
    }
  }
}
</script>
