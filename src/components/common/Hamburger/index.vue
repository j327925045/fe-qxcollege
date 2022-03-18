<template>
  <div class="hamburger" @click="toggleClick">
    <i :class="isActive ? 'el-icon-arrow-left' : 'el-icon-arrow-right'" />
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixins.scss';

.hamburger {
  position: absolute;
  top: 45%;
  left: 100%;
  width: 12px;
  height: 42px;
  color: #fff;
  font-size: 8px;
  line-height: 42px;
  text-align: center;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  cursor: pointer;
  @include background_color('menu-color');
}
</style>
