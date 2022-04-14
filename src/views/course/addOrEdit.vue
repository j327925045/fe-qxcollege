<template>
  <ImWrapper>
    <div class="bg-white p-4 mb-[32px]">
      <ImForm ref="ImForm" :form="formConfig">
        <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />课程信息</h3>
        <h3 slot="contentSlot" class="gyl-title"><i class="el-icon-s-order" />内容属性</h3>
        <h3 slot="viewLimitSlot" class="gyl-title"><i class="el-icon-s-order" />观看限制</h3>
        <ResourceSelect slot="ResourceSelect" v-model="formConfig.props.materialCode" class="w-full"></ResourceSelect>
        <RichTextArea slot="RichTextArea" v-model="formConfig.props.introduction"></RichTextArea>
        <UserSelect slot="UserSelect" v-model="formConfig.props.author" class="w-full"></UserSelect>
        <ProductSelect slot="ProductSelect" v-model="formConfig.props.prodCodes" multiple collapse-tags class="w-full"></ProductSelect>
        <ProjectSelect slot="ProjectSelect" v-model="formConfig.props.projectCodes" multiple collapse-tags class="w-full"></ProjectSelect>
        <DictionaryCascader
          slot="DictionaryCascader"
          v-model="formConfig.props.courseType"
          sign="courseFirstCategory"
          :multiple="true"
          :collapse-tags="true"
          :show-all-levels="true"
          style="width: 31%"
        ></DictionaryCascader>
      </ImForm>
    </div>
    <div class="fixed bottom-0 text-right right-0 w-full p-2 bg-white shadow-dark-50 shadow-2xl">
      <el-button @click="closeCurrent">取 消</el-button>
      <el-button type="primary" @click="submitForm">保 存</el-button>
      <el-button type="primary" @click="submitAndAudit">提交审核</el-button>
    </div>
  </ImWrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import { addCourseItem, getCourseDetail, updateCourseItem, changeCourseStatus } from '@/api/course'
import RichTextArea from '@/views/components/RichTextArea'
import ResourceSelect from '@/views/components/ResourceSelect'
import UserSelect from '@/views/components/UserSelect'
import ProductSelect from '@/views/components/ProductSelect'
import ProjectSelect from '@/views/components/ProjectSelect'
import DictionaryCascader from '@/views/components/DictionaryCascader'

export default {
  name: 'CourseAddOrEdit-noCache',
  components: {
    RichTextArea,
    ResourceSelect,
    UserSelect,
    ProjectSelect,
    ProductSelect,
    DictionaryCascader
  },
  data() {
    return {
      formConfig: {
        column: 3,
        gutter: 56,
        attrs: {
          labelWidth: '140px',
          labelPosition: 'top'
        },
        props: {
          materialCode: undefined,
          introduction: undefined,
          title: undefined,
          author: undefined,
          coverUrl: undefined,
          courseType: [],
          prodCodes: [],
          projectCodes: [],
          partition: [],
          position: [],
          indication: [],
          complication: [],
          courseLevel: undefined,
          userLevel: undefined,
          paymentType: undefined,
          price: 0,
          summary: undefined
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
            type: 'ImSlot',
            label: '视频素材',
            prop: 'materialCode',
            rules: [{ required: true, message: '请选择视频素材' }],
            slots: {
              slot: 'ResourceSelect'
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
            type: 'ImSlot',
            label: '课程作者',
            prop: 'author',
            rules: [{ required: true, message: '请选择课程作者' }],
            slots: {
              slot: 'UserSelect'
            }
          },
          {
            type: 'ImImgUpload',
            prop: 'coverUrl',
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
            rules: [{ required: true, message: '请输入课程介绍' }],
            slots: {
              introduction: 'RichTextArea'
            }
          },
          {
            type: 'ImSlot',
            notInForm: true,
            slots: {
              slot: 'contentSlot'
            }
          },
          {
            type: 'ImSlot',
            prop: 'courseType',
            label: '课程分类',
            span: 24,
            rules: [{ required: true, message: '请选择课程分类' }],
            slots: {
              slot: 'DictionaryCascader'
            }
          },
          {
            type: 'ImSlot',
            label: '关联产品',
            prop: 'prodCodes',
            rules: [{ required: true, message: '请选择关联产品' }],
            slots: {
              slot: 'ProductSelect'
            }
          },
          {
            type: 'ImSlot',
            label: '关联项目',
            prop: 'projectCodes',
            rules: [{ required: true, message: '请选择关联项目' }],
            slots: {
              slot: 'ProjectSelect'
            }
          },
          {
            type: 'ImSelect',
            prop: 'partition',
            label: '分区',
            rules: [{ required: true, message: '请选择分区' }],
            attrs: {
              multiple: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'position',
            label: '部位',
            rules: [{ required: true, message: '请选择部位' }],
            attrs: {
              multiple: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'indication',
            label: '适应症',
            rules: [{ required: true, message: '请选择适应症' }],
            attrs: {
              multiple: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'complication',
            label: '并发症',
            rules: [{ required: true, message: '请选择并发症' }],
            attrs: {
              multiple: true,
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
            prop: 'courseLevel',
            label: '课程分级',
            rules: [{ required: true, message: '请选择课程分级' }],
            attrs: {
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'userLevel',
            label: '用户等级要求',
            rules: [{ required: true, message: '请选择用户等级要求' }],
            attrs: {
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'paymentType',
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
              min: 0,
              precision: 0,
              style: 'width:100%;',
              controls: false
            }
          }
        ]
      },
      editId: this.$route.query.objectCode,
      courseNum: undefined
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
      // this.setFormPropOptions('courseType', this.enums.courseType)
      this.setFormPropOptions('partition', this.enums.coursePartition)
      this.setFormPropOptions('position', this.enums.coursePosition)
      this.setFormPropOptions('indication', this.enums.courseIndication)
      this.setFormPropOptions('complication', this.enums.courseComplication)
      this.setFormPropOptions('courseLevel', this.enums.courseLevel)
      this.setFormPropOptions('userLevel', this.enums.doctorLevel)
      this.setFormPropOptions('paymentType', this.enums.paymentType)
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
          this.courseNum = res.data.courseNum
          props.prodCodes = res.data.courseProducts.map(item => item.objectCode)
          props.projectCodes = res.data.courseProjects.map(item => item.objectCode)
          if (res.data.materials && res.data.materials[0]) {
            props.materialCode = res.data.materials[0].objectCode
          }
          if (res.data.courseType) {
            const typeArr = res.data.courseType.map(item => {
              return [item.firCode, item.secCode]
            })
            props.courseType = typeArr
          }
        }
      })
    },

    submitForm(callback) {
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
          data.courseNum = this.courseNum
          updateCourseItem(data).then(res => {
            if (res.code === 200) {
              if (callback) {
                callback(this.editId)
              } else {
                this.$message.success('更新成功！')
                this.closeCurrent()
              }
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addCourseItem(data).then(res => {
            if (res.code === 200) {
              if (callback) {
                callback(res.data)
              } else {
                this.$message.success('操作成功！')
                this.closeCurrent()
              }
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },

    /**
     * 提交审核
     */
    submitAndAudit() {
      this.submitForm((objectCode) => {
        const params = {
          courseCode: objectCode,
          status: 1
        }
        changeCourseStatus(params).then(res => {
          if (res.code === 200) {
            this.$message.success('操作成功！')
            this.closeCurrent()
          }
        })
      })
    },

    closeCurrent() {
      this.$refs.ImForm.reset()
      this.$router.replace({ name: 'CourseList' })
    }
  }
}
</script>
