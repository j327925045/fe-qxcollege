<template>
  <ImDrawer
    :visible.sync="drawerVisible"
    :title="editId ? '编辑课程' : '新建课程'"
    @closeDrower="closeDrower"
    @submit="submitForm"
  >
    <ImForm ref="ImForm" :form="formConfig">
      <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />基本信息</h3>
    </ImForm>
  </ImDrawer>
</template>

<script>
import { addCourseItem, getCourseDetail, updateCourseItem } from '@/api/course'
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
            prop: 'summary',
            label: '简介',
            rules: [{ required: false, message: '请输入简介' }],
            attrs: {
              placeholder: '请输入简介'
            }
          },
          {
            type: 'ImInput',
            prop: 'introduction',
            label: '介绍',
            rules: [{ required: false, message: '请输入简介' }],
            attrs: {
              type: 'textarea',
              placeholder: '请输入简介'
            }
          },
          {
            type: 'ImSelect',
            prop: 'level',
            label: '分级',
            rules: [{ required: false, message: '请选择分级' }],
            attrs: {
              placeholder: '请选择分级',
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImInputNumber',
            prop: 'price',
            label: '积分价格',
            rules: [{ required: false, message: '请输入积分价格' }],
            attrs: {
              style: 'width:100%;',
              'controls-position': 'right',
              placeholder: '请输入积分价格'
            }
          },
          {
            type: 'ImSelect',
            prop: 'type',
            label: '类型',
            rules: [{ required: false, message: '请选择类型' }],
            attrs: {
              placeholder: '请选择类型',
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
      this.setFormPropOptions('level', this.enums.courseLevel)
      this.setFormPropOptions('type', this.enums.courseType)
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
      getCourseDetail({ objectCode: this.editId }).then((res) => {
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
          updateCourseItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addCourseItem(data).then((res) => {
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
