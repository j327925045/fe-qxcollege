<template>

  <el-select
    v-model="myValue"
    filterable
    allow-create
    clearable
    default-first-option
    :placeholder="placeholder"
    @change="onChange"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.name"
      :value="item.objectCode"
    >
    </el-option>
  </el-select>
</template>

<script>
// import { getAllHospitalItems } from '@/api/hospital'
import { getEmployeesList } from '@/api/employees'
export default {
  name: 'HospitalSelect',
  props: {
    value: {
      type: [Number, String, Array],
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
      // getEmployeesList
      getEmployeesList({ page: 1, limit: 10000 }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.options = res.data.list
        }
        console.log('res', res)
      })

      // getAllHospitalItems({}).then(res => {
      //   if (res.code === 200) {
      //     this.options = res.data
      //   }
      //   console.log('res', res)
      // })
    },

    onChange() {
      this.$emit('input', this.myValue)
      this.$emit('change', this.myValue)
    }
  }
}
</script>
