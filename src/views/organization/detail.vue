<template>
  <ImWrapper>
    <div slot="header" class="bg-white rounded p-6 mt-2">
      <div class="header-container">
        <span class="header-text">集团编号:{{ details.groupCode }}</span>
        <div>
          <el-button @click="deleteItem">删 除</el-button>
          <el-button type="primary" @click="editItem">编 辑</el-button>
        </div>
      </div>
    </div>

    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">集团信息</span>
      </div>
      <el-descriptions size="medium" label-class-name="descriptionLabelClass">
        <el-descriptions-item label="集团名称">{{ details.name || '-' }}</el-descriptions-item>
        <el-descriptions-item label="统一社会信用代码">{{ details.socialCreditCode || '-' }}</el-descriptions-item>
        <el-descriptions-item label="集团规模">
          {{ getLabelByValue('organizationScale', details.groupSize) }}
        </el-descriptions-item>
        <el-descriptions-item label="合作方式">
          {{ getLabelByValue('organizationCooperatType', details.cooperationMode) }}
        </el-descriptions-item>
        <el-descriptions-item label="所属经销商">{{ details.dealer || '-' }}</el-descriptions-item>
        <el-descriptions-item label="是否建账">
          {{ getLabelByValue('organizationIsPrepareAccount', details.whetherAccounts) }}
        </el-descriptions-item>
        <el-descriptions-item label="联系人姓名">{{ details.contactName || '-' }}</el-descriptions-item>
        <el-descriptions-item label="联系人手机号">{{ details.contactPhone || '-' }}</el-descriptions-item>
        <el-descriptions-item label="销售对接人">{{ details.salesCounterpartName || '-' }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">机构信息</span>
      </div>
      <ImTable :loading="loading" :table="tableConfig">
        <template slot="orgCodeSlot" slot-scope="scope">
          <el-button type="text" style="font-size:14px" @click="onslotClick(scope.row.objectCode)">{{ scope.row.orgCode }}</el-button>
        </template>
      </ImTable>
    </el-card>
  </ImWrapper>
</template>

<script>
import { getOrganizationDetail, deleteOrganizationItem, getHospitalsInOrg } from '@/api/organization'
import moment from 'moment'
import { mapGetters } from 'vuex'
import utils from '@/utils/utils'

export default {
  name: 'OrganizationDetail--nocache',
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
            label: '机构编号',
            attrs: {
              fixed: 'left',
              minWidth: '120'
            },
            slot: 'orgCodeSlot'
          },
          {
            prop: 'name',
            label: '机构名称',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'regionFullName',
            label: '所在城市',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
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
    onslotClick(objectCode) {
      this.$router.push({ name: 'HospitalDetail', query: { objectCode: objectCode } })
    },
    getLabelByValue(key, value) {
      const item = utils.getOptionsItemByValue(key, value)
      return item.label || ''
    },

    getDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },

    getItemDetail() {
      getOrganizationDetail({ objectCode: this.objectCode }).then((res) => {
        if (res.code === 200) {
          this.details = res.data || {}
        }
      })
    },

    editItem() {
      this.$router.push({ name: 'OrganizationAddOrEdit', query: { objectCode: this.objectCode } })
    },

    deleteItem($index, record) {
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
            deleteOrganizationItem({ objectCode: this.objectCode }).then((res) => {
              if (res.code === 200) {
                this.$message.success('操作成功！')
                this.goListPage()
              } else {
                this.$message.error(res.message)
              }
            })
          }
        })
        .catch(() => {})
    },

    goListPage() {
      this.$router.replace({ name: 'OrganizationList' })
    },

    getList() {
      const params = {
        objectCode: this.objectCode
      }
      this.loading = true
      getHospitalsInOrg(params)
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.total = res.data.totalCount
            this.tableConfig.data = res.data || []
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
