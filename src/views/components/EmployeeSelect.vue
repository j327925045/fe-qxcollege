<template>
  <el-select
    v-model="myValue"
    :placeholder="placeholder"
    :multiple="multiple"
    :filterable="filterable"
    :allow-create="allowCreate"
    clearable
    @change="onChange"
    :collapse-tags="collapseTags"
  >
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
    },
    multiple: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    allowCreate: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: false
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
      try {
        this.myValue = JSON.parse(JSON.stringify(this.value))
      } catch (error) {
        this.myValue = undefined
      }
    },

    getOptions() {
      getEmployeesList({ limit: 10000, page: 1 }).then(res => {
        if (res.code === 200) {
          this.options = res.data.list || []
        }
      })
    },

    onChange() {
      this.$emit('input', this.myValue)
      this.$emit('change', this.myValue)
    }
  }
}
</script>
