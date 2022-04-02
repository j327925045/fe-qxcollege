<template>
  <ImDrawer
    :visible.sync="drawerVisible"
    :title="editId ? '编辑素材' : '新建素材'"
    @closeDrower="closeDrower"
    @submit="submitForm"
  >
    <ImForm ref="ImForm" :form="formConfig">
      <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />个人信息</h3>
    </ImForm>
  </ImDrawer>
</template>

<script>

import { getDetail, editResources, resourcesCommit } from '@/api/resources'
import { mapGetters } from 'vuex'
import ImDrawer from '@/views/components/ImDrawer'
import ImForm from '@/views/components/ImForm/index'
export default {
  name: 'AddOrEdit',
  components: {
    ImDrawer,
    ImForm
  },
  data() {
    return {
      drawerVisible: false,
      editId: undefined,
      formConfig: {
        attrs: {
          labelWidth: '140px',
          labelPosition: 'right'
        },
        props: {
          author: '',
          introduction: '',
          name: '',
          type: undefined,
          coverUrl: '',
          fileUrl: ''
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
            prop: 'author',
            label: '作者',
            rules: [{ required: true, message: '请输入作者' }],
            attrs: {
              type: 'text',
              placeholder: '请输入作者'
            }
          },
          {
            type: 'ImInput',
            prop: 'name',
            label: '名称',
            rules: [{ required: true, message: '请输入名称' }],
            attrs: {
              type: 'text',
              placeholder: '请输入名称'
            }
          },
          {
            type: 'ImInput',
            prop: 'introduction',
            label: '简介',
            rules: [{ required: true, message: '请输入简介' }],
            attrs: {
              type: 'text',
              placeholder: '请输入简介'
            }
          },
          {
            type: 'ImSelect',
            prop: 'type',
            label: '素材类型',
            rules: [{ required: true, message: '请选择素材类型' }],
            attrs: {
              placeholder: '请选择素材类型',
              clearable: true,
              class: 'w-full',
              options: []
            }
          }, {
            type: 'ImInput',
            prop: 'coverUrl',
            label: '视频封面',
            rules: [{ required: true, message: '请输入视频封面' }],
            attrs: {
              type: 'text',
              placeholder: '请输入视频封面'
            }
          }, {
            type: 'ImInput',
            prop: 'fileUrl',
            label: '文件存储',
            rules: [{ required: true, message: '请输入文件存储' }],
            attrs: {
              type: 'text',
              placeholder: '请输入文件存储'
            }
          }
        ]
      }
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
      this.setFormPropOptions('type', this.enums.materialType)
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

    /**
     * 暴露添加方法
     */
    add() {
      this.editId = undefined
      this.drawerVisible = true
    },

    /**
     * 暴露编辑方法
     */
    edit(editId) {
      this.editId = editId
      this.drawerVisible = true
      this.getItemDetail()
    },

    /**
     * 获取详情
     */
    getItemDetail() {
      console.log(this.editId)
      getDetail(this.editId).then(res => {
        if (res.code === 200) {
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

    /**
     * 提交表单
     */
    submitForm() {
      if (this.editId) {
        this.formConfig.props.objectCode = this.editId
        editResources(this.formConfig.props).then(res => {
          if (res.code === 200) {
            this.$message.success(res.message)
            this.$emit('update')
            this.closeDrower()
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        resourcesCommit(this.formConfig.props).then(res => {
          if (res.code === 200) {
            this.$message.success(res.message)
            this.$emit('update')
            this.closeDrower()
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },

    /**
     * 关闭弹层
     */
    closeDrower() {
      this.$refs.ImForm.reset()
      this.drawerVisible = false
    }
  }
}
</script>
