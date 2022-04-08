<!-- 我们把ele组件常用属性放在这里，如果会用到更多其他属性可以进行扩展 -->
<template>
  <el-input v-model="myValue" v-bind="attrs" v-on="listeners" @input="onInput">
    <template v-for="(val, key) in slots" :slot="key">
      <slot :name="val" />
    </template>
  </el-input>
</template>

<script>
export default {
  name: 'ImInput',
  props: {
    value: {
      type: [String, Number],
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
    },
    slots: {
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
      this.myValue = this.value
    },
    onInput() {
      this.$emit('input', this.myValue)
    }
  }
}
</script>
