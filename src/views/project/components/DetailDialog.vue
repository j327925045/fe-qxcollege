<template>
  <el-dialog title="项目信息" width="860px" :visible.sync="detailDialogVisible">
    <el-descriptions>

      <el-descriptions-item label="项目名称">{{ productDetail.name }}</el-descriptions-item>
      <el-descriptions-item label="项目编号">{{ productDetail.projectCode }}</el-descriptions-item>
      <el-descriptions-item label="产品数量">{{ productDetail.productCount }}</el-descriptions-item>
      <el-descriptions-item label="项目明细">{{ productDetail.projectDeteils }}</el-descriptions-item>
      <el-descriptions-item label="项目介绍">{{ productDetail.projectIntroduce }}</el-descriptions-item>
      <el-descriptions-item label="项目图片">
        <el-avatar style="transform: translate(0, -10px)" size="medium" :src=" productDetail.projectPictureUrl"></el-avatar>
      </el-descriptions-item>
      <el-descriptions-item label="产品集合">
        <ul>
          <li v-for="item,index in productDetail.projectProductList" :key="index">
            <el-tag :key="index" size="small" style="display:block">{{ item }}</el-tag>
          </li>
        </ul>
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

import { getProjectDetail } from '@/api/project'
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
  created() {

  },
  methods: {
    /**
     * 获取详情
     */
    getItemDetail(objectCode) {
      getProjectDetail({ objectCode: objectCode }).then(res => {
        if (res.code === 200) {
          this.productDetail.projectProductList = res.data.projectProductStrArr
        }
      })
    },
    show(productDetail) {
      this.getItemDetail(productDetail.objectCode)
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
