<template>
  <el-drawer :visible="visible" size="650px" custom-class="imk-detail-drawer" :with-header="false" :wrapper-closable="false">
    <div class="imk-hamburger" @click="closeDrower">
      <i class="el-icon-arrow-right" />
    </div>
    <div class="drawer-content">
      <el-row type="flex" align="middle" justify="start" class="drawer-tit">
        <h2>{{ title }}</h2>
      </el-row>
      <div class="p-[20px] pb-[60px] bg-white rounded">
        <slot></slot>

        <div class="fixed bottom-0 right-0 z-10 text-right w-[650px] p-4 bg-white shadow-dark-50 shadow-2xl">
          <el-button @click="closeDrower">取 消</el-button>
          <el-button type="primary" @click="submit">保 存</el-button>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'ImDrawer',
  props: {
    title: {
      type: String,
      default: '添加'
    },

    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    submit() {
      this.$emit('submit')
    },
    closeDrower() {
      this.$emit('update:visible', false)
      this.$emit('closeDrower')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixins.scss';

/deep/.imk-detail-drawer {
  overflow: visible;
}

.imk-detail-drawer.el-drawer {
  overflow: visible;

  .imk-hamburger {
    position: absolute;
    top: 9px;
    left: -12px;
    width: 12px;
    height: 42px;
    color: #fff;
    font-size: 8px;
    line-height: 42px;
    text-align: center;
    border-radius: 12px 0 0 12px;
    cursor: pointer;
    @include background_color('main-color');
  }

  .drawer-content {
    height: 100vh;
    padding: 12px 16px;
    overflow-x: auto;
    overflow-y: scroll;

    .drawer-tit {
      margin: 0 -16px 16px;
      padding: 0 16px 12px;
      color: #333;
      font-weight: 600;
      font-size: 16px;
      border-bottom: 1px solid rgba(238, 238, 238, 1);

      span {
        margin-left: 6px;
        font-weight: 500;
      }
    }
  }
}
</style>
