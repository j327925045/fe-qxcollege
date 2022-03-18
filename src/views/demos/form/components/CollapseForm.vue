<template>
  <div class="gyl-collapse-btn">
    <span @click="contentSwitch">{{ word }} <i :class="showAll ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" /></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAll: false
    }
  },
  computed: {
    word: function () {
      if (this.showAll === false) {
        // 对文字进行处理
        return '展开'
      } else {
        return '收起'
      }
    }
  },
  methods: {
    contentSwitch: function () {
      if (this.showAll === false) {
        this.showAll = true
        this.$emit('showChange', true)
      } else {
        this.showAll = false
        this.$emit('showChange', false)
      }
    }
  }
}
</script>
