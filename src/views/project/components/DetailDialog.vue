<template>
  <el-dialog title="产品信息" width="860px" :visible.sync="detailDialogVisible">
    <el-descriptions>
      <el-descriptions-item label="品牌code">
        {{ getLabelByValue('brandCode', productDetail.brandCode+'') }}

      </el-descriptions-item>
      <el-descriptions-item label="业务类型">
        {{ getLabelByValue('businessType', productDetail.businessType+'') }}

      </el-descriptions-item>
      <el-descriptions-item label="材料类别">
        {{ getLabelByValue('category', productDetail.category+'') }}

      </el-descriptions-item>
      <el-descriptions-item label="产品图URL">{{ productDetail.imageUrl }}</el-descriptions-item>
      <el-descriptions-item label="适应症">{{ productDetail.indication }}</el-descriptions-item>
      <el-descriptions-item label="设备级别">
        {{ getLabelByValue('level', productDetail.level+'') }}

      </el-descriptions-item>
      <el-descriptions-item label="名称">{{ productDetail.name }}</el-descriptions-item>
      <!-- <el-descriptions-item label="职称">
         todo realJobTitle应该返回字符串 这里返回的数据字段类型有问题
        {{ getLabelByValue('jobTitle', productDetail.realJobTitle+'') }}
      </el-descriptions-item>
      <el-descriptions-item label="出生日期">
        {{ moment(productDetail.birthday).format('YYYY-MM-DD') }}
      </el-descriptions-item> -->
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
      productDetail: {}
    }
  },
  computed: {
    ...mapGetters(['enums'])
  },
  methods: {
    show(productDetail) {
      this.detailDialogVisible = true
      this.productDetail = productDetail
    },
    getLabelByValue(key, value) {
      const item = utils.getOptionsItemByValue(key, value)
      return item.label || ''
    }
  }
}
</script>
