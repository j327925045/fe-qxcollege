<template>
  <ImWrapper>
    <div slot="header" class="bg-white rounded p-6 mt-2">
      <div class="header-container">
        <span class="header-text">项目编号:{{ productDetail.projectCode }}</span>
        <div>
          <el-button @click="deleteItem">删 除</el-button>
          <el-button type="primary" @click="editItem">编 辑</el-button>
        </div>
      </div>
    </div>
    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">项目信息</span>
      </div>
      <el-descriptions :column="1" size="medium">

        <el-descriptions-item label="项目名称"><span class="projectName">{{ productDetail.name }}</span></el-descriptions-item>
        <el-descriptions-item label="项目编号"><span class="projectText">{{ productDetail.projectCode }}</span></el-descriptions-item>
        <el-descriptions-item label="产品数量"><span class="projectText">{{ projectProductCodeArrLength }}</span></el-descriptions-item>
        <el-descriptions-item label="项目明细"><span class="projectText">{{ productDetail.projectDeteils }}</span></el-descriptions-item>

        <el-descriptions-item label="产品集合">
          <div>
            <span v-for="item,index in productDetail.projectProductList" :key="index">
              <el-tag :key="index" size="small">{{ item }}</el-tag>
            </span>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="项目图片">
          <img v-if="productDetail.projectPictureUrl" class="imageClass" :src="productDetail.projectPictureUrl" alt="">
        </el-descriptions-item>
        <el-descriptions-item label="项目介绍">
          <div v-html="productDetail.projectIntroduce"></div>
        </el-descriptions-item>

      </el-descriptions>

      <div slot="footer">
        <el-button type="primary" @click="detailDialogVisible = false">确 定</el-button>
      </div>
    </el-card>
  </ImWrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import utils from '@/utils/utils'

import { deleteProjectItem, getProjectDetail } from '@/api/project'
export default {
  name: 'ProjectDetail',
  data() {
    return {
      moment,
      objectCode: this.$route.query.objectCode,
      detailDialogVisible: false,
      productDetail: {},
      projectProductCodeArrLength: ''
    }
  },
  computed: {
    ...mapGetters(['enums'])
  },
  activated() {
    this.getItemDetail()
  },
  methods: {
    /**
     * 获取详情
     */
    getItemDetail() {
      getProjectDetail({ objectCode: this.$route.query.objectCode }).then(res => {
        if (res.code === 200) {
          this.productDetail = res.data
          this.productDetail.projectProductList = res.data.projectProductArr
          this.projectProductCodeArrLength = this.productDetail.projectProductCodeArr.length
        }
      })
    },
    getLabelByValue(key, value) {
      const item = utils.getOptionsItemByValue(key, value)
      return item.label || ''
    },
    deleteItem($index, record) {
      console.log(record)
      this.$confirm('确定要删除该项吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          // if (this.tableConfig.data.length > 0) {
          //   this.$message.error('该项目下有机构 ，不允许删除。')
          // } else {
          deleteProjectItem({ objectCode: this.objectCode }).then((res) => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.goListPage()
            } else {
              this.$message.error(res.message)
            }
          })
          // }
        })
        .catch(() => {})
    },

    goListPage() {
      this.$router.replace({ name: 'ProjectList' })
    },
    editItem($index, record) {
      this.$router.push({ name: 'ProjectAddOrEdit', query: { objectCode: this.productDetail.objectCode } })
    }
  }
}
</script>
<style lang="scss" scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-text {
    color: #000;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
}

.box-card {
  margin-bottom: 16px;

  .headertext {
    color: #000;
    font-weight: 600;
    font-size: 16px;
  }

  .imageClass {
    width: 124px;
    height: 124px;
  }

  .projectName{
    font-weight: 500;
  }

  .projectText{
    font-size: 14px;
  }
}

/deep/.el-descriptions-item__label{
  font-weight: bold;
  padding-bottom: 10px;
}

/deep/.el-tag{
  margin-right: 5px;
}

</style>
