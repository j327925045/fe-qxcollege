<template>
  <ImDrawer
    :visible.sync="drawerVisible"
    title="审核详情"
    @closeDrower="closeDrower"
    @submit="submitForm"
  >
    <ImForm ref="ImForm" :form="formConfig">

    </ImForm>
  </ImDrawer>
</template>

<script>

import { replyCommentsItem } from '@/api/comments'
import { mapGetters } from 'vuex'

export default {
  name: 'AddOrEdit',

  data() {
    return {
      detail: {},
      drawerVisible: false,
      formConfig: {
        attrs: {
          labelWidth: '140px',
          labelPosition: 'right'
        },
        props: {
          replyContent: '',
          courseCommentCode: ''
        },
        formItems: [

          {
            type: 'ImInput',
            prop: 'replyContent',
            label: '回复',
            rules: [{ required: true, message: '请输入回复内容' }],
            attrs: {
              type: 'text',
              placeholder: '请输入回复内容'
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
    edit(data) {
      this.detail = data
      this.formConfig.props.courseCommentCode = data.courseCode
      this.drawerVisible = true
    },

    /**
     * 提交表单
     */
    submitForm() {
      this.$refs.ImForm.validate(valid => {
        if (!valid) {
          this.$message('请检查表单项！')
          return
        }
        const data = {
          ...this.formConfig.props
        }
        replyCommentsItem(data).then(res => {
          if (res.code === 200) {
            this.$message.success(res.message)
            this.$emit('update')
            this.closeDrower()
          } else {
            this.$message.error(res.message)
          }
        })
      })
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
