<template>
  <el-dialog title="员工信息" width="860px" :visible.sync="detailDialogVisible">
    <div class="flex" style="padding-top: 24px;">
      <div class="avatar">
        <el-avatar :size="120" :src="employDetail.avatar"></el-avatar>
      </div>
      <div class="flex-fill">
        <div class="user-title">
          <span class="item-title">{{ employDetail.name }}</span>
          <GenderShow :gender="employDetail.gender" class="gender"></GenderShow>
        </div>
        <div class="user-item">
          <span class="item-title">账号(手机号):</span> {{ employDetail.account }}
        </div>
        <div class="user-item">
          <span class="item-title">员工性质:</span>
          {{ getLabelByValue('employeeNature', employDetail.nature) }}
        </div>
        <div class="user-item">
          <span class="item-title">员工状态:</span>
          <span v-if="employDetail.status==1" style="position: absolute;top:-2px;color:#52C41A;font-size: 50px">·</span>
          <span v-if="employDetail.status==2" style="position: absolute;top:-2px;color:#E1251B;font-size: 50px">·</span>
          <span style="padding-left: 13px;">{{ getLabelByValue('employeeStatus', employDetail.status) }}</span>
        </div>
      </div>
    </div>

    <div slot="footer">
      <el-button type="primary" @click="detailDialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {mapGetters} from 'vuex'
import utils from '@/utils/utils'
import GenderShow from '@/views/components/GenderShow'

export default {
  name: 'DetailDialog',
  components: {
    GenderShow
  },
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

<style lang="scss" scoped>
::v-deep {
  .el-dialog__header {
    border-bottom: 1px solid #E4E7ED;
  }
}

.flex {
  display: flex;

  .avatar {
    padding-right: 46px;
    padding-left: 16px;
  }

  .flex-fill {
    flex: 1;

    .user-title {
      font-size: 24px;
      font-weight: 500;
      color: #000000;
      line-height: 21px;

      .gender {
        padding-left: 10px;
        display: inline-block;
      }
    }

    .user-item {
      position: relative;
      font-size: 14px;
      font-weight: 500;
      color: #000000;
      line-height: 21px;
      margin-top: 24px;

      .item-title {
        padding-right: 8px;
      }
    }
  }
}
</style>
