<template>
  <section>
    <ImWrapper>
      <div class="box">
        <ImForm ref="ImForm1" :form="formConfig1">
          <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />个人信息</h3>
        </ImForm>
        <ImForm ref="ImForm2" :form="formConfig2">
          <h3 slot="professionalSlot" style="width: 100%" class="gyl-title"><i class="el-icon-s-order" />医生信息</h3>
          <doctorLabelSelectMore slot="doctorLabelSort" v-model="formConfig2.props.doctorLabel" class="w-full" placeholder="请选择医生标签"></doctorLabelSelectMore>
          <EmployeeSelect slot="realAccountManagerSort" v-model="formConfig2.props.realAccountManagerCode" class="w-full" placeholder="请选择客户经理"></EmployeeSelect>
          <SelectItemList slot="userOrgInfoDTOListSort" v-model="formConfig2.props.userOrgInfoDTOList" class="w-full"></SelectItemList>
          <SelectSearchMore
            slot="realOppositePersonSort"
            v-model="formConfig2.props.userOppositeDTOList"
            class="w-full"
            placeholder="请选择对接人"
            @change="realOppositePersonChange"
          ></SelectSearchMore>
          <h3 slot="hospitalzizhiSlot" style="width: 100%" class="gyl-title"><i class="el-icon-s-order" />医生资质信息</h3>
        </ImForm>
        <ImForm ref="ImForm3" :form="formConfig3">
          <h3 slot="expertsSlot" class="gyl-title"><i class="el-icon-s-order" />专家信息</h3>
          <zhen slot="expertNeedleHabitSort" v-model="formConfig3.props.expertNeedleHabit" class="w-full"></zhen>
        </ImForm>
      </div>
    </ImWrapper>
    <div class="btnWrap">
      <el-row>
        <el-button>取消</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-row>
    </div>
  </section>
</template>

<script>
import { addUserItem, getUserDetail, updateUserItem } from '@/api/user'
import { mapGetters } from 'vuex'
import SelectSearchMore from './components/SelectSearchMore'
import EmployeeSelect from '@/views/components/EmployeeSelect'
import doctorLabelSelectMore from './components/doctorLabelSelectMore'
import SelectItemList from './components/OrgInfoList.vue'
import zhen from './components/NeedleHabit.vue'
export default {
  name: 'UserCreate-nocache',
  components: {
    SelectSearchMore,
    EmployeeSelect,
    doctorLabelSelectMore,
    SelectItemList,
    zhen
  },
  data() {
    return {
      drawerVisible: true,
      editId: undefined,
      btnFont: '下一步',
      count: 1,
      formConfig1: {
        column: 3,
        attrs: {
          labelWidth: '140px',
          labelPosition: 'right'
        },
        props: {
          phone: '', // 手机号
          realName: '', // 姓名
          nickname: '', // 昵称
          gender: '', // 性别
          birthday: '', // 生日
          doctorLevel: undefined, // 医师级别
          personalUrl: '' // 上传照片
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
            prop: 'phone',
            label: '手机号',
            rules: [{ required: true, message: '请输入手机号' }, 'phone'],
            attrs: {
              type: 'text',
              placeholder: '请输入手机号码',
              maxLength: 11
            }
          },
          {
            type: 'ImInput',
            prop: 'realName',
            label: '姓名',
            rules: [{ required: true, message: '请输入真实姓名' }],
            attrs: {
              type: 'text',
              placeholder: '请输入真实姓名'
            }
          },

          {
            type: 'ImInput',
            prop: 'nickname',
            label: '昵称',
            // rules: [{ required: true, message: '请输入昵称' }],
            attrs: {
              type: 'text',
              placeholder: '请输入昵称'
            }
          },
          {
            type: 'ImSelect',
            prop: 'gender',
            label: '性别',
            // rules: [{ required: true, message: '请选择性别' }],
            attrs: {
              placeholder: '请选择性别',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImDatePicker',
            prop: 'birthday',
            label: '出生日期',
            attrs: {
              type: 'date',
              style: 'width: 100%',
              valueFormat: 'yyyy-MM-dd',
              placeholder: '请选择出生日期'
            }
          },
          {
            type: 'ImSelect',
            prop: 'doctorLevel',
            label: '医生等级',
            rules: [{ required: true, message: '请选择医生等级' }],
            attrs: {
              placeholder: '请选择医生等级',
              clearable: true,
              class: 'w-full',
              options: []
            }
            //  listeners: {
            //   change:this.change
            // }
          },
          {
            type: 'ImInput',
            prop: 'personalUrl',
            label: '个人照片',
            // rules: ['url'],
            attrs: {
              type: 'text',
              placeholder: '请输入个人照片URL'
            }
          }
        ]
      },
      formConfig2: {
        column: 3,
        attrs: {
          labelWidth: '140px',
          labelPosition: 'right'
        },
        props: {
          doctorProfile: '', // WYF医生简介
          doctorIntroduction: '', // WYF医生介绍
          // doctorLabel: '', // WYF医生标签
          tagDTOList: [],
          realAccountManagerCode: '', // WYF客户经理
          userOppositeDTOList: [], // WYF对接人名字
          // realPracticeCategory: '', // 执业类别
          realJobTitle: '', // 职称
          realEmploymentIndustryAssociations: '', // 行业协会任职信息
          userOrgInfoDTOList: [], // 所属机构列表
          realDoctorPracticeCertificate: '',
          realPracticeCertificateCode: '', // 医师执业证书编号
          realAddress: '', // 执业地点
          realPracticeCategory: '', // 执业类别
          realPracticeArea: '', // 职业范围
          realDoctorQualificationCertificate: '', // 医师资格证书
          realQualificationCode: '', // 医师资格证书编号
          realIdNumber: '', // 身份证号
          realEducation: '', // 学历
          realGraduationSchool: '', // 毕业学校
          realCategory: '', // 类别
          realMajor: '' // 专业
        },
        formItems: [
          {
            type: 'ImSlot',
            notInForm: true,
            slots: {
              secondSlot: 'professionalSlot'
            }
          },
          {
            type: 'ImInput',
            prop: 'doctorProfile',
            label: '医生简介',
            attrs: {
              placeholder: '请输入医生简介'
            }
          },
          {
            type: 'ImInput',
            prop: 'doctorIntroduction',
            label: '医生介绍',
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImSlot',
            prop: 'tagDTOList',
            label: '医生标签',

            slots: {
              slot: 'doctorLabelSort'
            }
          },
          {
            type: 'ImSlot',
            prop: 'realAccountManagerCode',
            label: '客户经理',
            rules: [{ required: true, message: '请选择客户经理' }, 'realAccountManagerCode'],
            slots: {
              slot: 'realAccountManagerSort'
            }
          },
          {
            type: 'ImSlot',
            prop: 'userOppositeDTOList',
            label: '对接人',

            slots: {
              slot: 'realOppositePersonSort'
            }
          },
          {
            type: 'ImSelect',
            prop: 'realPracticeCategory',
            label: '执业类别',
            rules: [{ required: true, message: '请选择执业类别' }, 'realPracticeCategory'],
            attrs: {
              placeholder: '请选择执业类别',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'realJobTitle',
            label: '职称',
            rules: [{ required: true, message: '请选择职称' }, 'realJobTitle'],
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
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImSlot',
            notInForm: true,
            slots: {
              sort: 'userOrgInfoDTOListSort'
            }
          },
          {
            type: 'ImSlot',
            notInForm: true,
            slots: {
              secondSlot: 'hospitalzizhiSlot'
            }
          },
          {
            type: 'ImInput',
            prop: 'realDoctorPracticeCertificate',
            label: '医师执业证书',
            rules: [{ required: true, message: '请输入' }],
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realPracticeCertificateCode',
            label: '医师执业证书编号',
            rules: [{ required: true, message: '请输入' }],
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realAddress',
            label: '执业地点',
            rules: [{ required: true, message: '请输入' }],
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realPracticeCategory',
            rules: [{ required: true, message: '请输入' }],
            label: '执业类别',
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realDoctorQualificationCertificate',
            rules: [{ required: true, message: '请输入' }],
            label: '医师资格证书',
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realQualificationCode',
            label: '医师资格证书编号',
            rules: [{ required: true, message: '请输入' }],
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realIdNumber',
            rules: [{ required: true, message: '请输入' }],
            label: '身份证号',
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImSelect',
            prop: 'realEducation',
            rules: [{ required: true, message: '请选择' }, 'realEducation'],
            label: '学历',
            attrs: {
              placeholder: '请选择学历',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImInput',
            prop: 'realGraduationSchool',
            label: '毕业学校',
            rules: [{ required: true, message: '请输入' }],
            attrs: {
              placeholder: '请输入毕业学校'
            }
          },
          {
            type: 'ImSelect',
            prop: 'realCategory',
            label: '类别',
            rules: [{ required: true, message: '请选择' }, 'realCategory'],
            attrs: {
              placeholder: '请选择',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'realMajor',
            label: '专业',
            rules: [{ required: true, message: '请选择' }, 'realMajor'],
            attrs: {
              placeholder: '请选择专业',
              clearable: true,
              class: 'w-full',
              options: []
            }
          }
        ]
      },
      formConfig3: {
        column: 3,
        attrs: {
          labelWidth: '140px',
          labelPosition: 'right'
        },
        props: {
          expertSpecificationsHandWashingClothes: '', // 吸收衣规格
          expertGloveSpecification: '', // 手套规格
          expertDisinfectantPreference: '', // 消毒剂偏好
          expertNeedleHabit: [], // 针头习惯
          expertStandardAccommodation: '', // 舱位标准
          expertAirlinePreference: '', // 航司偏好
          expertHotelPreference: '', // 酒店偏好
          expertEatingHabits: '', // 饮食偏好
          expertDrinkingPreference: '', // 饮酒偏好
          expertHobby: '' // 兴趣爱好
        },
        formItems: [
          {
            type: 'ImSlot',
            notInForm: true,
            slots: {
              secondSlot: 'expertsSlot'
            }
          },
          // {
          //   type: 'ImInput',
          //   prop: 'personalUrl',
          //   label: '个人照片',
          //   // rules: ['url'],
          //   attrs: {
          //     type: 'text',
          //     placeholder: '请输入个人照片URL'
          //   }
          // },
          {
            type: 'ImSelect',
            prop: 'expertSpecificationsHandWashingClothes',
            label: '洗手衣规格',
            attrs: {
              placeholder: '请选择',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'expertGloveSpecification',
            label: '手套规格',
            attrs: {
              placeholder: '请选择',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'expertDisinfectantPreference',
            label: '消毒剂偏好',
            attrs: {
              placeholder: '请选择',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSlot',
            notInForm: true,
            slots: {
              sort: 'expertNeedleHabitSort'
            }
          },
          // {
          //   type: 'ImSort',
          //   prop: 'expertNeedleHabit',
          //   notInForm: true,
          //   label: '针头习惯',
          //   slots: {
          //     slot: 'expertNeedleHabitSort'
          //   }
          // },
          {
            type: 'ImSelect',
            prop: 'expertStandardAccommodation',
            label: '舱位标准',
            attrs: {
              placeholder: '请选择',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImInput',
            prop: 'expertAirlinePreference',
            label: '航司偏好',
            // rules: ['url'],
            attrs: {
              type: 'text',
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'expertHotelPreference',
            label: '酒店偏好',
            // rules: ['url'],
            attrs: {
              type: 'text',
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'expertEatingHabits',
            label: '饮食偏好',
            // rules: ['url'],
            attrs: {
              type: 'text',
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'expertDrinkingPreference',
            label: '饮酒偏好',
            // rules: ['url'],
            attrs: {
              type: 'text',
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'expertHobby',
            label: '兴趣爱好',
            attrs: {
              placeholder: '请输入兴趣爱好'
            }
          },
          {
            type: 'ImInput',
            prop: 'personal_taboo',
            label: '个人禁忌',
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

    // 写法跟method里面一样。这个名字随意取

    // 判断按钮显示隐藏
    // btnStatus: function() {
    //   if ((this.formConfig1.doctorLevel == 1) || (this.formConfig1.doctorLevel == 2 && this.count == 2) || (this.formConfig1.doctorLevel == 3 && this.count == 3)) {
    //     return 3
    //   } else if (this.formConfig1.doctorLevel == 3 && this.count == 2) {
    //     return 2
    //   } else {
    //     return 1
    //   }
    // }
  },
  created() {
    this.editId = this.$route.query.objectCode
    console.log(this.editId)
    if (this.editId) {
      this.getItemDetail()
    }
    this.setOptions1()
    this.setOptions2()
    this.setOptions3()
  },
  methods: {
    // change(val) {
    //   if (val == 1) {
    //     this.btnStatus = 3
    //   } else {
    //     this.btnStatus = 1
    //   }
    // },
    // next(val) {
    //   if (val == 'back') {
    //     if (this.formConfig1.props.doctorLevel == 2 || this.formConfig1.props.doctorLevel == 3) {
    //       this.count = 1
    //     } else if (this.formConfig1.props.doctorLevel == 1) {
    //       this.count = 1
    //     } else if (this.formConfig1.props.doctorLevel == 4 || this.formConfig1.props.doctorLevel == 5) {
    //       this.count = 2
    //     }
    //   } else {
    //     if (this.formConfig1.props.doctorLevel == 2 || this.formConfig1.props.doctorLevel == 3) {
    //       if (this.count == 1) {
    //         this.count = 2
    //       }
    //     } else if (this.formConfig1.props.doctorLevel == 1) {
    //       this.count = 1
    //     } else if (this.formConfig1.props.doctorLevel == 4 || this.formConfig1.props.doctorLevel == 5) {
    //       this.count = 3
    //     }
    //   }
    // },
    realOppositePersonChange(val) {
      console.log(val)
    },
    /**
     * 统一处理options
     */
    setOptions1() {
      this.setFormPropOptions1('gender', this.enums.gender) // 男女
      this.setFormPropOptions1('doctorLevel', this.enums.doctorLevel) // 医生等级
    },
    setOptions2() {
      this.setFormPropOptions2('realPracticeCategory', this.enums.realPracticeCategory) // 执业类别
      this.setFormPropOptions2('realJobTitle', this.enums.jobTitle) // 职称
      this.setFormPropOptions2('realEducation', this.enums.realEducation) // 学历
      this.setFormPropOptions2('realCategory', this.enums.realCategory) // 类别
      this.setFormPropOptions2('realMajor', this.enums.realMajor) // 专业
    },
    setOptions3() {
      this.setFormPropOptions3('expertSpecificationsHandWashingClothes', this.enums.expertSpecificationsHandWashingClothes) // 洗手衣规格
      this.setFormPropOptions3('expertGloveSpecification', this.enums.expertGloveSpecification) // 手套规格
      this.setFormPropOptions3('expertDisinfectantPreference', this.enums.expertDisinfectantPreference) // 消毒剂偏好
      // this.setFormPropOptions3('expertNeedleHabit', this.enums.expertNeedleHabit) // 针头习惯
      this.setFormPropOptions3('expertStandardAccommodation', this.enums.expertStandardAccommodation) // 舱位标准
    },

    /**
     * 设置form标单项的options，因为enums异步获取，因此这里需要手动指定一下
     * 放到计算属性会有prop绑定失效的问题
     */
    setFormPropOptions1(prop, options) {
      const formItems = this.formConfig1.formItems
      const item = formItems.find((item) => item.prop === prop)
      item.attrs.options = options
    },
    setFormPropOptions2(prop, options) {
      const formItems = this.formConfig2.formItems
      const item = formItems.find((item) => item.prop === prop)
      item.attrs.options = options
    },
    setFormPropOptions3(prop, options) {
      const formItems = this.formConfig3.formItems
      const item = formItems.find((item) => item.prop === prop)
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
      getUserDetail({ objectCode: this.editId }).then((res) => {
        if (res.code === 200) {
          const props1 = this.formConfig1.props

          const keys1 = Object.keys(props1)
          // 直接遍历进行赋值，特殊属性需要单独拿出来处理
          for (let i = 0; i < keys1.length; i++) {
            const key = keys1[i]
            props1[key] = res.data[key] + '' || undefined
          }

          const props2 = this.formConfig2.props

          const keys2 = Object.keys(props2)
          // 直接遍历进行赋值，特殊属性需要单独拿出来处理
          for (let i = 0; i < keys2.length; i++) {
            const key = keys2[i]
            props2[key] = res.data[key] + '' || undefined
          }

          const props3 = this.formConfig3.props

          const keys3 = Object.keys(props3)
          // 直接遍历进行赋值，特殊属性需要单独拿出来处理
          for (let i = 0; i < keys3.length; i++) {
            const key = keys3[i]
            props3[key] = res.data[key] + '' || undefined
          }
        }
      })
    },

    /**
     * 提交表单
     */
    submitForm() {
      // this.$refs.ImForm1.validate((valid)=>{
      //     if(!valid){
      //        this.$message('请检查表单项！')
      //     return
      //     }else{

      //     }
      // })

      this.$refs.ImForm1.validate((valid) => {
        if (!valid) {
          this.$message('请检查表单项！')
          return
        }
        const obj = Object.assign(this.formConfig1.props, this.formConfig2.props, this.formConfig3.props)
        console.log(obj)
        const data = {
          ...obj
        }
        // const data = {
        //   ...this.formConfig1.props
        // }
        if (this.editId) {
          data.objectCode = this.editId
          updateUserItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              // this.$emit('update')
              // this.closeDrower()
              this.$router.push('/user/list')
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addUserItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              // this.$emit('add')
              // this.closeDrower()
              this.$router.push('/user/list')
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
      this.drawerVisible = false
    }
  }
}
</script>
<style scoped>
.box {
  margin-bottom: 1rem;
  background: white;
}

.btnWrap {
  right: 0;

  /* position: fixed; */
  bottom: 0;
  width: 100%;
  padding: 1rem;
  text-align: right;
  background: #fff;
}
</style>
