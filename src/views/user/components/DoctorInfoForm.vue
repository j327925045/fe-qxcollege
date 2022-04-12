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
    const idCardValidity = (rule, code, callback) => {
      const city = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外 ' }
      let tip = ''
      let pass = true
      if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = '身份证号格式错误'
        pass = false
      } else if (!city[code.substr(0, 2)]) {
        // tip = "地址编码错误"
        tip = '身份证输入错误'
        pass = false
      } else {
        // 18位身份证需要验证最后一位校验位
        if (code.length === 18) {
          code = code.split('')
          // ∑(ai×Wi)(mod 11)
          // 加权因子
          const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
          // 校验位
          const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
          let sum = 0
          let ai = 0
          let wi = 0
          for (let i = 0; i < 17; i++) {
            ai = code[i]
            wi = factor[i]
            sum += ai * wi
          }
          const last = parity[sum % 11]
          if (parity[sum % 11] != code[17]) {
            // tip = "校验位错误"
            tip = '身份证输入错误'
            pass = false
          }
        }
      }
      if (!pass) {
        callback(new Error(tip))
      } else {
        callback()
      }
    }

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
              placeholder: '请输入医生简介'
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
            rules: [{ required: true, message: '请输入身份证号', min: 18 }, {
              pattern: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
              message: '请输入正确的证件号'
            },
            { validator: idCardValidity, trigger: 'blur' }],
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
