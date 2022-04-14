<template>
  <ImWrapper>
    <ImSearchArea>
      <ImForm ref="ImForm" :form="formConfig"></ImForm>
    </ImSearchArea>
    <ImTableArea>
      <div class="mb-4">
        <el-button type="primary" @click="addItem">新建产品</el-button>
      </div>
      <ImTable :loading="loading" :table="tableConfig">
        <template slot="imageUrl" slot-scope="scope">
          <img :src="scope.row.imageUrl" alt="">
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
  </ImWrapper>
</template>

<script>
import { getProductList, deleteProductItem } from '@/api/product'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'ProductList',
  data() {
    return {
      moment,
      formConfig: {
        column: 3,
        attrs: {
          labelWidth: '100px'
        },
        props: {
          name: undefined,
          productNum: undefined,
          businessType: undefined,
          category: undefined,
          type: undefined
        },
        formItems: [
          {
            type: 'ImInput',
            prop: 'name',
            label: '产品名称',
            attrs: {
              placeholder: '请输入',
              style: 'width: 100%;'
            }
          },
          {
            type: 'ImInput',
            prop: 'productNum',
            label: '产品编号',
            attrs: {
              placeholder: '请输入',
              style: 'width: 100%;'
            }
          },
          {
            type: 'ImSelect',
            prop: 'businessType',
            label: '业务类型',
            attrs: {
              placeholder: '请选择',
              style: 'width: 100%;',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'category',
            label: '材料类别',
            attrs: {
              placeholder: '请选择',
              style: 'width: 100%;',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'type',
            label: '产品类型',
            attrs: {
              placeholder: '请选择',
              style: 'width: 100%;',
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
            prop: 'productNum',
            label: '产品编号',
            attrs: {
              fixed: 'left',
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'name',
            label: '产品名称',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'businessType',
            label: '业务类型',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '100'
            },
            options: this?.enums?.businessType ?? []
          },
          {
            prop: 'category',
            label: '材料类别',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this?.enums?.category ?? []
          },
          {
            prop: 'type',
            label: '产品类型',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: this?.enums?.type ?? []
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
  created() {
    this.getList()
    this.setOptions()
  },
  activated() {
    this.getList()
    this.setOptions()
  },
  methods: {
    setOptions() {
      this.setFormPropOptions('businessType', this.enums.businessType)
      this.setFormPropOptions('category', this.enums.category)
      this.setFormPropOptions('type', this.enums.type)
    },

    /**
     * 设置form标单项的options，因为enums异步获取，因此这里需要手动指定一下
     * 放到计算属性会有prop绑定失效的问题
     */
    setFormPropOptions(prop, options) {
      const formItems = this.formConfig.formItems
      const item = formItems.find(item => item.prop === prop)
      item.attrs.options = options
    },

    showDetail($index, record) {
      this.$router.push({ name: 'ProductDetail', query: { objectCode: record.objectCode } })
    },

    addItem() {
      this.$router.push({ name: 'ProductAddOrEdit' })
    },

    editItem($index, record) {
      this.$router.push({ name: 'ProductAddOrEdit', query: { objectCode: record.objectCode } })
    },

    deleteItem($index, record) {
      this.$confirm('确定要删除该项吗？', '提示', {
        type: 'warning',
        customClass: 'deleteConfirm',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          deleteProductItem({ objectCode: record.objectCode }).then((res) => {
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
      getProductList(params)
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
