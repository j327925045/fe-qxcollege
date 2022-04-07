<template>
  <el-dialog title="产品信息" width="860px" :visible.sync="detailDialogVisible">
    <el-descriptions>

      <el-descriptions-item label="项目名称">{{ productDetail.name }}</el-descriptions-item>
      <el-descriptions-item label="项目编号">{{ productDetail.projectCode }}</el-descriptions-item>
      <el-descriptions-item label="项目数量">{{ productDetail.productCount }}</el-descriptions-item>
      <el-descriptions-item label="项目明细">{{ productDetail.projectDeteils }}</el-descriptions-item>
      <el-descriptions-item label="项目介绍">{{ productDetail.projectIntroduce }}</el-descriptions-item>
      <el-descriptions-item label="项目图片">
        <el-avatar style="transform: translate(0, -10px)" size="medium" :src=" productDetail.projectPictureUrl"></el-avatar>
      </el-descriptions-item>
      <el-descriptions-item label="产品集合">
        <el-tag v-for="item,index in productDetail.projectProductList" :key="index" size="small">{{ item.productCode }}</el-tag>
      </el-descriptions-item>
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
      console.log(productDetail)
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
