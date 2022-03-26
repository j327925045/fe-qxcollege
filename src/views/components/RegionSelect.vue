<template>
  <el-cascader
    v-model="myValue"
    :props="props"
    :options="options"
    :placeholder="placeholder"
    filterable
    @change="handleChange"
  ></el-cascader>
</template>

<script>
import { getRegionData } from '@/api/city.js'

export default {
  name: 'RegionSelect',
  props: {
    value: {
      type: [Array, String],
      default() {
        return []
      }
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data() {
    return {
      myValue: undefined,
      options: [],
      props: {
        label: 'name',
        value: 'numberCode',
        children: 'subRegin'
      }
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
      getRegionData({}).then(res => {
        if (res.code === 200) {
          this.options = res.data || []
          this.formatData(this.options)
        }
      })
    },
    formatData(regionData) {
      for (let i = 0; i < regionData.length; i++) {
        const item = regionData[i]
        if (item.subRegin && item.subRegin.length === 0) {
          delete item.subRegin
        }
        if (item.subRegin && item.subRegin.length > 0) {
          this.formatData(item.subRegin)
        }
      }
    },
    handleChange() {
      this.$emit('input', this.myValue)
      this.$emit('change', this.myValue)
    }
  }
}
</script>
