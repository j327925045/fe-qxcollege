<template>
  <el-checkbox-group
    v-model="myValue"
    v-bind="attrs"
    v-on="listeners"
    @change="onUpdate"
  >
    <el-checkbox
      v-for="opt in attrs.options"
      :key="opt.label + Math.random()"
      :label="opt.value"
      :disabled="opt.disabled"
    >
      {{ opt.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'ImCheckboxGroup',
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
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
    onUpdate() {
      this.$emit('input', this.myValue)
    }
  }
}
</script>
