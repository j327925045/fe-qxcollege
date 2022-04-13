<template>
  <el-card>
    <div slot="header" class="header-text">基础信息</div>
    <ImForm ref="ImForm" :form="formConfig"></ImForm>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { checkPhone } from '@/api/user'
export default {
  name: 'BaseInfoForm',
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
          realName: undefined,
          phone: undefined,
          nickname: undefined,
          gender: undefined,
          birthday: undefined,
          doctorLevel: undefined,
          personalUrl: undefined
        },
        formItems: [
          {
            type: 'ImInput',
            prop: 'realName',
            label: '姓名',
            // rules: [{ required: true, message: '请输入姓名' }],
            attrs: {
              type: 'text',
              placeholder: '请输入姓名',
              maxLength: 32
            }
          },
          {
            type: 'ImInput',
            prop: 'phone',
            label: '手机号',
            rules: [{ required: true, message: '请输入手机号' }, 'phone'],
            attrs: {
              placeholder: '请输入手机号码',
              maxLength: 11
            },
            listeners: {
              change: this.getPhone

            }
          },
          {
            type: 'ImInput',
            prop: 'nickname',
            label: '昵称',
            attrs: {
              type: 'text',
              placeholder: '请输入'
            }
          },
          {
            type: 'ImSelect',
            prop: 'gender',
            label: '性别',
            attrs: {
              placeholder: '请选择',
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImDatePicker',
            prop: 'birthday',
            label: '出生日期',
            attrs: {
              type: 'datetime',
              style: 'width: 100%',
              valueFormat: 'yyyy-MM-dd hh:mm:ss',
              placeholder: '请选择'
            }
          },
          {
            type: 'ImSelect',
            prop: 'doctorLevel',
            label: '医生等级',
            rules: [{ required: true, message: '请选择医生等级' }],
            attrs: {
              placeholder: '请选择',
              class: 'w-full',
              options: []
            },
            listeners: {
              change: this.onLevelChanged
            }
          },
          {
            type: 'ImImgUpload',
            prop: 'personalUrl',
            label: '上传照片'
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
    getPhone(value) {
      checkPhone(value)
        .then((res) => {
          console.log(res)
          // this.$message.success(res.message)
        })
        .catch((res) => {
          console.log(res)
          this.$message.error('手机号已经被注册')
        })
    },

    onLevelChanged(val) {
      this.$emit('levelChange', val)
    },

    /**
     * 统一处理options
     */
    setOptions() {
      this.setFormPropOptions('gender', this.enums.gender) // 男女
      this.setFormPropOptions('doctorLevel', this.enums.doctorLevel) // 医生等级
    },

    /**
     * 设置form标单项的options，因为enums异步获取，因此这里需要手动指定一下
     * 放到计算属性会有prop绑定失效的问题
     */
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
<style lang="scss" scoped>
.header-text {
  color: #000;
  font-weight: 600;
  font-size: 16px;
}
</style>
