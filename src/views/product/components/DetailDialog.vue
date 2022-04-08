<template>
  <el-dialog title="产品信息" width="860px" :visible.sync="detailDialogVisible">
    <el-descriptions size="medium">
      <el-descriptions-item label="产品名称">
        {{ productDetail.name }}
      </el-descriptions-item>
      <el-descriptions-item label="业务类型">
        {{ getLabelByValue('businessType', productDetail.businessType) }}
      </el-descriptions-item>
      <el-descriptions-item label="材料类别">
        {{ getLabelByValue('category', productDetail.category) }}
      </el-descriptions-item>
      <el-descriptions-item label="产品类型">
        {{ getLabelByValue('type', productDetail.type) }}
      </el-descriptions-item>
      <el-descriptions-item label="产品介绍">
        {{ productDetail.indication }}
      </el-descriptions-item>
      <el-descriptions-item label="SKU">
        {{ productDetail.skuId }}
      </el-descriptions-item>
      <el-descriptions-item :column="1" label="产品图片">
        <img class="imageClass" :src="productDetail.imageUrl" alt="" />
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

<style lang="scss" scoped>
.imageClass {
  width: 124px;
  height: 124px;
  border: 1px solid #ccc;
}
</style>
