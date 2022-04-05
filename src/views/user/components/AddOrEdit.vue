<template>
  <ImDrawer
    :visible.sync="drawerVisible"
    :title="editId ? '编辑医生' : '新建医生'"

    @closeDrower="closeDrower"
    @submit="submitForm"
  >
    <ImForm ref="ImForm" :form="formConfig">
      <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />个人信息</h3>
      <h3 slot="professionalSlot" class="gyl-title"><i class="el-icon-s-order" />医生信息</h3>
      <h3 slot="expertSlot" class="gyl-title"><i class="el-icon-s-order" />专家信息</h3>
      <!-- <input slot="realOppositePersonSlot" v-model="formConfig.props.realOppositePerson" type="text"> -->
      <HospitalSelect slot="hospitalSelect" v-model="formConfig.props.realHospitalCode" class="w-full" placeholder="请选择医院"></HospitalSelect>
      <RegionCascader slot="RegionCascader" v-model="formConfig.props.regionCode" class="w-full" placeholder="请输入所在区域(省市县)"></RegionCascader>
    </ImForm>
  </ImDrawer>
</template>

<script>
import { addUserItem, getUserDetail, updateUserItem } from '@/api/user'
import { mapGetters } from 'vuex'
import HospitalSelect from '@/views/components/HospitalSelect'
import RegionCascader from '@/views/components/RegionCascader'
import ImDrawer from '@/views/components/ImDrawer'
import ImForm from '@/views/components/ImForm/index'
export default {
  name: 'AddOrEdit',
  components: {
    ImDrawer,
    ImForm,
    HospitalSelect,
    RegionCascader
  },
  data() {
    return {
      drawerVisible: false,
      editId: undefined,
      formConfig: {
        // column: 3,
        attrs: {
          labelWidth: '140px',
          labelPosition: 'right'
        },
        props: {
          realName: '',
          nickname: '',
          gender: '',
          birthday: '',
          phone: undefined,
          personalUrl: undefined,
          realAccountManager: undefined, // WYF客户经理
          realOppositePerson: undefined, // WYF对接人名字
          doctorProfile: undefined, // WYF医生简介
          doctorLabel: undefined, // WYF医生标签
          doctorIntroduction: undefined, // WYF医生介绍
          realHospitalCode: undefined, // 医院
          realDepartment: undefined, // 科室
          realJobTitle: undefined, // 职称
          realPracticeCertificateCode: undefined, // 医师执业证书编号
          realAddress: undefined, // 执业地点
          realCategory: undefined, // 类别
          realPracticeArea: undefined, // 职业范围
          // realQualificationCode: undefined, // 医生资格证书
          realIdNumber: undefined, // 身份证号
          realQualificationCode: undefined, // 医师资格证书编号
          realEducation: undefined, // 学历
          realGraduationSchool: undefined, // 毕业学校
          realPracticeCategory: undefined, // 类别
          realMajor: undefined, // 专业
          doctorLevel: undefined, // 医师级别
          expertSpecificationsHandWashingClothes: undefined, // 吸收衣规格
          expertGloveSpecification: undefined, // 手套规格
          expertDisinfectantPreference: undefined, // 消毒剂偏好
          expertNeedleHabit: undefined, // 枕头习惯
          expertStandardAccommodation: undefined, // 舱位标准
          expertAirlinePreference: undefined, // 航司偏好
          expertHotelPreference: undefined, // 酒店偏好
          expertEatingHabits: undefined, // 饮食偏好
          expertDrinkingPreference: undefined, // 饮酒偏好
          expertHobby: undefined, // 兴趣爱好

          regionCode: undefined
          // realAddress: undefined
          // isCertified: undefined,
          // isCooperation: undefined,
          // isLecturer: undefined,
          // isQualification: undefined,
          // personalIntroduction: undefined,
          // testSlot: ''
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
          },
          {
            type: 'ImInput',
            prop: 'personalUrl',
            label: '个人照片',
            rules: ['url'],
            attrs: {
              type: 'text',
              placeholder: '请输入个人照片URL'
            }
          },
          {
            type: 'ImSlot',
            notInForm: true,
            slots: {
              secondSlot: 'professionalSlot'
            }
          },
          // {
          //   type: 'ImSelect',
          //   prop: 'realJobTitle',
          //   label: '职称',
          //   attrs: {
          //     placeholder: '请选择职称',
          //     clearable: true,
          //     class: 'w-full',
          //     options: []
          //   }
          // },
          {
            type: 'ImSelect',
            prop: 'realAccountManager',
            label: '客户经理',
            attrs: {
              placeholder: '请选择客户经理',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'realOppositePerson',
            label: '对接人',
            attrs: {
              placeholder: '请选择对接人',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          // {
          //   type: 'ImSlot',
          //   prop: 'realOppositePerson',
          //   label: '对接人',

          //   slots: {
          //     slot: 'realOppositePersonSlot'
          //   }
          // },
          {
            type: 'ImInput',
            prop: 'doctorProfile',
            label: '医生简介',
            attrs: {
              placeholder: '请输入医生简介'
            }
          },
          {
            type: 'ImSelect',
            prop: 'doctorLabel',
            label: '医生标签',
            attrs: {
              placeholder: '请选择',
              clearable: true,
              class: 'w-full',
              options: []
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
            prop: 'realHospitalCode',
            label: '医院',
            // rules: [{ required: true, message: '请选择医院' }],
            slots: {
              hospitalSlot: 'hospitalSelect'
            }
          },
          {
            type: 'ImSelect',
            prop: 'realDepartment',
            label: '科室',
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
            attrs: {
              placeholder: '请选择职称',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImInput',
            prop: 'realPracticeCertificateCode',
            label: '医师执业证书编号',
            attrs: {
              placeholder: '请输入医师执业证书编号'
            }
          },
          {
            type: 'ImSlot',
            prop: 'regionCode',
            label: '所在区域(省市县)',
            slots: {
              regionSlot: 'RegionCascader'
            }
          },
          {
            type: 'ImInput',
            prop: 'realAddress',
            label: '执业地点(详细地址)',
            attrs: {
              placeholder: '请输入执业地点(详细地址)'
            }
          },
          {
            type: 'ImSelect',
            prop: 'realPracticeCategory',
            label: '执业类别',
            attrs: {
              placeholder: '请选择执业类别',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          // {
          //   type: 'ImInput',
          //   prop: 'realPracticeCategory',
          //   label: '执业类别',
          //   attrs: {
          //     placeholder: '请输入执业类别'
          //   }
          // },
          {
            type: 'ImSelect',
            prop: 'realPracticeArea',
            label: '执业范围',
            attrs: {
              placeholder: '请选择执业范围',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          // {
          //   type: 'ImInput',
          //   prop: 'realPracticeArea',
          //   label: '执业范围',
          //   attrs: {
          //     placeholder: '请输入执业范围'
          //   }
          // },
          // {
          //   type: 'ImInput',
          //   prop: 'realQualificationCode',
          //   label: '医师资格证书',
          //   attrs: {
          //     placeholder: '请输入医师资格证书'
          //   }
          // },
          {
            type: 'ImInput',
            prop: 'realIdNumber',
            label: '身份证号',
            attrs: {
              placeholder: '请输入身份证号'
            }
          },
          {
            type: 'ImInput',
            prop: 'realQualificationCode',
            label: '医师资格证书编号',
            attrs: {
              placeholder: '请输入医师资格证书编号'
            }
          },
          {
            type: 'ImSelect',
            prop: 'realEducation',
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
            attrs: {
              placeholder: '请输入毕业学校'
            }
          },
          {
            type: 'ImSelect',
            prop: 'realCategory',
            label: '类别',
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
            attrs: {
              placeholder: '请选择专业',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          // {
          //   type: 'ImInput',
          //   prop: 'realGraduationSchool',
          //   label: '医师执业证书',
          //   attrs: {
          //     placeholder: '请输入医师执业证书'
          //   }
          // },
          {
            type: 'ImSlot',
            notInForm: true,
            slots: {
              shot: 'expertSlot'
            }
          },
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
            type: 'ImSelect',
            prop: 'expertNeedleHabit',
            label: '针头习惯',
            attrs: {
              placeholder: '请选择',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
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
            type: 'ImSelect',
            prop: 'expertAirlinePreference',
            label: '航司偏好',
            attrs: {
              placeholder: '请选择',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'expertHotelPreference',
            label: '酒店偏好',
            attrs: {
              placeholder: '请选择',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'expertEatingHabits',
            label: '饮食偏好',
            attrs: {
              placeholder: '请选择',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'expertDrinkingPreference',
            label: '饮酒偏好',
            attrs: {
              placeholder: '请选择',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImInput',
            prop: 'expertHobby',
            label: '兴趣爱好',
            attrs: {
              placeholder: '请输入兴趣爱好'
            }
          }
          // {
          //   type: 'ImSelect',
          //   prop: 'isCooperation',
          //   label: '是否合作项目',
          //   attrs: {
          //     placeholder: '请选择是否合作项目',
          //     clearable: true,
          //     class: 'w-full',
          //     options: []
          //   }
          // },
          // {
          //   type: 'ImSelect',
          //   prop: 'isLecturer',
          //   label: '是否讲师',
          //   attrs: {
          //     placeholder: '请选择是否讲师',
          //     clearable: true,
          //     class: 'w-full',
          //     options: []
          //   }
          // },
          // {
          //   type: 'ImSelect',
          //   prop: 'isQualification',
          //   label: '资质认证',
          //   attrs: {
          //     placeholder: '请选择资质认证',
          //     clearable: true,
          //     class: 'w-full',
          //     options: []
          //   }
          // },
          // {
          //   type: 'ImInput',
          //   prop: 'personalIntroduction',
          //   label: '个人介绍',
          //   attrs: {
          //     placeholder: '请输入个人介绍'
          //   }
          // }
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
      // doctorLabel expertNeedleHabit
      this.setFormPropOptions('gender', this.enums.gender) // 男女
      this.setFormPropOptions('doctorLevel', this.enums.doctorLevel)// 医生等级
      this.setFormPropOptions('doctorLabel', this.enums.doctorLabel)// 医生等级
      this.setFormPropOptions('realJobTitle', this.enums.jobTitle) //
      // this.setFormPropOptions('isCertified', this.enums.isCertified)
      this.setFormPropOptions('realAccountManager', this.enums.realAccountManager)// 客户经理
      this.setFormPropOptions('realOppositePerson', this.enums.realOppositePerson)// 对接人
      this.setFormPropOptions('realDepartment', this.enums.realDepartment)// 科室
      this.setFormPropOptions('realEducation', this.enums.realEducation)// 学历
      this.setFormPropOptions('realCategory', this.enums.realCategory)// 类别
      this.setFormPropOptions('realPracticeCategory', this.enums.realPracticeCategory)// 执业类别
      this.setFormPropOptions('realPracticeArea', this.enums.realPracticeArea)// 执业范围
      this.setFormPropOptions('realMajor', this.enums.realMajor)// 专业
      this.setFormPropOptions('expertSpecificationsHandWashingClothes', this.enums.expertSpecificationsHandWashingClothes)// 洗手衣规格
      this.setFormPropOptions('expertGloveSpecification', this.enums.expertGloveSpecification)// 手套规格
      this.setFormPropOptions('expertDisinfectantPreference', this.enums.expertDisinfectantPreference)// 消毒剂偏好
      this.setFormPropOptions('expertNeedleHabit', this.enums.expertNeedleHabit)// 针头习惯
      this.setFormPropOptions('expertStandardAccommodation', this.enums.expertStandardAccommodation)// 舱位标准
      this.setFormPropOptions('expertAirlinePreference', this.enums.expertAirlinePreference)// 航司偏好
      this.setFormPropOptions('expertHotelPreference', this.enums.expertHotelPreference)// 酒店偏好
      this.setFormPropOptions('expertEatingHabits', this.enums.expertEatingHabits)// 饮食偏好
      this.setFormPropOptions('expertDrinkingPreference', this.enums.expertDrinkingPreference)// 饮食偏好
      this.setFormPropOptions('expertHobby', this.enums.expertHobby)// 饮食偏好
      // this.setFormPropOptions('isCooperation', this.enums.isCooperation)
      // this.setFormPropOptions('isLecturer', this.enums.isLecturer)
      // this.setFormPropOptions('isQualification', this.enums.isQualification)
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
      getUserDetail({ objectCode: this.editId }).then(res => {
        if (res.code === 200) {
          const props = this.formConfig.props
          const keys = Object.keys(props)
          // 直接遍历进行赋值，特殊属性需要单独拿出来处理
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            props[key] = res.data[key] + '' || undefined
          }
        }
      })
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
        if (this.editId) {
          data.objectCode = this.editId
          updateUserItem(data).then(res => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addUserItem(data).then(res => {
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
