<template>
  <div>
    <div v-if="!isCollapse" class="side-menu-search">
      <el-input v-model="searchKey" type="text" clearable placeholder="请输入菜单名称">
        <i slot="prefix" class="el-input__icon el-icon-search" />
      </el-input>
    </div>
    <el-scrollbar :style="`height: ${sidebar.opened?'calc(100% - 109px)':'calc(100% - 45px)'}`" class="el-menu-vertical">
      <div v-if="favouritesNav && !isCollapse">
        <favourites v-show="!searchKey" />
      </div>
      <el-menu ref="sideMenu" unique-opened :collapse="isCollapse" mode="vertical" router :default-active="defaultActive">
        <el-menu-item-group title="导航菜单">
          <sidebar-item v-for="route in menus" :key="route.path" :item="route" :base-path="route.path" :search-key="searchKey" />
        </el-menu-item-group>
      </el-menu>
    </el-scrollbar>
    <div class="sidebar-icon-area">
      <div class="icon-container" @click="toggleSideBar">
        <svg-icon :icon-class="sidebar.opened ? 'side-unfold' : 'side-fold'"></svg-icon>
      </div>
    </div>
    <!-- <hamburger :is-active="sidebar.opened" @toggleClick="toggleSideBar" /> -->
  </div>
</template>

<script>
import Hamburger from '@/components/common/Hamburger/index.vue'
import SidebarItem from './SidebarItem.vue'
import Favourites from './Favourites.vue'
import { routes } from '@/router/index.js'
import { mapGetters } from 'vuex'

export default {
  components: { SidebarItem, Hamburger, Favourites },
  provide() {
    return {
      showToolTip: this.sidebar.showToolTip
    }
  },
  inject: ['features'],
  data() {
    return {
      searchKey: ''
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'topMenuActiveIndex']),
    favouritesNav() {
      return !!this.features.favouritesNav
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    defaultActive() {
      return this.$route.meta.highlightPath || this.$route.path
    },
    menus() {
      return routes
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.commit('app/TOGGLE_SIDEBAR')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.el-menu-vertical {
  height: calc(100% - 109px);
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
    // border-radius: 20px;
  }
}

.sidebar-icon-area {
  width: 100%;
  height: 40px;
  border-top: 1px #f5f5f5 solid;

  .icon-container {
    width: 56px;
    font-size: 20px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;

    &:hover {
      svg {
        color: $mainColor;
      }
    }
  }
}
</style>
