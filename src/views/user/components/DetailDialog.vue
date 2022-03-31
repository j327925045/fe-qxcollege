<template>
  <el-dialog title="医生信息" width="600px" :visible.sync="detailDialogVisible">
    <el-descriptions>
      <el-descriptions-item label="账号（手机号）">{{ userDetail.account }}</el-descriptions-item>
    </el-descriptions>

    <div slot="footer">
      <el-button type="primary" @click="detailDialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DetailDialog',
  data() {
    return {
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
    }
  }
}
</script>
