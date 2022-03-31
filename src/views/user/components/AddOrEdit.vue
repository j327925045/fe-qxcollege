<template>
  <ImDrawer
    :visible.sync="drawerVisible"
    :title="editId ? '编辑医生' : '新建医生'"
    @closeDrower="closeDrower"
    @submit="submitForm"
  >
    <ImForm ref="ImForm" :form="formConfig">
      <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />个人信息</h3>
      <h3 slot="professionalSlot" class="gyl-title"><i class="el-icon-s-order" />职业信息</h3>
      <HospitalSelect slot="hospitalSelect" v-model="formConfig.props.hospitalCode" class="w-full" placeholder="请选择医院"></HospitalSelect>
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
          hospitalCode: undefined,
          department: undefined,
          doctorLevel: undefined,
          jobTitle: undefined,
          regionCode: undefined,
          address: undefined,
          isCertified: undefined,
          isCooperation: undefined,
          isLecturer: undefined,
          isQualification: undefined,
          personalIntroduction: undefined
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
            label: '真实姓名',
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
            rules: [{ required: true, message: '请输入昵称' }],
            attrs: {
              type: 'text',
              placeholder: '请输入昵称'
            }
          },
          {
            type: 'ImSelect',
            prop: 'gender',
            label: '性别',
            rules: [{ required: true, message: '请选择性别' }],
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
            type: 'ImInput',
            prop: 'phone',
            label: '手机号码',
            rules: [{ required: true, message: '请输入手机号' }, 'phone'],
            attrs: {
              type: 'text',
              placeholder: '请输入手机号码',
              maxLength: 11
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
          {
            type: 'ImSlot',
            prop: 'hospitalCode',
            label: '医院',
            rules: [{ required: true, message: '请选择医院' }],
            slots: {
              hospitalSlot: 'hospitalSelect'
            }
          },
          {
            type: 'ImInput',
            prop: 'department',
            label: '科室',
            attrs: {
              placeholder: '请输入科室名称'
            }
          },
          {
            type: 'ImSelect',
            prop: 'doctorLevel',
            label: '医生等级',
            attrs: {
              placeholder: '请选择医生等级',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'jobTitle',
            label: '职称',
            attrs: {
              placeholder: '请选择职称',
              clearable: true,
              class: 'w-full',
              options: []
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
            prop: 'address',
            label: '执业地点(详细地址)',
            attrs: {
              placeholder: '请输入执业地点(详细地址)'
            }
          },
          {
            type: 'ImSelect',
            prop: 'isCertified',
            label: '是否认证',
            attrs: {
              placeholder: '请选择是否认证',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'isCooperation',
            label: '是否合作项目',
            attrs: {
              placeholder: '请选择是否合作项目',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'isLecturer',
            label: '是否讲师',
            attrs: {
              placeholder: '请选择是否讲师',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'isQualification',
            label: '资质认证',
            attrs: {
              placeholder: '请选择资质认证',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImInput',
            prop: 'personalIntroduction',
            label: '个人介绍',
            attrs: {
              placeholder: '请输入个人介绍'
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
      this.setFormPropOptions('gender', this.enums.gender)
      this.setFormPropOptions('doctorLevel', this.enums.doctorLevel)
      this.setFormPropOptions('jobTitle', this.enums.jobTitle)
      this.setFormPropOptions('isCertified', this.enums.isCertified)
      this.setFormPropOptions('isCooperation', this.enums.isCooperation)
      this.setFormPropOptions('isLecturer', this.enums.isLecturer)
      this.setFormPropOptions('isQualification', this.enums.isQualification)
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
            props[key] = res.data[key] || undefined
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
