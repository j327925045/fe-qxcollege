<template>
  <div class="navbar">
    <logo class="hidden-xs-only" />
    <!-- <top-menu /> -->
    <div class="right-menu">
      <!-- <search-box /> -->
      <a href="javascript:;" class="navbar-ico">
        <svg-icon icon-class="icon-notify"></svg-icon>
      </a>
      <a href="javascript:;" class="navbar-ico">
        <svg-icon v-if="isFullScreen" title="进入全屏" icon-class="icon-fullscreenExit" @click="toggleFullScreen"></svg-icon>
        <svg-icon v-else title="退出全屏" icon-class="icon-fullscreen" @click="toggleFullScreen"></svg-icon>
      </a>
      <Avatar></Avatar>
    </div>
  </div>
</template>

<script>
import WaterMark from 'watermark-dom'
import Logo from './Logo.vue'
import { mapGetters } from 'vuex'
import utils from '@/utils/utils'
import Avatar from './components/Avatar'

// 主题存储的key
const THEME_KEY = 'admin-theme'
export default {
  components: {
    Logo,
    Avatar
    // TopMenu
    // SearchBox
  },
  data() {
    return {
      showChangeTheme: false,
      isFullScreen: false
    }
  },

  computed: {
    ...mapGetters(['ename', 'theme'])
  },
  watch: {
    ename(newVal, oldVal) {
      if (newVal === oldVal) return
      // 添加水印
      this.addWaterMark(newVal)
    }
  },
  created() {
    this.initTheme()
    // 添加水印
    if (this.ename) {
      this.addWaterMark(this.ename)
    }
  },
  methods: {
    addWaterMark(txt) {
      WaterMark.load({
        watermark_fontsize: '14px',
        watermark_alpha: '0.03',
        watermark_angle: 30,
        watermark_txt: txt
      })
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    changeTheme(e) {
      const themeColor = e.target.dataset.theme

      // 兼容点击边缘主题问题
      if (!themeColor) {
        return
      }
      localStorage.setItem(THEME_KEY, themeColor)
      this.changeThemeCore(themeColor)
    },
    // 初始化主题：从存储中
    initTheme() {
      const themeColor = localStorage.getItem(THEME_KEY)
      if (themeColor) {
        this.changeThemeCore(themeColor)
      } else {
        this.changeThemeCore(this.theme)
      }
    },
    changeThemeCore(themeColor = 'blue') {
      if (themeColor === 'red') {
        document.body.classList.add('jdwl-admin-red')
      } else {
        document.body.classList.remove('jdwl-admin-red')
      }
      this.$store.commit('app/SET_THRME_COLOR', themeColor)
    },
    toggleFullScreen() {
      if (utils.getFullscreenElement()) {
        utils.exitFullscreen()
        this.isFullScreen = false
      } else {
        utils.launchIntoFullscreen()
        this.isFullScreen = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixins.scss';

.navbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  height: $navHeight;
  transition: width 0.28s;
  @include background_color('main-color');
}

.right-menu {
  display: flex;
  align-items: center;
  float: right;
  height: 100%;
  line-height: $navHeight;

  .change-theme {
    margin-right: 10px;

    ul {
      display: flex;
      align-items: center;
      justify-content: center;

      li {
        width: 18px;
        height: 18px;
        margin-right: 10px;
        background: rgba(44, 101, 250, 1);
        border: 1px solid rgba(255, 255, 255, 1);
        border-radius: 2px;
        cursor: pointer;

        &:last-child {
          margin-right: 0;
        }
      }

      .red {
        background: #e1251b;
      }

      .blue {
        background: #2c65fa;
      }
    }
  }

  .navbar-ico {
    height: 100%;
    padding: 0 12px;
    font-size: 20px;

    i,svg {
      color: #fff;
    }
  }
}

.themes {
  display: flex;
  justify-content: space-around;

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 14px;
    border: 1px solid transparent;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.15s ease-in-out;

    img {
      width: 160px;
      margin-bottom: 10px;
    }

    .font_family {
      color: rgba(237, 237, 237, 1);
      font-size: 22px;
    }

    &.is-active {
      .font_family {
        color: rgba(54, 190, 147, 1);
      }
    }

    &:hover {
      &.blue {
        background: rgba(60, 110, 240, 0.04);
        border-color: rgba(219, 226, 246, 1);
      }

      &.red {
        background: rgba(225, 37, 27, 0.04);
        border-color: rgba(249, 219, 217, 1);
      }
    }
  }
}
</style>
