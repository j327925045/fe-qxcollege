<template>
  <div class="common-form-view">
    <span class="form-switch" @click="formSwitch">
      {{ isShow ? '全部收起' : '全部展开' }}
      <i :class="isShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
    </span>
    <h3 class="common-form-title"><i class="el-icon-s-order" />{{ $route.meta.title }}</h3>
    <slot v-if="isShow"></slot>
  </div>
</template>

<script>
export default {
  name: 'ImSearhArea',
  data() {
    return {
      isShow: true
    }
  },
  methods: {
    formSwitch() {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixins.scss';

.common-form-view {
  position: relative;
  margin-bottom: 10px;
  padding: 16px 20px 0;
  background: #fff;
  border-radius: 4px;

  .common-form-title {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 16px;
    color: #000;
    font-weight: 600;
    font-size: 16px;

    i.el-icon-s-order {
      margin-right: 8px;
      @include font_color('main-color');
    }
  }

  .form-switch {
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 1;
    width: 106px;
    height: 22px;
    color: #666;
    line-height: 22px;
    text-align: center;
    background: rgba(239, 239, 239, 1);
    transform: translateX(-50%);
    cursor: pointer;
    clip-path: polygon(10px 0%, 96px 0, 100% 100%, 0% 100%);

    &:hover {
      @include background_color('menu-hover-color');
      @include font_color('menu-active-color');
    }
  }
}
</style>
