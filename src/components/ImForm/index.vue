<template>
  <el-form ref="form" :model="form.props" v-bind="form.attrs">
    <el-row>
      <template v-for="(item, idx) in formList">
        <FormComponents v-if="item.type==='ImButton'" :key="idx" :form="form" :item="item">
          <template v-for="(value) in item.slots" :slot="value">
            <slot :name="value" />
          </template>
        </FormComponents>
        <el-col
          v-else
          :key="idx"
          v-bind="columnConfig"
        >
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :rules="getRules(item.rules)"
            :style="item.style"
          >
            <FormComponents :form="form" :item="item">
              <template v-for="(value) in item.slots" :slot="value">
                <slot :name="value" />
              </template>
            </FormComponents>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script>

import FormComponents from './FormComponents.vue'

const isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

export default {
  name: 'ImForm',
  components: {
    FormComponents
  },
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      required: { required: true, message: '此处为必填值' },
      email: { type: 'email', message: '请输入正确的邮箱地址' },
      phone: {
        validator: function(rule, value, callback) {
          const regex = /^1\d{10}$/g
          if (regex.test(value) || value === '' || value === null) {
            callback()
          } else {
            callback(new Error('请正确填写手机号'))
          }
        }
      },
      password: {
        validator: function(rule, value, callback) {
          const regex = /^(?![^a-zA-Z]+$)(?!\D+$).{8,20}$/
          if (regex.test(value) || value === '' || value === null) {
            callback()
          } else {
            callback(new Error('密码必须包含字母和数字，且为8-20个字符!'))
          }
        }
      },
      number: {
        validator: function(rule, value, callback) {
          if (isNumeric(value) || value === '' || value === null) {
            callback()
          } else {
            callback(new Error('该项须填写数字类型值'))
          }
        }
      },
      int: {
        validator: function(rule, value, callback) {
          if (
            parseInt(value, 10) === value ||
            value === '' ||
            value === undefined
          ) {
            callback()
          } else {
            callback(new Error('请输入整数类型值'))
          }
        }
      },
      url: { type: 'url', message: '请输入正确网址类型值' }
    }
  },
  computed: {
    formList() {
      return this.form.formItems.filter(item => {
        return !item.hidden
      })
    },
    columnConfig() {
      const columnConfigMap = {
        1: {
          xl: 24,
          lg: 24,
          md: 24,
          sm: 24,
          xs: 24
        },
        2: {
          xl: 12,
          lg: 12,
          md: 12,
          sm: 24,
          xs: 24
        },
        3: {
          xl: 8,
          lg: 8,
          md: 8,
          sm: 12,
          xs: 24
        },
        4: {
          xl: 6,
          lg: 6,
          md: 8,
          sm: 12,
          xs: 24
        },
        6: {
          xl: 4,
          lg: 6,
          md: 8,
          sm: 12,
          xs: 24
        }
      }
      return columnConfigMap[this.form.column] || columnConfigMap[1]
    }
  },
  methods: {
    getRules(ruleArr) {
      if (!ruleArr) {
        return []
      }
      const rules = []
      for (let i = 0; i < ruleArr.length; i++) {
        const item = ruleArr[i]
        if (typeof item === 'string' && this[item]) {
          rules.push(this[item])
        } else if (typeof item === 'object') {
          rules.push(item)
        }
      }
      return rules
    },
    validate(callback) {
      this.$refs.form.validate(valid => {
        callback(valid)
      })
    },
    reset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
