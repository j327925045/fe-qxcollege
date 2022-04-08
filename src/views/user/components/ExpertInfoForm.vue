<template>
  <el-card>
    <ImForm ref="ImForm" :form="formConfig">
      <h3 slot="expertsSlot" class="gyl-title"><i class="el-icon-s-order" />专家信息</h3>
      <NeedleHabit slot="userHabitAddDTOListSort" v-model="formConfig.props.userHabitAddDTOList" class="w-full"></NeedleHabit>
    </ImForm>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'

import NeedleHabit from './NeedleHabit'
export default {
  name: 'ExpertInfoForm',
  components: { NeedleHabit },
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
          expertSpecificationsHandWashingClothes: '', // 吸收衣规格
          expertGloveSpecification: '', // 手套规格
          expertDisinfectantPreference: '', // 消毒剂偏好
          userHabitAddDTOList: [], // 针头习惯
          expertStandardAccommodation: '', // 舱位标准
          expertAirlinePreference: '', // 航司偏好
          expertHotelPreference: '', // 酒店偏好
          expertEatingHabits: '', // 饮食偏好
          expertDrinkingPreference: '', // 饮酒偏好
          personalTaboo: '', // 个人禁忌
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
            span: 24,
            prop: 'userHabitAddDTOList',
            label: '针头习惯',
            slots: {
              sort: 'userHabitAddDTOListSort'
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
            type: 'ImInput',
            prop: 'expertAirlinePreference',
            label: '航司偏好',
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'expertHotelPreference',
            label: '酒店偏好',
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'expertEatingHabits',
            label: '饮食偏好',
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'expertDrinkingPreference',
            label: '饮酒偏好',
            attrs: {
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
            prop: 'personalTaboo',
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
  },
  created() {
    this.setOptions()
  },
  methods: {
    setOptions() {
      this.setFormPropOptions('expertSpecificationsHandWashingClothes', this.enums.expertSpecificationsHandWashingClothes) // 洗手衣规格
      this.setFormPropOptions('expertGloveSpecification', this.enums.expertGloveSpecification) // 手套规格
      this.setFormPropOptions('expertDisinfectantPreference', this.enums.expertDisinfectantPreference) // 消毒剂偏好
      this.setFormPropOptions('expertStandardAccommodation', this.enums.expertStandardAccommodation) // 舱位标准
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
