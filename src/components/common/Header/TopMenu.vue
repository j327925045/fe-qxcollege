<template>
  <div ref="topMenus" class="navbar-top-menu">
    <div v-for="(menu, index) in menus" :key="menu.path" :class="['menu-item', { active: activeIndex === index }]" @click="onClickMenu(menu)">
      <span>{{ menu.meta.title }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { routes } from '@/router/index.js'

export default {
  name: 'TopMenu',
  data() {
    return {
      menus: []
    }
  },
  computed: {
    ...mapGetters([
      // 'menus',
      'topMenuActiveIndex'
    ]),
    activeIndex() {
      return this.topMenuActiveIndex
    }
  },
  created() {
    this.filterRoute()
  },
  methods: {
    filterRoute() {
      this.menus = routes.filter(item => !item.hidden)
    },
    onClickMenu(data) {
      if (!data.meta.linkPageName) {
        return
      }

      // 如果路由相同，返回即可
      if (data.name === this.$route.name) {
        return
      }
      this.$router.push({ name: data.meta.linkPageName })
      this.$store.commit('app/SET_MENUS', data.children)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixins.scss';

.navbar-top-menu {
  display: inline-flex;
  height: $navHeight;

  .menu-item {
    position: relative;
    padding: 0 20px;
    color: #fff;
    font-size: 16px;
    line-height: $navHeight;
    cursor: pointer;

    .sub-menu {
      position: absolute;
      top: $navHeight;
      left: 0;
      display: none;
      color: #666;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);

      &.menu-flatten {
        flex-direction: column;

        .sub-menu-item .title.level-two {
          color: rgba(102, 102, 102, 1);
        }
      }

      &-item {
        min-width: 110px;
        overflow: hidden;
        line-height: 100%;
        text-align: left;

        .title {
          padding: 12px 22px;
          color: #666;
          font-size: 16px;
          white-space: nowrap;

          &:hover {
            @include background_color('menu-hover-color');

            .title:only-child {
              @include font_color('main-color');
            }
          }
        }
      }
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.15);

      .sub-menu {
        display: flex;
      }
    }

    &.active {
      background-color: rgba(0, 0, 0, 0.15);
    }

    // &.active::after {
    //   position: absolute;
    //   bottom: 0;
    //   left: 50%;
    //   width: 20px;
    //   height: 4px;
    //   background-color: #fff;
    //   transform: translateX(-50%);
    //   content: '';
    // }
  }
}
</style>
