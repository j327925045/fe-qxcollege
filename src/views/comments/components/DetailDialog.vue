<template>
  <el-dialog title="审批" width="260px" :visible.sync="detailDialogVisible" @close="visibleFn">
    <div slot="footer">
      <el-button type="primary" @click="submit(1)">同意</el-button>
      <el-button type="primary" @click="submit(2)">拒绝</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import utils from '@/utils/utils'

import { auditCommentsItem } from '@/api/comments'
export default {
  name: 'DetailDialog',
  data() {
    return {
      moment,
      detailDialogVisible: false,
      auditDetail: [],
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
    submit(status) {
      const data = {
        courseCommentCodeList: this.auditDetail,
        status: status
      }
      this.loading = true
      auditCommentsItem(data).then((res) => {
        this.loading = false
        this.detailDialogVisible = false
        this.$emit('update')
        this.$message.success(res.message)
      })
    },
    show(auditDetail) {
      this.auditDetail = auditDetail
      this.detailDialogVisible = true
    },

    getLabelByValue(key, value) {
      const item = utils.getOptionsItemByValue(key, value)
      return item.label || ''
    },
    visibleFn() {
      this.detailDialogVisible = false
    }
  }
}
</script>
