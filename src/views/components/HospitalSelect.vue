<template>
  <el-select
    v-model="myValue"
    :placeholder="placeholder"
    :multiple="multiple"
    clearable
    @change="onChange"
  >
    <el-option
      v-for="item in options"
      :key="item.objectCode"
      :disabled="getDisabled(item)"
      :label="item.name"
      :value="item.objectCode"
    >
    </el-option>
  </el-select>
</template>

<script>
import { getAllHospitalItems } from '@/api/hospital'
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
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabledCode: {
      type: Array,
      default: () => []
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
    getDisabled(item) {
      return this.disabledCode && this.disabledCode.indexOf(item.objectCode) > -1
    },
    setMyValue() {
      this.myValue = this.value
    },

    getOptions() {
      getAllHospitalItems({}).then(res => {
        if (res.code === 200) {
          this.options = res.data
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
