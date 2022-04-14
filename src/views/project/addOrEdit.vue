<template>

  <ImWrapper>
    <div class="bg-white p-4 mb-[32px]">
      <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />项目信息</h3>
      <ImForm
        ref="ImForm"
        :form="formConfig"
      >
        <!-- <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />项目信息</h3> -->
        <OrganizationSelect
          slot="OrganizationSelect"
          v-model="formConfig.props.organizationCode"
          placeholder="请选择"
        ></OrganizationSelect>
        <ProjectProductArr
          slot="projectProductArr"
          v-model="formConfig.props.projectProductArr"
          class="w-full"
          placeholder="请选择产品"
        ></ProjectProductArr>
        <DoctorFristArr
          slot="doctorFristArr"
          v-model="formConfig.props.foundingCode"
          class="w-full"
          placeholder="请选择创始医生"
        >
        </DoctorFristArr>
        <DoctorFristALLArr
          slot="doctorFristALLArr"
          v-model="formConfig.props.projectConsensusCodeList"
          class="w-full"
          placeholder="请选择共识医生"
        >
        </DoctorFristALLArr>
        <RichTextArea slot="RichTextArea" v-model="formConfig.props.projectIntroduce"></RichTextArea>
      </ImForm>
    </div>
    <div class="fixed bottom-0 text-right right-0 w-full p-2 bg-white shadow-dark-50 shadow-2xl">
      <el-button @click="closeDrower">取 消</el-button>
      <el-button type="primary" @click="submitForm">保 存</el-button>
    </div>
  </ImWrapper>
</template>

<script>
import { addProjectItem, getProjectDetail, updateProjectItem } from '@/api/project'
import { mapGetters } from 'vuex'
import RichTextArea from '@/views/components/RichTextArea'

import OrganizationSelect from '@/views/components/OrganizationSelect'
import ProjectProductArr from './components/ProjectProductList'
import DoctorFristArr from './components/DoctorFristArr'
import DoctorFristALLArr from './components/DoctorFristALLArr'
export default {
  name: 'AddOrEdit',

  components: {
    DoctorFristALLArr,
    DoctorFristArr,
    ProjectProductArr,
    OrganizationSelect,
    RichTextArea
  },
  data() {
    return {
      drawerVisible: false,
      editId: this.$route.query.objectCode,
      formConfig: {
        // column: 3,
        attrs: {
          labelWidth: '140px',
          labelPosition: 'right'
        },
        props: {
          projectConsensusCodeList: [],
          projectProductArr: '',
          foundingCode: '',
          name: '', // 名称
          remark: '', // 项目介绍
          //
          projectCode: undefined,
          projectDeteils: undefined,
          projectIntroduce: undefined,
          projectPictureUrl: undefined

        },
        formItems: [
          {
            type: 'ImInput',
            prop: 'name',
            label: '项目名称',
            rules: [{ required: true, message: '请输入项目名称' }],
            span: 8,
            attrs: {
              maxLength: 128,
              type: 'text',
              placeholder: '请输入项目名称'
            }
          },

          {
            type: 'ImSlot',
            prop: 'projectProductArr',
            label: '产品列表',
            // rules: [{ required: true, message: '请选择机构' }],
            span: 24,
            style: 'width:33%',
            slots: {
              multiple: true,
              projectProductListSlot: 'projectProductArr',
              options: []
            }
          },
          {
            type: 'ImSlot',
            prop: 'foundingCode',
            label: '创始医生',
            span: 24,
            style: 'width:33%',
            // rules: [{ required: true, message: '请选择机构' }],
            slots: {
              multiple: true,
              doctorFristSlot: 'doctorFristArr',
              options: []
            }
          },
          {
            type: 'ImSlot',
            prop: 'projectConsensusCodeList',
            label: '共识医生',
            span: 24,
            style: 'width:33%',
            // rules: [{ required: true, message: '请选择机构' }],
            slots: {
              multiple: true,
              doctorFristALLArrSlot: 'doctorFristALLArr',
              options: []
            }
          },

          {
            type: 'ImImgUpload',
            prop: 'projectPictureUrl',
            label: '项目图片'
          },
          {
            type: 'ImInput',
            prop: 'projectDeteils',
            label: '项目明细',
            // rules: [{ required: true, message: '请输入' }],
            span: 24,
            attrs: {
              maxLength: 500,
              type: 'textarea',
              rows: 4,
              placeholder: '请输入',
              size: 'medium',
              showWordLimit: true
            }
          },
          {
            type: 'ImSlot',
            prop: 'projectIntroduce',
            label: '项目介绍',
            span: 24,
            // rules: [{ required: true, message: '请输入项目介绍' }],
            slots: {
              projectIntroduce: 'RichTextArea'
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
    if (this.editId) {
      this.getItemDetail()
    }
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
      console.log(item.attrs)
      item.attrs.options = options
    },
    /**
     * 获取详情
     */
    getItemDetail() {
      getProjectDetail({ objectCode: this.editId }).then(res => {
        res.data.projectProductArr = [...new Set(res.data.projectProductCodeArr)]
        res.data.projectConsensusCodeList = res.data.projectConsensusAddDTOList.map(x => x.consensusCode)
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
      console.log('提交')
      this.$refs.ImForm.validate(valid => {
        if (!valid) {
          this.$message('请检查表单项！')
          return
        }
        console.log(this.formConfig.props.projectConsensusCodeList)
        if (this.formConfig.props.projectProductArr) {
          const projectList = []
          this.formConfig.props.projectProductArr.forEach(function(val, key, arr) {
            projectList.push({ productCode: val + '' })
          })
          this.formConfig.props.projectProductList = projectList
        }
        if (this.formConfig.props.projectProductArr) {
          const projectList = []
          this.formConfig.props.projectProductArr.forEach(function(val, key, arr) {
            projectList.push({ productCode: val + '' })
          })
          this.formConfig.props.projectProductList = projectList
        }

        delete this.formConfig.props.projectProductArr
        const data = {
          ...this.formConfig.props
        }
        if (this.editId) {
          data.objectCode = this.editId
          updateProjectItem(data).then(res => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          console.log('走进新增项目')
          addProjectItem(data).then(res => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },

    /**
     * 关闭弹层
     */
    closeDrower() {
      this.$refs.ImForm.reset()
      this.$router.push({ name: 'ProjectList' })
    }
  }
}
</script>
