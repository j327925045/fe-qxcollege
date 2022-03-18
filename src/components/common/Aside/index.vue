<template>
  <div>
    <div v-if="!isCollapse" class="side-menu-search">
      <el-input v-model="searchKey" type="text" placeholder="请输入菜单名称">
        <i slot="prefix" class="el-input__icon el-icon-search" />
      </el-input>
    </div>
    <el-scrollbar class="el-menu-vertical">
      <div v-if="favouritesNav && !isCollapse">
        <favourites />
      </div>
      <el-menu ref="sideMenu" :collapse="isCollapse" mode="vertical" router :default-active="defaultActive">
        <el-menu-item-group title="导航菜单">
          <sidebar-item v-for="route in subMenus" :key="route.path" :item="route" :base-path="route.path" :search-key="searchKey" />
        </el-menu-item-group>
      </el-menu>
    </el-scrollbar>
    <hamburger :is-active="sidebar.opened" @toggleClick="toggleSideBar" />
  </div>
</template>

<script>
import Hamburger from '@/components/common/Hamburger/index.vue'
import SidebarItem from './SidebarItem.vue'
import Favourites from './Favourites.vue'
import { routes } from '@/router/index.js'

export default {
  components: { SidebarItem, Hamburger, Favourites },
  provide() {
    return {
      showToolTip: this.$store.state.app.sidebar.showToolTip
    }
  },
  inject: ['features'],
  data() {
    return {
      searchKey: '',
      menus: []
    }
  },
  computed: {
    favouritesNav() {
      return !!this.features.favouritesNav
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    isCollapse() {
      return !this.$store.state.app.sidebar.opened
    },
    defaultActive() {
      let path = this.$route.path
      // 不在菜单中的路径， 找到其父路径
      if (this.$route.meta.notInMenu) {
        const pathArr = this.$route.path.split('/')
        pathArr.pop()
        if (pathArr.length === 0) {
          return null
        }
        path = pathArr.join('/')
      }
      return path
    },
    subMenus() {
      if (this.$store.state.app.isSubMenus) {
        let subMenu = null
        for (let i = 0, len = this.menus.length; i < len; i++) {
          const item = this.menus[i]
          const result = this.hasItem(item)
          if (result) {
            subMenu = item
            break
          }
        }
        if (subMenu) {
          return [subMenu]
        } else {
          return []
        }
      } else {
        return routes.filter(item => !item.hidden)
      }
    }
  },
  created() {
    this.filterRoute()
  },
  methods: {
    hasItem(parent) {
      let result = false
      const children = parent.children
      if (children && children.length > 0) {
        for (let i = 0, len = children.length; i < len; i++) {
          const item = children[i]
          if (item.path === this.$route.path) {
            result = true
          }
          if (result) {
            return result
          }
          result = this.hasItem(item)
          if (result) {
            return result
          }
        }
        return result
      } else {
        return result
      }
    },
    filterRoute() {
      this.menus = routes.filter(item => !item.hidden)
    },
    toggleSideBar() {
      this.$store.commit('app/TOGGLE_SIDEBAR')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical {
  height: calc(100% - 49px);
}

.side-menu-search {
  position: relative;
  padding: 16px 14px;
  line-height: 1;

  ::v-deep .el-input__inner {
    width: 100%;
    height: 32px;
    padding: 0 12px 0 34px;
    color: #333;
    background: rgba(243, 243, 243, 1);
    border: 0;
    border-radius: 20px;
  }
}
</style>
