<template>
  <div class="router-breadcrumb">
    <!-- 动态面包屑 -->
    <el-breadcrumb :separator-class="separatorClass" :separator="separator">
      <el-breadcrumb-item v-for="(route, index) in routeList" :key="route.name" :to="{ ...route }" :class="{ 'is-last': isLast(index) }">
        <span @click="clickHandler(route, index, $event)">
          {{ route.title }}
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
/**
 * author: ext.huyangjie
 * 功能：动态匹配路由生成面包屑
 * Prop
 *  separator { String } 分隔符
 *  separatorClass { String } 分隔类名
 *
 */
export default {
  name: 'RouterBreadcrumb',
  props: {
    separator: {
      type: String,
      default: '/'
    },
    separatorClass: {
      type: String,
      default: 'el-icon-arrow-right'
    }
  },
  data() {
    return {
      // 存储路由
      routeList: [],
      // 当前匹配的路由
      curRoute: {}
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler({ query = {}, path = '', params = {}, meta = {}, hash = '', fullPath = '', matched = [] }) {
        console.log(matched)
        this.curRoute = { query, path, params, meta, hash, fullPath, matched }
        if (Array.isArray(matched)) {
          this.routeList = matched.map(({ meta, path, prop, query, params, name }) => {
            return { name, meta, title: meta.title, path, prop, query, params }
          })
        }
      }
    }
  },
  methods: {
    // 是否是最后一个路由
    isLast(index) {
      return index === this.routeList.length - 1
    },
    // 点击面包屑
    clickHandler(route, index, event) {
      if (this.isLast(index) || this.curRoute.path === route.path) {
        event.stopPropagation()
        this.$message('已是当前页', { type: 'warn' })
        return
      }
      this.$emit('click', { route })
    }
  }
}
</script>
<style lang="scss">
@import './deepIndex.scss';
</style>
