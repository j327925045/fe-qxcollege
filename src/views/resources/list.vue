<template>
  <ImWrapper>
    <ImSearchArea>
      <ImForm ref="ImForm" :form="formConfig"></ImForm>
    </ImSearchArea>
    <ImTableArea>
      <div class="mb-4">
        <el-button type="primary" @click="addItem">新建素材</el-button>
      </div>
      <ImTable :loading="loading" :table="tableConfig">
        <template slot="coverUrl" slot-scope="scope">
          <img :src="scope.row.coverUrl" alt="">
        </template>
        <template slot="videoItem" slot-scope="scope">
          <a href="javascript:;" @click="playVideo(scope.row)">{{ scope.row.fileUrl }}</a>
        </template>
      </ImTable>
      <ImPagination
        ref="ImPagination"
        :page-size.sync="pageSize"
        :current-page.sync="currentPage"
        :total="total"
        @change="getList"
      ></ImPagination>
    </ImTableArea>
    <DetailDialog ref="DetailDialog" @update="getList"></DetailDialog>
    <AddOrEdit ref="AddOrEdit" @update="getList" @add="getList"></AddOrEdit>
    <VideoPlayer ref="VideoPlayer"></VideoPlayer>
  </ImWrapper>
</template>

<script>
import { getDataList, deleteResources } from '@/api/resources'
import DetailDialog from './components/DetailDialog'
import VideoPlayer from '@/views/components/VideoPlayer'
import AddOrEdit from './components/AddOrEdit'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'Resources',
  components: {
    VideoPlayer,
    DetailDialog,
    AddOrEdit
  },
  data() {
    return {
      moment,
      formConfig: {
        column: 3,
        attrs: {
          labelWidth: '100px'
        },
        props: {
          name: ''
        },
        formItems: [
          {
            type: 'ImInput',
            prop: 'name',
            label: '名称',
            attrs: {
              type: 'text',
              placeholder: '请输入',
              style: 'width: 100%;'
            }
          },
          {
            type: 'ImInput',
            prop: 'author',
            label: '作者',
            attrs: {
              type: 'text',
              placeholder: '请输入',
              style: 'width: 100%;'
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
            prop: '',
            label: '序号',
            type: 'index',
            attrs: {
              fixed: 'left',
              width: 60
            }
          },
          {
            prop: 'name',
            label: '名称',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'author',
            label: '作者',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'coverUrl',
            label: '视频封面',
            type: 'slot',
            slot: 'coverUrl',
            attrs: {
              width: '180'
            }
          },
          {
            prop: 'introduction',
            label: '简介',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '100'
            }
          },
          {
            prop: 'fileUrl',
            label: '视频ID',
            type: 'slot',
            slot: 'videoItem',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '100'
            }
          },
          // {
          //   prop: 'type',
          //   label: '素材类型',
          //   type: 'mapList',
          //   attrs: {
          //     'show-overflow-tooltip': true,
          //     'min-width': '120'
          //   },
          //   options: this.enums.materialType
          // },
          {
            prop: '',
            label: '操作',
            type: 'buttons',
            attrs: {
              fixed: 'right',
              width: '160'
            },
            options: [
              {
                title: '查看视频',
                type: 'text',
                onClick: this.showDetail
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
  created() {
    this.getList()
  },
  methods: {
    playVideo(record) {
      this.$refs.VideoPlayer.play(record.fileUrl, record.coverUrl)
    },

    addItem() {
      this.$refs.AddOrEdit.add()
    },
    showDetail($index, record) {
      this.playVideo(record)
    },

    editItem($index, record) {
      this.$refs.AddOrEdit.edit(record.objectCode)
    },

    deleteItem($index, record) {
      this.$confirm('确定要删除该项吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          deleteResources({ objectCode: record.objectCode }).then((res) => {
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
     * 重置表单
     */
    resetForm() {
      this.$refs.ImForm.reset()
      this.$refs.ImPagination.reset()
      this.getList()
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
      getDataList(params)
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
