<template>
  <ImWrapper>
    <div slot="header" class="bg-white rounded p-6 mt-2">
      <div class="header-container">
        <span class="header-text">产品编号:{{ details.productNum }}</span>
        <div>
          <el-button @click="deleteItem">删 除</el-button>
          <el-button type="primary" @click="editItem">编 辑</el-button>
        </div>
      </div>
    </div>

    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">产品信息</span>
      </div>
      <el-descriptions size="medium" label-class-name="descriptionLabelClass">
        <el-descriptions-item label="产品名称">{{ details.name || '-' }}</el-descriptions-item>
        <el-descriptions-item label="规格">
          {{ details.skuId || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="业务类型">
          {{ getLabelByValue('businessType', details.businessType) }}
        </el-descriptions-item>
        <el-descriptions-item label="材料类别">
          {{ getLabelByValue('category', details.category) }}
        </el-descriptions-item>
        <el-descriptions-item label="产品类型">
          {{ getLabelByValue('type', details.type) }}
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions size="medium" label-class-name="descriptionLabelClass">

        <el-descriptions-item :span="3" label="产品介绍">
          {{ details.indication || '' }}
        </el-descriptions-item>
        <el-descriptions-item :span="3" label="产品图片">
          <img class="imageClass" :src="details.imageUrl" alt="" />
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">关联项目</span>
      </div>
      <ImTable :loading="loading" :table="tableConfig">
        <template slot="projectCode" slot-scope="scope">
          <el-button type="text" style="font-size:14px" @click="viewProjectDetail(scope.row.objectCode)">{{ scope.row.projectCode }}</el-button>
        </template>
      </ImTable>
      <ImPagination ref="ImPagination" :page-size.sync="pageSize" :current-page.sync="currentPage" :total="total" @change="getList"></ImPagination>
    </el-card>
  </ImWrapper>
</template>

<script>
import { getProductDetail, deleteProductItem } from '@/api/product'
import { getProjectList } from '@/api/project'
import moment from 'moment'
import { mapGetters } from 'vuex'
import utils from '@/utils/utils'

export default {
  name: 'ProductDetail--nocache',
  data() {
    return {
      details: {},
      objectCode: this.$route.query.objectCode,
      loading: false,
      pageSize: 10,
      currentPage: 1,
      total: 0
    }
  },
  computed: {
    ...mapGetters(['enums']),
    // 之所以把tableConfig放在计算属性里边，是因为里边用到了enums计算属性，enums是异步获取
    tableConfig() {
      return {
        data: [],
        tableItems: [
          {
            prop: 'projectCode',
            label: '项目编号',
            type: 'slot',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            slot: 'projectCode'
          },
          {
            prop: 'name',
            label: '项目名称',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'createTime',
            label: '创建时间',
            type: 'customFilter',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            filter(val) {
              return moment(val).format('YYYY-MM-DD HH:mm:ss')
            }
          },
          {
            prop: 'updateTime',
            label: '更新时间',
            type: 'customFilter',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            filter(val) {
              return moment(val).format('YYYY-MM-DD HH:mm:ss')
            }
          }
        ]
      }
    }
  },
  created() {
    this.getItemDetail()
    this.getList()
  },
  methods: {
    viewProjectDetail(objectCode) {
      this.$router.push({ name: 'ProjectDetail', query: { objectCode } })
    },

    getLabelByValue(key, value) {
      const item = utils.getOptionsItemByValue(key, value)
      return item.label || ''
    },

    getDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },

    getItemDetail() {
      getProductDetail({ objectCode: this.objectCode }).then((res) => {
        if (res.code === 200) {
          this.details = res.data || {}
        }
      })
    },

    editItem() {
      this.$router.push({ name: 'ProductAddOrEdit', query: { objectCode: this.objectCode } })
    },

    deleteItem($index, record) {
      this.$confirm('确定要删除该项吗？', '提示', {
        type: 'warning',
        customClass: 'deleteConfirm',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          deleteProductItem({ objectCode: this.objectCode }).then((res) => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.goListPage()
            } else {
              this.$message.error(res.message)
            }
          })
        })
        .catch(() => {
        })
    },

    goListPage() {
      this.$router.replace({ name: 'ProductList' })
    },
    onslotClick(objectCode) {
      this.$router.push({ name: 'ProjectDetail', query: { objectCode: objectCode } })
    },
    getList() {
      const params = {
        page: this.currentPage,
        limit: this.pageSize,
        productCode: this.objectCode
      }
      this.loading = true
      getProjectList(params)
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.total = res.data.totalCount
            this.tableConfig.data = res.data.list || []
          }
        })
        .catch((_) => {
          this.loading = false
        })
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
    border: 1px solid #ccc;
  }
}

/deep/ .descriptionLabelClass {
  justify-content: right;
  width: 120px;
  margin-bottom: 24px;
}

/deep/ .el-descriptions-item__label {
  padding-bottom: 10px;
  font-weight: bold;
}
</style>
