<template>
  <el-dialog title="审批详情" width="860px" :visible.sync="detailDialogVisible">
    <el-descriptions>
      <el-descriptions-item label="作者">{{ resourcesDetail.author }}</el-descriptions-item>
      <el-descriptions-item label="名称">{{ resourcesDetail.name }} </el-descriptions-item>
      <el-descriptions-item label="简介">{{ resourcesDetail.introduction }}</el-descriptions-item>
      <el-descriptions-item label="素材类型">{{ resourcesDetail.type==1?"视频":"音频" }}</el-descriptions-item>
      <el-descriptions-item label="视频封面">{{ resourcesDetail.coverUrl }}</el-descriptions-item>
    </el-descriptions>

    <div slot="footer">
      <el-button type="primary" @click="submit(1)">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getDetail } from '@/api/resources'

import { mapGetters } from 'vuex'
import moment from 'moment'
import utils from '@/utils/utils'

export default {
  name: 'DetailDialog',
  data() {
    return {
      moment,
      detailDialogVisible: false,
      resourcesDetail: {},
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
    submit() {
      this.detailDialogVisible = false
    },
    show(resourcesDetail) {
      this.examineDTO.objectCode = resourcesDetail.objectCode
      this.detailDialogVisible = true
      this.getInfos(resourcesDetail.objectCode)
    },
    getInfos(data) {
      this.loading = true
      getDetail(data)
        .then((res) => {
          this.loading = false
          this.resourcesDetail = res.data || []
        })
        .catch((_) => {
          this.loading = false
        })
    },
    getLabelByValue(key, value) {
      const item = utils.getOptionsItemByValue(key, value)
      return item.label || ''
    }
  }
}
</script>
