<template>
  <ImDrawer
    :visible.sync="drawerVisible"
    :title="editId ? '编辑专栏' : '新建专栏'"
    @closeDrower="closeDrower"
    @submit="submitForm"
  >
    <ImForm ref="ImForm" :form="formConfig">
      <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />基本信息</h3>
    </ImForm>
  </ImDrawer>
</template>

<script>
import { addColumnItem, getColumnDetail, updateColumnItem } from '@/api/column'
import { mapGetters } from 'vuex'

export default {
  name: 'AddOrEdit',
  data() {
    return {
      formConfig: {
        attrs: {
          labelWidth: '140px',
          labelPosition: 'right'
        },
        props: {
          title: undefined,
          introduction: undefined,
          level: undefined,
          price: undefined,
          summary: undefined,
          type: undefined
        },
        formItems: [
          {
            type: 'ImSlot',
            notInForm: true,
            slots: {
              firstSlot: 'infoSlot'
            }
          },
          {
            type: 'ImInput',
            prop: 'title',
            label: '标题',
            rules: [{ required: false, message: '请输入标题' }],
            attrs: {
              placeholder: '请输入标题'
            }
          },
          {
            type: 'ImInput',
            prop: 'introduction',
            label: '简介',
            rules: [{ required: false, message: '请输入简介' }],
            attrs: {
              type: 'textarea',
              placeholder: '请输入简介'
            }
          },
          {
            type: 'ImInput',
            prop: 'coverUrl',
            label: '封面图片',
            rules: [{ required: false, message: '请选择封面图片' }],
            attrs: {
              placeholder: '请选择封面图片'
            }
          },
          {
            type: 'ImSelect',
            prop: 'isRecommend',
            label: '首页是否推荐',
            rules: [{ required: false, message: '请选择首页是否推荐' }],
            attrs: {
              placeholder: '请选择首页是否推荐',
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImInputNumber',
            prop: 'sort',
            label: '首页排序',
            rules: [{ required: false, message: '请输入首页排序' }],
            attrs: {
              style: 'width:100%;',
              'controls-position': 'right',
              placeholder: '请输入首页排序'
            }
          },
          {
            type: 'ImSelect',
            prop: 'status',
            label: '状态',
            rules: [{ required: false, message: '请选择状态' }],
            attrs: {
              placeholder: '请选择状态',
              class: 'w-full',
              options: []
            }
          }
        ]
      },
      editId: undefined,
      drawerVisible: false
    }
  },
  computed: {
    ...mapGetters(['enums'])
  },
  created() {
    this.setOptions()
  },
  methods: {
    /**
     * 统一处理options
     */
    setOptions() {
      this.setFormPropOptions('isRecommend', this.enums.columnIsRecommend)
      this.setFormPropOptions('status', this.enums.columnStatus)
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

    add() {
      this.editId = undefined
      this.drawerVisible = true
    },

    edit(editId) {
      this.editId = editId
      this.drawerVisible = true
      this.getItemDetail()
    },

    getItemDetail() {
      getColumnDetail({ objectCode: this.editId }).then((res) => {
        if (res.code === 200 && res.data) {
          const props = this.formConfig.props
          const keys = Object.keys(props)
          // 直接遍历进行赋值，特殊属性需要单独拿出来处理
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            props[key] = res.data[key] || undefined
          }
        }
      })
    },

    submitForm() {
      this.$refs.ImForm.validate((valid) => {
        if (!valid) {
          this.$message('请检查表单项！')
          return
        }
        const data = {
          ...this.formConfig.props
        }
        if (this.editId) {
          data.objectCode = this.editId
          updateColumnItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addColumnItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.$emit('add')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    closeDrower() {
      this.$refs.ImForm.reset()
      this.drawerVisible = false
    }
  }
}
</script>
