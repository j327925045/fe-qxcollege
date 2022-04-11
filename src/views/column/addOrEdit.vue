<template>
  <ImWrapper>
    <div class="bg-white p-4 mb-[32px]">
      <ImForm ref="ImForm" :form="formConfig">
        <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />基本信息</h3>
        <h3 slot="courseSlot" class="gyl-title"><i class="el-icon-s-order" />收录课程</h3>
        <CourseSelect slot="CourseSelect" v-model="formConfig.props.courseCodes" style="width:50%;" multiple></CourseSelect>
      </ImForm>
    </div>
    <div class="fixed bottom-0 text-right right-0 w-full p-2 bg-white shadow-dark-50 shadow-2xl">
      <el-button @click="closeCurrent">取 消</el-button>
      <el-button type="primary" @click="submitForm">保 存</el-button>
    </div>
  </ImWrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import { addColumnItem, getColumnDetail, updateColumnItem } from '@/api/column'
import CourseSelect from '@/views/components/CourseSelect'

export default {
  name: 'ColumnAddOrEdit-noCache',
  components: {
    CourseSelect
  },
  data() {
    return {
      formConfig: {
        column: 3,
        gutter: 42,
        attrs: {
          labelWidth: '140px',
          labelPosition: 'top'
        },
        props: {
          title: undefined,
          introduction: undefined,
          level: undefined,
          price: undefined,
          summary: undefined,
          type: undefined,
          courseCodes: undefined
        },
        formItems: [
          {
            type: 'ImSlot',
            notInForm: true,
            slots: {
              slot: 'infoSlot'
            }
          },
          {
            type: 'ImImgUpload',
            prop: 'coverUrl',
            label: '专栏封面',
            span: 24,
            rules: [{ required: true, message: '请选择封面图片' }],
            attrs: {
            }
          },
          {
            type: 'ImInput',
            prop: 'title',
            label: '专栏标题',
            span: 24,
            rules: [{ required: true, message: '请输入专栏标题' }],
            attrs: {
              style: 'width: 33%'
            }
          },
          {
            type: 'ImInput',
            prop: 'introduction',
            label: '专栏简介',
            span: 24,
            rules: [{ required: false, message: '请输入专栏简介' }],
            attrs: {
              type: 'textarea',
              style: 'width: 33%'
            }
          },
          {
            type: 'ImSlot',
            notInForm: true,
            slots: {
              slot: 'courseSlot'
            }
          },
          {
            type: 'ImSlot',
            span: 24,
            label: '选择课程',
            slots: {
              slot: 'CourseSelect'
            }
          }
        ]
      },
      editId: this.$route.query.objectCode
    }
  },
  computed: {
    ...mapGetters(['enums'])
  },
  created() {
    this.setOptions()
    if (this.editId) {
      this.getItemDetail()
    }
  },
  methods: {
    /**
     * 统一处理options
     */
    setOptions() {
      // this.setFormPropOptions('isRecommend', this.enums.columnIsRecommend)
      // this.setFormPropOptions('status', this.enums.columnStatus)
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

    getItemDetail() {
      getColumnDetail({ objectCode: this.editId }).then(res => {
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

    submitForm() {
      this.$refs.ImForm.validate(valid => {
        if (!valid) {
          this.$message('请检查表单项！')
          return
        }
        const data = {
          ...this.formConfig.props
        }
        if (this.editId) {
          data.objectCode = this.editId
          updateColumnItem(data).then(res => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeCurrent()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addColumnItem(data).then(res => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.$emit('add')
              this.closeCurrent()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },

    closeCurrent() {
      this.$refs.ImForm.reset()
      this.$router.replace({ name: 'CourseList' })
    }
  }
}
</script>
