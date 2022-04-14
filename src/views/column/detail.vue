<template>
  <ImWrapper>
    <div slot="header" class="bg-white rounded p-6 mt-2">
      <div class="header-container">
        <span class="header-text">专栏编号:{{ details.columnNumber }}</span>
        <div>
          <el-button @click="deleteItem">删 除</el-button>
          <el-button type="primary" @click="editItem">编 辑</el-button>
        </div>
      </div>
    </div>

    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">专栏信息</span>
      </div>
      <el-descriptions size="medium" label-class-name="descriptionLabelClass">
        <el-descriptions-item label="创建来源">{{ getLabelByValue('columnCreateSource', details.createSource) }}</el-descriptions-item>
        <el-descriptions-item label="创建人">{{ details.createBy }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ getDateTime(details.createTime) }}</el-descriptions-item>
        <el-descriptions-item :span="3" label="上架状态">
          {{ getLabelByValue('columnStatus', details.status) }}
        </el-descriptions-item>
        <el-descriptions-item :span="3" label="专栏封面">
          <img v-if="details.coverUrl" class="imageClass" :src="details.coverUrl" alt="" />
        </el-descriptions-item>
        <el-descriptions-item :span="3" label="专栏标题">{{ details.title || '-' }}</el-descriptions-item>
        <el-descriptions-item :span="3" label="专栏简介">{{ details.introduction || '-' }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">收录课程</span>
      </div>
      <ImTable :loading="loading" :table="tableConfig"></ImTable>
    </el-card>
  </ImWrapper>
</template>

<script>
import { getColumnDetail, deleteColumnItem, getColumnCourseList } from '@/api/column'
import moment from 'moment'
import { mapGetters } from 'vuex'
import utils from '@/utils/utils'

export default {
  name: 'ColumnDetail--nocache',
  data() {
    return {
      details: {},
      objectCode: this.$route.query.objectCode,
      loading: false
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
            prop: 'courseNum',
            label: '课程编号',
            attrs: {
              fixed: 'left',
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'title',
            label: '课程标题',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'videoTimeLen',
            label: '视频时长',
            type: 'customFilter',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            filter(val, row) {
              return val || '-'
            }
          },
          {
            prop: 'authorName',
            label: '视频作者',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'courseType',
            label: '视频分类',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this.enums.courseType
          },
          {
            prop: 'userLevel',
            label: '用户等级要求',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this.enums.doctorLevel
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
      this.$router.push({ name: 'UserDetail', query: { objectCode: objectCode } })
    },
    getLabelByValue(key, value) {
      const item = utils.getOptionsItemByValue(key, value)
      return item.label || ''
    },

    getDateTime(date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },

    getItemDetail() {
      getColumnDetail({ objectCode: this.objectCode }).then((res) => {
        if (res.code === 200) {
          this.details = res.data || {}
        }
      })
    },

    editItem() {
      this.$router.push({ name: 'ColumnAddOrEdit', query: { objectCode: this.objectCode } })
    },

    deleteItem($index, record) {
      this.$confirm('确定要删除该项吗？', '提示', {
        type: 'warning',
        customClass: 'deleteConfirm',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          deleteColumnItem({ objectCode: this.objectCode }).then((res) => {
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
      this.$router.replace({ name: 'ColumnList' })
    },

    getList() {
      const params = {
        objectCode: this.objectCode
      }
      this.loading = true
      getColumnCourseList(params)
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
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
