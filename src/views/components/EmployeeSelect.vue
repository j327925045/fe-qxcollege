<template>
  <el-select v-model="myValue" :placeholder="placeholder" clearable @change="onChange">
    <el-option
      v-for="item in options"
      :key="item.objectCode"
      :label="item.name"
      :value="item.objectCode"
    >
    </el-option>
  </el-select>
</template>

<script>
// todo 接口支持以后换成员工选择列表
import { getEmployeesList } from '@/api/employees'
export default {
  name: 'HospitalSelect',
  props: {
    value: {
      type: [Number, String],
      default: undefined
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data() {
    return {
      myValue: undefined,
      options: []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.setMyValue()
      }
    }
  },
  created() {
    this.getOptions()
  },
  methods: {
    setMyValue() {
      this.myValue = this.value
    },

    getOptions() {
      getEmployeesList({ limit: 10000, page: 1 }).then(res => {
        if (res.code === 200) {
          this.options = res.data.list || []
        }
        console.log('res', res)
      })
    },

    onChange() {
      this.$emit('input', this.myValue)
      this.$emit('change', this.myValue)
    }
  }
}
</script>
