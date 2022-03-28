<template>
  <el-cascader
    v-model="myValue"
    :props="props"
    :options="options"
    :placeholder="placeholder"
    filterable
    :disabled="disabled"
    @change="handleChange"
  ></el-cascader>
</template>

<script>
import { getPermissionTree } from '@/api/permission.js'

export default {
  name: 'PermissionCascader',
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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      myValue: undefined,
      options: [],
      props: {
        label: 'name',
        value: 'objectCode',
        children: 'options',
        emitPath: false,
        checkStrictly: true
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
      getPermissionTree({}).then(res => {
        console.log('res', res)
        if (res.code === 200) {
          this.options = res.data || []
          this.formatData(this.options)
          console.log('this.options', this.options)
          this.options.unshift({
            objectCode: '0',
            name: '无父节点'
          })
        }
      })
    },
    formatData(regionData) {
      for (let i = 0; i < regionData.length; i++) {
        const item = regionData[i]
        if (item.options && item.options.length === 0) {
          delete item.options
        }
        if (item.options && item.options.length > 0) {
          this.formatData(item.options)
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
