<template>
  <div class="router-breadcrumb gyl-mod">
    <!-- 动态面包屑 -->
    <router-breadcrumb />
    <router-link to="/components/routerBreadcrumb/page1">page1</router-link>
    <router-link to="/components/routerBreadcrumb/page2">page2</router-link>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import RouterBreadcrumb from '@/components/RouterBreadcrumb/index.vue'
export default {
  name: 'RouterBreadcrumbPage',
  components: {
    RouterBreadcrumb
  },
  data() {
    return {
      // 存储路由
      routeList: [],
      // 当前匹配的路由
      curRoute: {}
    }
  }
}
</script>
<style lang="scss" scoped>
.router-breadcrumb {
  .el-breadcrumb {
    line-height: 32px;
  }
}
</style>
