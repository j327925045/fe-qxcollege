<template>
  <el-card>
    <ImForm ref="ImForm" :form="formConfig">
      <TagSelect slot="TagSelect" v-model="formConfig.props.tagDTOList" class="w-full" placeholder="请选择"></TagSelect>
      <EmployeeSelect slot="EmployeeSelect" v-model="formConfig.props.realAccountManagerCode" class="w-full" placeholder="请选择"></EmployeeSelect>
      <EmployeeSelect slot="EmployeeSelect1" v-model="formConfig.props.userOppositeDTOList" filterable multiple class="w-full" placeholder="请选择"></EmployeeSelect>
      <OrgInfoList slot="OrgInfoList" v-model="formConfig.props.userOrgInfoDTOList" class="w-full"></OrgInfoList>
      <h3 slot="baseInfoSlot" style="width: 100%" class="gyl-title"><i class="el-icon-s-order" />医生基本信息</h3>
      <h3 slot="orgInfoSlot" style="width: 100%" class="gyl-title"><i class="el-icon-s-order" />所在机构信息</h3>
      <h3 slot="hospitalzizhiSlot" style="width: 100%" class="gyl-title"><i class="el-icon-s-order" />医生资质信息</h3>
    </ImForm>
  </el-card>
</template>

<script>
import EmployeeSelect from '@/views/components/EmployeeSelect'
import TagSelect from './TagSelect'
import OrgInfoList from './OrgInfoList.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'DoctorInfoForm',
  components: {
    EmployeeSelect,
    TagSelect,
    OrgInfoList
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
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
          doctorProfile: undefined,
          doctorIntroduction: undefined, // WYF医生介绍
          tagDTOList: undefined,
          realAccountManagerCode: undefined, // WYF客户经理
          userOppositeDTOList: undefined, // WYF对接人名字
          occupationalClassification: undefined, // 执业分类
          realJobTitle: undefined, // 职称
          realEmploymentIndustryAssociations: undefined, // 行业协会任职信息
          userOrgInfoDTOList: undefined, // 所属机构列表
          realDoctorPracticeCertificate: undefined,
          realPracticeCertificateCode: undefined, // 医师执业证书编号
          realAddress: undefined, // 执业地点
          realPracticeCategory: undefined, // 执业类别
          realPracticeArea: undefined, // 执业范围
          realDoctorQualificationCertificate: undefined, // 医师资格证书
          realQualificationCode: undefined, // 医师资格证书编号
          realIdNumber: undefined, // 身份证号
          realEducation: undefined, // 学历
          realGraduationSchool: undefined, // 毕业学校
          realCategory: undefined, // 类别
          realMajor: undefined // 专业
        },
        formItems: [
          {
            type: 'ImSlot',
            notInForm: true,
            slots: {
              secondSlot: 'baseInfoSlot'
            }
          },
          {
            type: 'ImInput',
            prop: 'doctorProfile',
            label: '医生简介',
            span: 24,
            attrs: {
              type: 'textarea',
              style: 'width: 50%',
              placeholder: '请输入医生简介',
              maxLength: 500
            }
          },
          {
            type: 'ImImgUpload',
            prop: 'doctorIntroduction',
            label: '医生介绍',
            span: 24,
            attrs: {
              style: 'width: 50%',
              placeholder: '请输入'
            }
          },
          {
            type: 'ImSlot',
            prop: 'tagDTOList',
            label: '医生标签',
            slots: {
              slot: 'TagSelect'
            }
          },
          {
            type: 'ImSlot',
            prop: 'realAccountManagerCode',
            label: '客户经理',
            rules: [{ required: true, message: '请选择客户经理' }],
            slots: {
              slot: 'EmployeeSelect'
            }
          },
          {
            type: 'ImSlot',
            prop: 'userOppositeDTOList',
            label: '对接人',
            slots: {
              slot: 'EmployeeSelect1'
            }
          },
          {
            type: 'ImSelect',
            prop: 'occupationalClassification',
            label: '执业分类',
            rules: [{ required: true, message: '请选择执业分类' }],
            attrs: {
              placeholder: '请选择',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'realJobTitle',
            label: '职称',
            hidden: this.isEdit,
            rules: [{ required: true, message: '请选择职称' }],
            attrs: {
              placeholder: '请选择职称',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImInput',
            prop: 'realEmploymentIndustryAssociations',
            label: '行业协会任职信息',
            hidden: this.isEdit,
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImSlot',
            notInForm: true,
            hidden: this.isEdit,
            slots: {
              slot: 'orgInfoSlot'
            }
          },
          {
            type: 'ImSlot',
            span: 24,
            lebel: '所在机构信息',
            props: 'userOrgInfoDtoList',
            // hidden: this.isEdit,
            slots: {
              sort: 'OrgInfoList'
            }
          },
          {
            type: 'ImSlot',
            notInForm: true,
            hidden: this.isEdit,
            slots: {
              slot: 'hospitalzizhiSlot'
            }
          },
          {
            type: 'ImImgUpload',
            prop: 'realDoctorPracticeCertificate',
            label: '医师执业证书',
            hidden: this.isEdit,
            span: 24,
            rules: [{ required: true, message: '请上传医师执业证书', trigger: 'change' }]
          },
          {
            type: 'ImInput',
            prop: 'realPracticeCertificateCode',
            label: '医师执业证书编号',
            hidden: this.isEdit,
            rules: [{ required: true, message: '请输入医师执业证书编号' }, 'number'],
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realAddress',
            label: '执业地点',
            hidden: this.isEdit,
            rules: [{ required: true, message: '请输入执业地点' }],
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realPracticeCategory',
            rules: [{ required: true, message: '请输入执业类别' }],
            label: '执业类别',
            hidden: this.isEdit,
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realPracticeArea',
            rules: [{ required: true, message: '请输入执业范围' }],
            label: '执业范围',
            hidden: this.isEdit,
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImImgUpload',
            prop: 'realDoctorQualificationCertificate',
            span: 24,
            hidden: this.isEdit,
            rules: [{ required: true, message: '请上传医师资格证书' }],
            label: '医师资格证书'
          },
          {
            type: 'ImInput',
            prop: 'realQualificationCode',
            label: '医师资格证书编号',
            hidden: this.isEdit,
            rules: [{ required: true, message: '请输入医师资格证书编号' }, 'number'],
            attrs: {
              maxLength: 27,
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realIdNumber',
            hidden: this.isEdit,
            rules: [{ required: true, message: '请输入身份证号' }, 'idcard'],
            label: '身份证号',
            attrs: {
              maxLength: 18,
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realEducation',
            hidden: this.isEdit,
            rules: [{ required: true, message: '请输入学历' }],
            label: '学历',
            attrs: {
              placeholder: '请输入',
              class: 'w-full'
            }
          },
          {
            type: 'ImInput',
            prop: 'realGraduationSchool',
            label: '毕业学校',
            hidden: this.isEdit,
            rules: [{ required: true, message: '请输入毕业学校' }],
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realCategory',
            label: '类别',
            hidden: this.isEdit,
            rules: [{ required: true, message: '请输入类别' }],
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realMajor',
            label: '专业',
            hidden: this.isEdit,
            rules: [{ required: true, message: '请输入专业' }],
            attrs: {
              placeholder: '请输入'
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
    setOptions() {
      this.setFormPropOptions('occupationalClassification', this.enums.realPracticeCategory) // 执业类别
      this.setFormPropOptions('realJobTitle', this.enums.jobTitle) // 职称
    },
    setFormPropOptions(prop, options) {
      const formItems = this.formConfig.formItems
      const item = formItems.find((item) => item.prop === prop)
      item.attrs.options = options
    },
    validate() {
      return new Promise((resolve) => {
        this.$refs.ImForm.validate((valid) => {
          resolve({ valid: valid, data: this.formConfig.props })
        })
      })
    }
  }
}
</script>
