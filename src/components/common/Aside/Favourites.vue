<template>
  <el-menu class="favorite" mode="vertical" router :default-active="$route.path">
    <div class="favourite-count">
      <b>
        {{ favourites.length || 0 }}
      </b>
      /5
    </div>
    <el-menu-item-group title="常用菜单">
      <sidebar-item v-for="route in favourites" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu-item-group>
  </el-menu>
</template>

<script>
import SidebarItem from './SidebarItem.vue'
export default {
  components: {
    SidebarItem
  },
  data() {
    return {}
  },
  computed: {
    favourites() {
      return this.$store.state.app.favouriteMenu
    }
  },
  created() {
    this.$store.dispatch('app/INIT_FAVOURITE_MENU')
  }
}
</script>

<style lang="scss" scoped>
.favourite {
  position: relative;

  &-count {
    position: absolute;
    top: 16px;
    right: 10px;
    color: #c9c9c9;
    font-size: 13px;

    b {
      color: #666;
      font-size: 16px;
    }
  }
}
</style>
