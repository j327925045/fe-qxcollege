<template>
  <ImWrapper>
    <ImSearchArea>
      <ImForm ref="ImForm" :form="formConfig">
        <UserSelect slot="UserSelect" v-model="formConfig.props.author" filterable class="w-full"></UserSelect>
        <DictionaryCascader
          slot="DictionaryCascader"
          v-model="formConfig.props.secCourseType"
          sign="courseFirstCategory"
          style="width: 100%"
          :emit-path="false"
          :show-all-levels="true"
        ></DictionaryCascader>
      </ImForm>
    </ImSearchArea>

    <ImTableArea>
      <div class="mb-4">
        <el-button type="primary" @click="addItem">新建课程</el-button>
      </div>
      <ImTable :loading="loading" :table="tableConfig">
        <template slot="courseType" slot-scope="scope">
          <span v-if="!scope.row.courseType || scope.row.courseType.length === 0">-</span>
          <template v-else>
            <div v-for="(item, idx) in scope.row.courseType" :key="idx">{{ item.firName }}-{{ item.secName }}</div>
          </template>
        </template>
        <template slot="duration" slot-scope="scope">
          <span v-if="!getMeterial(scope.row.materials)">-</span>
          <span v-else>{{ getMeterial(scope.row.materials).duration || '-' }}</span>
        </template>
        <template slot="videoType" slot-scope="scope">
          <span v-if="!getMeterial(scope.row.materials)">-</span>
          <span v-else>{{ getVideoType(getMeterial(scope.row.materials).durationType) }}</span>
        </template>
        <template slot="operation" slot-scope="scope">
          <el-button v-if="['1', '2', '3'].includes(scope.row.status)" size="medium" type="text" @click="viewItem(scope.$index, scope.row)">查看</el-button>
          <el-button v-if="scope.row.status===2 && scope.row.shelfStatus==='1'" size="medium" type="text" @click="downItem(scope.$index, scope.row)">下架</el-button>
          <el-button v-if="scope.row.status===2 && scope.row.shelfStatus==='2'" size="medium" type="text" @click="upItem(scope.$index, scope.row)">上架</el-button>
          <el-button v-if="scope.row.status==='0'" size="medium" type="text" @click="editItem(scope.$index, scope.row)">编辑</el-button>
          <el-button v-if="scope.row.status==='0'" size="medium" type="text" @click="submitAudit(scope.$index, scope.row)">提交审核</el-button>
          <el-button v-if="scope.row.status==='1'" size="medium" type="text" @click="startAudit(scope.$index, scope.row)">审核</el-button>
          <el-button size="medium" type="text" @click="deleteItem(scope.$index, scope.row)">删除</el-button>
        </template>
      </ImTable>
      <ImPagination ref="ImPagination" :page-size.sync="pageSize" :current-page.sync="currentPage" :total="total" @change="getList"></ImPagination>
    </ImTableArea>
  </ImWrapper>
</template>

<script>
import {getCourseList, deleteCourseItem, operateCourseShelfStatus, changeCourseStatus} from '@/api/course.js'
import {mapGetters} from 'vuex'
import UserSelect from '@/views/components/UserSelect'
import DictionaryCascader from '@/views/components/DictionaryCascader'

export default {
  name: 'CourseList',
  components: {
    UserSelect,
    DictionaryCascader
  },
  data() {
    return {
      formConfig: {
        column: 3,
        attrs: {
          labelWidth: '100px'
        },
        props: {
          courseNum: undefined,
          title: undefined,
          author: undefined,
          secCourseType: undefined,
          courseLevel: undefined,
          userLevel: undefined,
          paymentType: undefined,
          status: undefined,
          shelfStatus: undefined,
          videoType: undefined
        },
        formItems: [
          {
            type: 'ImInput',
            prop: 'courseNum',
            label: '课程编号',
            attrs: {}
          },
          {
            type: 'ImInput',
            prop: 'title',
            label: '课程标题',
            attrs: {}
          },
          {
            type: 'ImSlot',
            prop: 'author',
            label: '课程作者',
            slots: {
              slot: 'UserSelect'
            }
          },
          {
            type: 'ImSlot',
            prop: 'secCourseType',
            label: '课程分类',
            slots: {
              slot: 'DictionaryCascader'
            }
          },
          {
            type: 'ImSelect',
            prop: 'courseLevel',
            label: '课程分级',
            attrs: {
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'userLevel',
            label: '用户等级要求',
            attrs: {
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'paymentType',
            label: '付费类型',
            attrs: {
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'status',
            label: '审核状态',
            attrs: {
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'shelfStatus',
            label: '上架状态',
            attrs: {
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'videoType',
            label: '视频类型',
            attrs: {
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImButton',
            attrs: {
              style: 'flex: 1; text-align: right;',
              options: [
                {
                  label: '重 置',
                  attrs: {
                    type: 'default'
                  },
                  listeners: {
                    click: this.resetForm
                  }
                },
                {
                  label: '查 询',
                  attrs: {
                    type: 'primary'
                  },
                  listeners: {
                    click: this.search
                  }
                }
              ]
            }
          }
        ]
      },
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  computed: {
    ...mapGetters(['enums']),
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
              'min-width': '140'
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
            prop: 'videoType',
            label: '视频类型',
            type: 'slot',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            slot: 'videoType'
          },
          {
            prop: 'meterials',
            label: '视频时长',
            type: 'slot',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            slot: 'duration'
          },
          {
            prop: 'authorName',
            label: '课程作者',
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
            prop: 'courseType',
            label: '课程分类',
            type: 'slot',
            slot: 'courseType',
            class: 'w-full',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '200'
            }
          },
          {
            prop: 'courseLevel',
            label: '课程分级',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this.enums.courseLevel
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
          },
          {
            prop: 'paymentType',
            label: '付费类型',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '180'
            },
            options: this.enums.paymentType
          },
          {
            prop: 'price',
            label: '积分数值',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120',
              align: 'right'
            }
          },
          {
            prop: 'viewCount',
            label: '观看次数',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120',
              align: 'right'
            }
          },
          {
            prop: 'viewUserCnt',
            label: '观看人数',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120',
              align: 'right'
            }
          },
          {
            prop: 'collectCount',
            label: '收藏数',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120',
              align: 'right'
            }
          },
          {
            prop: 'starCount',
            label: '点赞数',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120',
              align: 'right'
            }
          },
          {
            prop: 'commentCount',
            label: '评论数',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120',
              align: 'right'
            }
          },
          {
            prop: 'status',
            label: '审核状态',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this?.enums?.courseAuditStatus ?? []
          },
          {
            prop: 'shelfStatus',
            label: '上架状态',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this?.enums?.courseShelfStatus ?? []
          },
          {
            prop: '',
            label: '操作',
            type: 'slot',
            attrs: {
              fixed: 'right',
              width: '200'
            },
            slot: 'operation'
          }
        ]
      }
    }
  },
  activated() {
    this.getList()
    this.setOptions()
  },
  methods: {
    getMeterial(meterials) {
      if (!meterials || meterials.length === 0) {
        return null
      } else {
        return meterials[0]
      }
    },

    changeStatus(params) {
      changeCourseStatus(params).then((res) => {
        if (res.code === 200) {
          this.$message.success('操作成功')
          this.getList()
        }
      })
    },

    /**
     * 提交审核
     */
    submitAudit($index, record) {
      this.$confirm('确定要提交审核吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          const params = {
            courseCode: record.objectCode,
            status: 1
          }
          this.changeStatus(params)
        })
        .catch(() => {
        })
    },

    startAudit($index, record) {
      this.$confirm('是否审核通过该课程?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '审核通过',
        cancelButtonText: '审核驳回',
        type: 'warning'
      })
        .then(() => {
          const params = {
            courseCode: record.objectCode,
            status: 2
          }
          this.changeStatus(params)
        })
        .catch((action) => {
          if (action === 'cancel') {
            const params = {
              courseCode: record.objectCode,
              status: 3
            }
            this.changeStatus(params)
          }
        })
    },

    upItem($index, record) {
      this.$confirm('确定要上架该课程吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          const params = {
            courseCode: record.objectCode,
            shelfStatus: 1
          }
          this.operateCourseShelf(params)
        })
        .catch(() => {
        })
    },

    downItem($index, record) {
      this.$confirm('确定要下架该课程吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          const params = {
            courseCode: record.objectCode,
            shelfStatus: 2
          }
          this.operateCourseShelf(params)
        })
        .catch(() => {
        })
    },

    operateCourseShelf(params) {
      operateCourseShelfStatus(params).then((res) => {
        if (res.code === 200) {
          this.$message.success('操作成功!')
          this.getList()
        }
      })
    },

    setOptions() {
      // this.setFormPropOptions('courseType', this.enums.courseType)
      this.setFormPropOptions('courseLevel', this.enums.courseLevel)
      this.setFormPropOptions('userLevel', this.enums.doctorLevel)
      this.setFormPropOptions('paymentType', this.enums.paymentType)
      this.setFormPropOptions('status', this.enums.courseAuditStatus)
      this.setFormPropOptions('shelfStatus', this.enums.courseShelfStatus)
      this.setFormPropOptions('videoType', this.enums.videoType)
    },

    getVideoType(type) {
      for (let i = 0; i < this.enums.videoType.length; i++) {
        const item = this.enums.videoType[i]
        if (item.value === type) {
          return item.label
        }
      }
      return '-'
    },

    /**
     * 设置form标单项的options，因为enums异步获取，因此这里需要手动指定一下
     * 放到计算属性会有prop绑定失效的问题
     */
    setFormPropOptions(prop, options) {
      const formItems = this.formConfig.formItems
      const item = formItems.find((item) => item.prop === prop)
      item.attrs.options = options
    },

    /**
     * 展示详情
     */
    showDetail($index, record) {
      this.$refs.DetailDialog.show(record)
    },

    setRole($index, record) {
      this.$refs.SetRoleDrower.edit(record.objectCode)
    },

    viewItem($index, record) {
      this.$router.push({name: 'CourseDetail', query: {objectCode: record.objectCode}})
    },

    /**
     * 编辑
     */
    editItem($index, record) {
      this.$router.push({name: 'CourseAddOrEdit', query: {objectCode: record.objectCode}})
    },

    /**
     * 添加
     */
    addItem() {
      this.$router.push({name: 'CourseAddOrEdit'})
    },

    /**
     * 删除
     */
    deleteItem($index, record) {
      this.$confirm('确定要删除该项吗？', '提示', {
        type: 'warning',
        customClass: 'deleteConfirm',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          deleteCourseItem({objectCode: record.objectCode}).then((res) => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.getList()
            } else {
              this.$message.error(res.message)
            }
          })
        })
        .catch(() => {
        })
    },

    /**
     * 搜索按钮点击事件，回到第一页
     */
    search() {
      this.$refs.ImPagination.reset()
      this.getList()
    },

    /**
     * 获取列表
     */
    getList() {
      const params = {
        page: this.currentPage,
        limit: this.pageSize,
        ...this.formConfig.props
      }
      this.loading = true
      getCourseList(params)
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.total = res.data.totalCount
            this.tableConfig.data = res.data.list || []
          } else {
            this.$message.error(res.message)
          }
        })
        .catch((_) => {
          this.loading = false
        })
    },

    /**
     * 重置表单
     */
    resetForm() {
      this.$refs.ImForm.reset()
      this.$refs.ImPagination.reset()
      this.getList()
    }
  }
}
</script>
