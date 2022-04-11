<template>
  <ImWrapper>
    <ImSearchArea>
      <ImForm ref="ImForm" :form="formConfig"></ImForm>
    </ImSearchArea>

    <ImTableArea>
      <div class="mb-4">
        <el-button type="primary" @click="addItem">新建课程</el-button>
      </div>
      <ImTable :loading="loading" :table="tableConfig"></ImTable>
      <div class="mt-4 text-right">
        <ImPagination
          ref="ImPagination"
          :page-size.sync="pageSize"
          :current-page.sync="currentPage"
          :total="total"
          @change="getList"
        ></ImPagination>
      </div>
    </ImTableArea>
    <AddOrEdit ref="AddOrEdit" @update="getList" @add="getList"></AddOrEdit>
  </ImWrapper>
</template>

<script>
import { getCourseList, deleteCourseItem } from '@/api/course.js'
import AddOrEdit from './components/AddOrEdit'
import { mapGetters } from 'vuex'

export default {
  name: 'CourseList',
  components: {
    AddOrEdit
  },
  data() {
    return {
      formConfig: {
        column: 3,
        attrs: {
          labelWidth: '100px'
        },
        props: {
          a: undefined,
          b: undefined,
          c: undefined,
          d: undefined,
          e: undefined,
          f: undefined,
          g: undefined,
          h: undefined,
          i: undefined
        },
        formItems: [
          {
            type: 'ImInput',
            prop: 'a',
            label: '课程编号',
            attrs: {
            }
          },
          {
            type: 'ImInput',
            prop: 'b',
            label: '课程标题',
            attrs: {
            }
          },
          {
            type: 'ImSelect',
            prop: 'c',
            label: '课程作者',
            attrs: {
              allowClear: true,
              class: 'w-full'
            }
          },
          {
            type: 'ImSelect',
            prop: 'd',
            label: '课程分类',
            attrs: {
              allowClear: true,
              class: 'w-full'
            }
          },
          {
            type: 'ImSelect',
            prop: 'e',
            label: '课程分级',
            attrs: {
              allowClear: true,
              class: 'w-full'
            }
          },
          {
            type: 'ImSelect',
            prop: 'f',
            label: '用户等级要求',
            attrs: {
              allowClear: true,
              class: 'w-full'
            }
          },
          {
            type: 'ImSelect',
            prop: 'g',
            label: '付费类型',
            attrs: {
              allowClear: true,
              class: 'w-full'
            }
          },
          {
            type: 'ImSelect',
            prop: 'h',
            label: '审核状态',
            attrs: {
              allowClear: true,
              class: 'w-full'
            }
          },
          {
            type: 'ImSelect',
            prop: 'i',
            label: '上架状态',
            attrs: {
              allowClear: true,
              class: 'w-full'
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
            prop: 'a',
            label: '课程编号',
            attrs: {
              fixed: 'left',
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'b',
            label: '标题',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'c',
            label: '视频类型',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'd',
            label: '视频时长',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'e',
            label: '视频作者',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'f',
            label: '视频分类',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'level',
            label: '视频分级',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this.enums.courseLevel
          },
          {
            prop: 'h',
            label: '用户等级要求',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'type',
            label: '付费类型',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '180'
            },
            options: this.enums.courseType
          },
          {
            prop: 'price',
            label: '积分数值',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'i',
            label: '观看次数',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'j',
            label: '观看人数',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'k',
            label: '收藏数',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'l',
            label: '点赞数',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'n',
            label: '评论数',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'o',
            label: '审核状态',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'p',
            label: '上架状态',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: '',
            label: '操作',
            type: 'buttons',
            attrs: {
              fixed: 'right',
              width: '150'
            },
            options: [
              {
                title: '查看',
                type: 'text',
                onClick: this.viewItem
              },
              {
                title: '编辑',
                type: 'text',
                onClick: this.editItem
              },
              {
                title: '删除',
                type: 'text',
                onClick: this.deleteItem
              }
            ]
          }
        ]
      }
    }
  },
  activated() {
    this.getList()
  },
  methods: {
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
      this.$router.push({ name: 'CourseDetail', query: { objectCode: record.objectCode } })
    },

    /**
     * 编辑
     */
    editItem($index, record) {
      this.$router.push({ name: 'CourseAddOrEdit', query: { objectCode: record.objectCode } })
    },

    /**
     * 添加
     */
    addItem() {
      this.$router.push({ name: 'CourseAddOrEdit' })
    },

    /**
     * 删除
     */
    deleteItem($index, record) {
      this.$confirm('确定要删除该项吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          deleteCourseItem({ objectCode: record.objectCode }).then((res) => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.getList()
            } else {
              this.$message.error(res.message)
            }
          })
        })
        .catch(() => {})
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
      getCourseList(params).then((res) => {
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
