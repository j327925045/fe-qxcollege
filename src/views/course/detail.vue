<template>
  <ImWrapper>
    <div slot="header" class="bg-white rounded p-6 mt-2">
      <div class="header-container">
        <span class="header-text">课程编号:{{ details.courseNum }}</span>
        <div>
          <el-button @click="deleteItem">删 除</el-button>
          <el-button type="primary" @click="editItem">编 辑</el-button>
        </div>
      </div>
    </div>

    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">课程信息</span>
      </div>
      <el-descriptions size="medium" label-class-name="descriptionLabelClass">
        <el-descriptions-item label="课程时长">{{ details.videoTimeLen || '-' }}</el-descriptions-item>
        <el-descriptions-item label="视频类型">{{ getLabelByValue('videoType', details.videoType) }}</el-descriptions-item>
        <el-descriptions-item label="课程作者">{{ details.authorName }}</el-descriptions-item>
        <el-descriptions-item label="上架状态">{{ getLabelByValue('courseShelfStatus', details.shelfStatus) }}</el-descriptions-item>
        <el-descriptions-item label="创建人">{{ details.createBy }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ getDateTime(details.createTime) }}</el-descriptions-item>
        <el-descriptions-item :span="3" label="审核状态">{{ getLabelByValue('courseAuditStatus', details.status) }}</el-descriptions-item>
        <el-descriptions-item :span="3" label="课程封面">
          <img v-if="details.coverUrl" class="imageClass" :src="details.coverUrl" alt="" />
        </el-descriptions-item>
        <el-descriptions-item v-if="getMeterial(details.materials)" :span="3" label="课程视频">
          <img class="imageClass" :src="getMeterial(details.materials).coverUrl" alt="" @click="playVideo(getMeterial(details.materials))" />
        </el-descriptions-item>
        <el-descriptions-item :span="3" label="课程标题">
          {{ details.title }}
        </el-descriptions-item>
        <el-descriptions-item :span="3" label="课程简介">
          {{ details.summary }}
        </el-descriptions-item>
        <el-descriptions-item :span="3" label="课程介绍">
          <div class="__RichTextArea" v-html="details.introduction"></div>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">内容属性</span>
      </div>
      <el-descriptions size="medium" label-class-name="descriptionLabelClass">
        <el-descriptions-item label="课程分类">
          {{ details.courseType }}
        </el-descriptions-item>
        <el-descriptions-item label="关联产品">
          {{ getNames(details.courseProducts) }}
        </el-descriptions-item>
        <el-descriptions-item label="关联项目">
          {{ getNames(details.courseProjects) }}
        </el-descriptions-item>
        <el-descriptions-item label="分区">
          {{ getLabelByValue('coursePartition', details.partition) }}
        </el-descriptions-item>
        <el-descriptions-item label="部位">
          {{ getLabelByValue('coursePosition', details.position) }}
        </el-descriptions-item>
        <el-descriptions-item label="适应症">
          {{ getLabelByValue('courseIndication', details.indication) }}
        </el-descriptions-item>
        <el-descriptions-item label="并发症">
          {{ getLabelByValue('courseComplication', details.complication) }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">观看限制</span>
      </div>
      <el-descriptions size="medium" label-class-name="descriptionLabelClass">
        <el-descriptions-item label="课程分级">
          {{ getLabelByValue('courseLevel', details.courseLevel) }}
        </el-descriptions-item>
        <el-descriptions-item label="用户等级要求">
          {{ getLabelByValue('doctorLevel', details.userLevel) }}
        </el-descriptions-item>
        <el-descriptions-item label="付费类型">
          {{ getLabelByValue('paymentType', details.paymentType) }}
        </el-descriptions-item>
        <el-descriptions-item label="积分数值">
          {{ details.price }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">关联专栏</span>
      </div>
      <ImTable :loading="columnLoading" :table="columnTableConfig"></ImTable>
    </el-card>

    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">课程评论</span>
      </div>
      <ImTable :loading="commentLoading" :table="commitTableConfig"></ImTable>
      <ImPagination ref="ImPagination" :page-size.sync="pageSize" :current-page.sync="currentPage" :total="total" @change="getCommentList"></ImPagination>
    </el-card>
    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">课程数据</span>
      </div>
      <el-descriptions size="medium" label-class-name="descriptionLabelClass">
        <el-descriptions-item label="观看次数">
          {{ details.viewCount }}
        </el-descriptions-item>
        <el-descriptions-item label="观看人数">
          {{ details.viewUserCnt }}
        </el-descriptions-item>
        <el-descriptions-item label="收藏数">
          {{ details.collectCount }}
        </el-descriptions-item>
        <el-descriptions-item label="点赞数">
          {{ details.starCount }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <VideoPlayer ref="VideoPlayer"></VideoPlayer>
  </ImWrapper>
</template>

<script>
import { getCourseDetail, deleteCourseItem, getCourseColumnList } from '@/api/course'
import { getCommentList } from '@/api/coursecomment'
import moment from 'moment'
import { mapGetters } from 'vuex'
import utils from '@/utils/utils'
import VideoPlayer from '@/views/components/VideoPlayer'

export default {
  name: 'CourseDetail--nocache',
  components: {
    VideoPlayer
  },
  data() {
    return {
      details: {},
      objectCode: this.$route.query.objectCode,
      columnLoading: false,
      commentLoading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  computed: {
    ...mapGetters(['enums']),
    // 之所以把tableConfig放在计算属性里边，是因为里边用到了enums计算属性，enums是异步获取
    columnTableConfig() {
      return {
        data: [],
        tableItems: [
          {
            prop: 'columnNumber',
            label: '专栏编号',
            attrs: {
              fixed: 'left',
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'title',
            label: '专栏标题',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '180'
            }
          },
          {
            prop: 'createBy',
            label: '创建人',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '180'
            }
          },
          {
            prop: 'createTimeStr',
            label: '创建时间',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '180'
            }
          },
          {
            prop: 'status',
            label: '上架状态',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this.enums.columnStatus // 1上架 2下架
          }
        ]
      }
    },
    commitTableConfig() {
      return {
        data: [],
        tableItems: []
      }
    }
  },
  created() {
    this.getItemDetail()
    this.getColumnList()
    this.getCommentList()
  },
  methods: {
    playVideo(record) {
      this.$refs.VideoPlayer.play(record.fileUrl, record.coverUrl)
    },

    getMeterial(meterials) {
      let item = null
      if (meterials && meterials.length > 0) {
        item = meterials[0]
      }
      return item
    },

    getNames(objArr) {
      if (!objArr) {
        return '-'
      }
      const result = objArr.map((item) => item.name)
      return result.join(',')
    },

    getLabelByValue(key, value) {
      const item = utils.getOptionsItemByValue(key, value)
      return item.label || '-'
    },

    getDateTime(date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },

    getItemDetail() {
      getCourseDetail({ objectCode: this.objectCode }).then((res) => {
        if (res.code === 200) {
          console.log('res', res)
          this.details = res.data || {}
        }
      })
    },

    editItem() {
      this.$router.push({ name: 'CourseAddOrEdit', query: { objectCode: this.objectCode } })
    },

    deleteItem($index, record) {
      this.$confirm('确定要删除该项吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          deleteCourseItem({ objectCode: this.objectCode }).then((res) => {
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
      this.$router.replace({ name: 'CourseList' })
    },

    getColumnList() {
      const params = {
        objectCode: this.objectCode
      }
      this.columnLoading = true
      getCourseColumnList(params)
        .then((res) => {
          this.columnLoading = false
          if (res.code === 200) {
            this.columnTableConfig.data = res.data || []
          }
        })
        .catch((_) => {
          this.columnLoading = false
        })
    },

    getCommentList() {
      const params = {
        page: 1,
        limit: 10,
        courseCode: this.objectCode
      }
      getCommentList(params).then((res) => {
        if (res.code === 200) {
          this.total = res.data.totalCount
          this.commitTableConfig.data = res.data.list || []
        }
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
    cursor: pointer;
  }
}

/deep/ .descriptionLabelClass {
  justify-content: right;
  width: 120px;
  margin-bottom: 24px;
}

/deep/ .__RichTextArea {
  width: 100%;
  max-height: 300px;
  padding: 16px;
  overflow: auto;
  border: 2px solid gray;

  //标题
  h1 {
    margin: 0.67em 0;
    color: red;
    font-size: 2em;
  }

  h2 {
    margin: 0.75em 0;
    font-size: 1.5em;
  }

  h3 {
    margin: 0.83em 0;
    font-size: 1.17em;
  }

  h4 {
    margin: 1.12em 0;
  }

  h5 {
    margin: 1.5em 0;
    font-size: 0.83em;
  }

  h6 {
    margin: 1.67em 0;
    font-size: 0.75em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  b,
  strong {
    font-weight: bolder;
  }

  ul,
  ul li {
    list-style-position: inside;
    list-style-type: disc;
  }

  ol,
  ol li {
    list-style-position: inside;
    list-style-type: decimal;
  }

  em {
    font-style: italic;
  }
}
</style>
