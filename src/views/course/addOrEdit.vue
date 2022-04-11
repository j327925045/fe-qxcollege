<template>
  <ImWrapper>
    <div class="bg-white p-4 mb-[32px]">
      <ImForm ref="ImForm" :form="formConfig">
        <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />课程信息</h3>
        <h3 slot="contentSlot" class="gyl-title"><i class="el-icon-s-order" />内容属性</h3>
        <h3 slot="viewLimitSlot" class="gyl-title"><i class="el-icon-s-order" />观看限制</h3>
        <RichTextArea slot="RichTextArea" v-model="formConfig.props.introduction"></RichTextArea>
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
import { addCourseItem, getCourseDetail, updateCourseItem } from '@/api/course'
import RichTextArea from '@/views/components/RichTextArea'

export default {
  name: 'CourseAddOrEdit-noCache',
  components: {
    RichTextArea
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
          cover: undefined
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
            type: 'ImSelect',
            prop: 'title',
            label: '视频素材',
            rules: [{ required: true, message: '请选择视频素材' }],
            attrs: {
              class: 'w-full'
            }
          },
          {
            type: 'ImInput',
            prop: 'title',
            label: '课程标题',
            rules: [{ required: true, message: '请输入课程标题' }],
            attrs: {
            }
          },
          {
            type: 'ImSelect',
            prop: 'title',
            label: '课程作者',
            rules: [{ required: true, message: '请选择课程作者' }],
            attrs: {
              class: 'w-full'
            }
          },
          {
            type: 'ImImgUpload',
            prop: 'cover',
            label: '课程封面',
            span: 24,
            rules: [{ required: true, message: '请选择课程封面' }],
            attrs: {
            }
          },
          {
            type: 'ImInput',
            prop: 'summary',
            label: '课程简介',
            span: 24,
            rules: [{ required: true, message: '请输入课程简介' }],
            attrs: {
              type: 'textarea',
              style: 'width: 33%'
            }
          },
          {
            type: 'ImSlot',
            prop: 'introduction',
            label: '课程介绍',
            span: 24,
            rules: [{ required: true, message: '请输入简介' }],
            slots: {
              introduction: 'RichTextArea'
            }
          },
          {
            type: 'ImSlot',
            notInForm: true,
            slots: {
              firstSlot: 'contentSlot'
            }
          },
          {
            type: 'ImSelect',
            prop: 'type',
            label: '课程分类',
            rules: [{ required: true, message: '请选择课程分类' }],
            attrs: {
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'product',
            label: '关联产品',
            rules: [{ required: true, message: '请选择关联产品' }],
            attrs: {
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'hospitalCode',
            label: '关联项目',
            rules: [{ required: true, message: '请选择关联项目' }],
            attrs: {
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'level',
            label: '分区',
            rules: [{ required: true, message: '请选择分区' }],
            attrs: {
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'part',
            label: '部位',
            rules: [{ required: true, message: '请选择部位' }],
            attrs: {
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'part',
            label: '适应症',
            rules: [{ required: true, message: '请选择适应症' }],
            attrs: {
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'part',
            label: '并发症',
            rules: [{ required: true, message: '请选择并发症' }],
            attrs: {
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSlot',
            notInForm: true,
            slots: {
              slot: 'viewLimitSlot'
            }
          },
          {
            type: 'ImSelect',
            prop: 'part',
            label: '课程分级',
            rules: [{ required: true, message: '请选择课程分级' }],
            attrs: {
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'part',
            label: '用户等级要求',
            rules: [{ required: true, message: '请选择用户等级要求' }],
            attrs: {
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'part',
            label: '付费类型',
            rules: [{ required: true, message: '请选择付费类型' }],
            attrs: {
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImInputNumber',
            prop: 'price',
            label: '积分数值',
            rules: [{ required: true, message: '请输入积分数值' }],
            attrs: {
              style: 'width:100%;',
              controls: false
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

    getItemDetail() {
      getCourseDetail({ objectCode: this.editId }).then(res => {
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
          updateCourseItem(data).then(res => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeCurrent()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addCourseItem(data).then(res => {
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
