<template>
  <div ref="topMenus" class="navbar-top-menu">
    <!-- 一级导航 -->
    <div v-for="(menu, index) in menus" :key="menu.path" :class="['menu-item', { active: activeIndex === index }]" @click="onClickMenu(menu.onlyOneChild||menu)">
      <!--如果只有一个子菜单，就展示该菜单项即可-->
      <span v-if="hasOneShowingChild(menu.children, menu)">
        {{ menu.onlyOneChild.meta.title }}
      </span>
      <template v-else>
        {{ menu.meta.title }}
        <div v-if="menu.children && menu.children.length>1" :class="getSubMenuClass(menu)">
          <div v-for="subMenu in menu.children" :key="subMenu.id" class="sub-menu-item" @click.stop="onClickMenu(subMenu)">
            <div class="title level-two">
              <item v-if="subMenu.meta" :icon="subMenu.meta.icon" />
              <span class="text">{{ subMenu.meta.title }}</span>
            </div>

            <template v-if="subMenu.children && subMenu.children.length">
              <div v-for="cell in subMenu.children" :key="cell.id" class="title level-three" @click.stop="onClickMenu(cell)">
                <item v-if="cell.meta" :icon="cell.meta.icon" />
                <span class="text">{{ cell.meta.title }}</span>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { routes } from '@/router/index.js'
/**
 * 目前只适合三级
 */
import Item from './Item'

export default {
  name: 'TopMenu',
  components: { Item },
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
    hasOneShowingChild(children = [], parent) {
      const allChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        }
        return true
      })
      if (allChildren && allChildren.length === 1) {
        this.$set(parent, 'onlyOneChild', allChildren[0])
        return true
      } else {
        return false
      }
    },
    onClickMenu(route, index) {
      console.log('data.name', route.name)
      try {
        if (route.children && route.children.length) return
        // 如果路由相同，返回即可
        if (route.name === this.$route.name) {
          return
        }
        this.$store.commit('app/SET_TOP_MENU_ACTIVE_INDEX', route.meta.topIndex)
        this.$router.push({ name: route.name })
        // 暂时隐藏顶部菜单，已解决点击菜单页面跳转后菜单不消失的bug
        document.querySelectorAll('.navbar-top-menu .sub-menu').forEach((dom) => {
          dom.style.display = 'none'
          setTimeout(() => {
            dom.style = {}
          }, 500)
        })
      } catch (err) {
        console.log(err)
      }
    },
    getSubMenuClass(menu) {
      const menuChildren = menu.children || []
      const hasCell = menuChildren.some((subMenu) => {
        const subMenuChildren = subMenu.children || []
        return Boolean(subMenuChildren.length)
      })
      return `sub-menu${hasCell ? '' : ' menu-flatten'}`
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

    &.active::after {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 20px;
      height: 4px;
      background-color: #fff;
      transform: translateX(-50%);
      content: '';
    }
  }
}
</style>
