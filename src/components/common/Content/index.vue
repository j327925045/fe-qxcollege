<template>
  <section class="app-main">
    <el-scrollbar wrap-class="app-scrollbar-wrapper" class="app-main-scrollbar" style="height: 100%">
      <div id="scrollContainer" class="app-container">
        <keep-alive :max="maxPageNumber" :include="keepAliveComponents">
          <router-view v-if="isRouterAlive" :key="key" />
        </keep-alive>
        <router-view v-if="!isRouterAlive" />
      </div>
    </el-scrollbar>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppMain',
  computed: {
    ...mapGetters([
      'maxPageNumber',
      'isRouterAlive',
      'keepAliveComponents'
    ]),
    key() {
      return this.$route.path
    }
  }

}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.app-container {
  position: absolute;
  width: calc(100% - 16px);
  height: 100%;
  overflow: auto;
}

/* fix css style bug in open el-dialog */
/deep/ .app-main-scrollbar {
  background: #f5f5f5;

  .app-scrollbar-wrapper {
    padding-right: 20px;
    overflow-x: hidden;

    .el-scrollbar__view {
      min-height: 100%;
    }
  }
}
</style>
