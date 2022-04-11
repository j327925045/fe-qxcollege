<!-- 我们把ele组件常用属性放在这里，如果会用到更多其他属性可以进行扩展 -->
<template>
  <el-select
    v-model="myValue"
    v-bind="attrs"
    :placeholder="attrs.placeholder||'请选择'"
    v-on="listeners"
    @change="onUpdate"
  >
    <el-option
      v-for="opt in attrs.options"
      :key="opt.value"
      :disabled="opt.disabled"
      :label="opt.label"
      :value="opt.value"
    />
  </el-select>
</template>

<script>
export default {
  name: 'ImSelect',
  props: {
    value: {
      type: [String, Array, Number, Boolean],
      default: undefined
    },
    attrs: {
      type: Object,
      default() {
        return {}
      }
    },
    listeners: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      myValue: undefined
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
  methods: {
    setMyValue() {
      try {
        this.myValue = JSON.parse(JSON.stringify(this.value))
      } catch (error) {
        this.myValue = undefined
      }
    },
    onUpdate(val) {
      this.$emit('input', this.myValue)
    }
  }
}
</script>
