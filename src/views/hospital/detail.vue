<template>
  <ImWrapper>
    <div slot="header" class="bg-white rounded p-6 mt-2">
      <div class="header-container">
        <span class="header-text">机构编号: {{ details.orgCode }}</span>
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
        <el-descriptions-item label="成立时间">{{ details.establishedTime ? getDate(details.establishedTime) : '-' }}</el-descriptions-item>
        <el-descriptions-item label="所在城市">{{ details.regionFullName || '-' }}</el-descriptions-item>
        <el-descriptions-item label="机构地址">{{ details.location || '-' }}</el-descriptions-item>
        <el-descriptions-item label="所属集团">
          <a type="text" href="javascript:;" size="medium" style="color:#005dbe;" @click="viewOrgItem(details.organizationCode)">{{ details.organizationName || '-' }}</a>
        </el-descriptions-item>
        <el-descriptions-item label="联系人姓名">{{ details.contactName || '-' }}</el-descriptions-item>
        <el-descriptions-item label="联系人电话">{{ details.contactPhone || '-' }}</el-descriptions-item>
        <el-descriptions-item label="销售对接人">{{ details.salesCounterpartName || '-' }}</el-descriptions-item>
        <el-descriptions-item label="机构图片">
          <span v-if="!details.orgPictureUrl">-</span>
          <img v-if="details.orgPictureUrl" class="imageClass" :src="details.orgPictureUrl" alt="" />
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">资质信息</span>
      </div>
      <el-descriptions size="medium" label-class-name="descriptionLabelClass">
        <el-descriptions-item>
          <div slot="label">
            <div>医疗机构执业</div>
            <div style="text-align:right">许可证</div>
          </div>
          <span v-if="!details.licencePictureUrl">-</span>
          <img v-if="details.licencePictureUrl" class="imageClass" :src="details.licencePictureUrl" alt="" />
        </el-descriptions-item>
        <el-descriptions-item label="登记号">
          {{ details.registrationNo === '0' ? '-' : details.registrationNo }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">医生信息</span>
      </div>
      <ImTable :loading="loading" :table="tableConfig">
        <template slot="doctorNumberSlot" slot-scope="scope">
          <el-button type="text" size="medium" @click="onslotClick(scope.row.doctorCode)">{{ scope.row.doctorNumber }}</el-button>
        </template>
      </ImTable>
      <ImPagination ref="ImPagination" :page-size.sync="pageSize" :current-page.sync="currentPage" :total="total" @change="getList"></ImPagination>
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
            type: 'slot',
            label: '医生编号',
            attrs: {
              fixed: 'left',
              minWidth: '120'
            },
            slot: 'doctorNumberSlot'
          },
          {
            prop: 'doctorName',
            label: '医生姓名',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'orgDepartment',
            label: '科室',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this?.enums?.realDepartment ?? []
          },
          {
            prop: 'post',
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
    viewOrgItem(objectCode) {
      this.$router.push({ name: 'OrganizationDetail', query: { objectCode } })
    },

    onslotClick(objectCode) {
      this.$router.push({ name: 'UserDetail', query: { objectCode: objectCode } })
    },

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
      console.log(record)
      this.$confirm('确定要删除该项吗？', '提示', {
        type: 'warning',
        customClass: 'deleteConfirm',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          if (this.tableConfig.data.length > 0) {
            this.$message.error('该机构下有医生 ，不允许删除。')
          } else {
            deleteHospitalItem({ objectCode: this.objectCode }).then((res) => {
              if (res.code === 200) {
                this.$message.success('操作成功！')
                this.goListPage()
              } else {
                this.$message.error(res.message)
              }
            })
          }
        })
        .catch(() => {
        })
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

/deep/ .el-descriptions-item__label {
  padding-bottom: 10px;
  font-weight: bold;
}
</style>
