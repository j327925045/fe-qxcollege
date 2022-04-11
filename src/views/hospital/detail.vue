<template>
  <ImWrapper>
    <div slot="header" class="bg-white rounded p-6 mt-2">
      <div class="header-container">
        <span class="header-text">机构编号:{{ details.orgCode }}</span>
        <div>
          <el-button @click="deleteItem">删 除</el-button>
          <el-button type="primary" @click="editItem">编 辑</el-button>
        </div>
      </div>
    </div>

    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">机构信息</span>
      </div>
      <el-descriptions size="medium" label-class-name="descriptionLabelClass">
        <el-descriptions-item label="机构名称">{{ details.name }}</el-descriptions-item>
        <el-descriptions-item label="机构性质">
          {{ getLabelByValue('hospitalNature', details.nature) }}
        </el-descriptions-item>
        <el-descriptions-item label="成立时间">{{ getDate(details.establishedTime) }}</el-descriptions-item>
        <el-descriptions-item label="所在城市">{{ details.regionFullName }}</el-descriptions-item>
        <el-descriptions-item label="机构地址">{{ details.location }}</el-descriptions-item>
        <el-descriptions-item label="所属集团">{{ details.organizationName }}</el-descriptions-item>
        <el-descriptions-item label="联系人姓名">{{ details.contactName }}</el-descriptions-item>
        <el-descriptions-item label="联系人电话">{{ details.contactPhone }}</el-descriptions-item>
        <el-descriptions-item label="销售对接人">{{ details.salesCounterpartName }}</el-descriptions-item>
        <el-descriptions-item label="机构图片">
          <img v-if="details.orgPictureUrl" class="imageClass" :src="details.orgPictureUrl" alt="" />
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">资质信息</span>
      </div>
      <el-descriptions size="medium" label-class-name="descriptionLabelClass">
        <el-descriptions-item label="医疗解构许可证">
          <img v-if="details.licencePictureUrl" class="imageClass" :src="details.licencePictureUrl" alt="" />
        </el-descriptions-item>
        <el-descriptions-item label="登记号">{{ details.registrationNo==0?"":details.registrationNo }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">医生信息</span>
      </div>
      <ImTable :loading="loading" :table="tableConfig"></ImTable>
      <div class="mt-4 text-right">
        <ImPagination ref="ImPagination" :page-size.sync="pageSize" :current-page.sync="currentPage" :total="total" @change="getList"></ImPagination>
      </div>
    </el-card>
  </ImWrapper>
</template>

<script>
import { getHospitalDetail, deleteHospitalItem, getTabhList } from '@/api/hospital'
import moment from 'moment'
import { mapGetters } from 'vuex'
import utils from '@/utils/utils'

export default {
  name: 'HospitalDetail--nocache',
  data() {
    return {
      details: {},
      objectCode: this.$route.query.objectCode,
      loading: false,
      currentPage: 1,
      pageSize: 10,
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
            prop: 'doctorNumber',
            label: '医生编号',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'realName',
            label: '医生姓名',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'realDepartment',
            label: '科室',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this?.enums?.realDepartment ?? []
          },
          {
            prop: 'realJobTitle',
            label: '职称',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this?.enums?.jobTitle ?? []
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
    getLabelByValue(key, value) {
      const item = utils.getOptionsItemByValue(key, value)
      return item.label || ''
    },

    getDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },

    getItemDetail() {
      getHospitalDetail({ objectCode: this.objectCode }).then((res) => {
        if (res.code === 200) {
          this.details = res.data || {}
        }
      })
    },

    editItem() {
      this.$router.push({ name: 'HospitalAddOrEdit', query: { objectCode: this.objectCode } })
    },

    deleteItem($index, record) {
      this.$confirm('确定要删除该项吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          deleteHospitalItem({ objectCode: this.objectCode }).then((res) => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.goListPage()
            } else {
              this.$message.error(res.message)
            }
          })
        })
        .catch(() => {})
    },

    goListPage() {
      this.$router.replace({ name: 'HospitalList' })
    },

    getList() {
      const params = {
        page: this.currentPage,
        limit: this.pageSize,
        hospitalCode: this.objectCode
      }
      this.loading = true
      getTabhList(params)
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
  }
}

/deep/ .descriptionLabelClass {
  justify-content: right;
  width: 120px;
  margin-bottom: 24px;
}
</style>
