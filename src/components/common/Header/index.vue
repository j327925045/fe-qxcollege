<template>
  <div class="navbar">
    <logo class="hidden-xs-only" />
    <!-- <top-menu /> -->
    <div class="right-menu">
      <!--      <search-box />-->
      <!-- <a href="javascript:;" class="navbar-ico">
        <i class="el-icon-message" />
      </a> -->
      <div class="avatar-container">
        <div class="avatar-wrapper">
          <img v-if="avatar" :src="avatar" class="user-avatar" />
          <img v-else src="~@/assets/img/framework/avatar.svg" class="user-avatar" />
          <span class="user-name">{{ name || '用户名' }}</span>
          <i class="el-icon-arrow-down" />
        </div>
        <div class="avatar-container-dropdown">
          <div class="dropdown-item" @click="goUserCenter">个人中心</div>
          <div class="dropdown-item" @click="logout">退出登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WaterMark from 'watermark-dom'
import Logo from './Logo.vue'
// import TopMenu from './TopMenu.vue'
import { mapGetters } from 'vuex'
// import { doLogout } from '@/api/login.js'
import { removeToken } from '@/utils/auth.js'

// 主题存储的key
const THEME_KEY = 'admin-theme'
export default {
  components: {
    Logo
    // TopMenu
    // SearchBox
  },
  data() {
    return {
      showChangeTheme: false,
      activeIndex: '2'
    }
  },

  computed: {
    ...mapGetters(['name', 'ename', 'theme', 'avatar'])
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
        watermark_fontsize: '12px',
        watermark_alpha: '0.1',
        watermark_angle: 30,
        watermark_txt: txt
      })
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    goUserCenter() {
      this.$router.push('/').catch((err) => err)
    },
    logout() {
      this.$confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '点错了'
      })
        .then(() => {
          removeToken()
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        })
        .catch(() => {})
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
    font-size: 16px;

    i {
      color: #fff;
    }
  }

  .avatar-container {
    padding: 0 32px 0 12px;

    .avatar-wrapper {
      display: flex;
      align-items: center;
      cursor: pointer;

      .user-avatar {
        width: 40px;
        height: 40px;
        padding: 4px;
        vertical-align: middle;
        background: white;
        border-radius: 100px;
        cursor: pointer;
      }

      .user-name {
        display: inline-block;
        padding: 0 8px;
        color: #fff;
      }

      .el-icon-arrow-down {
        color: #fff;
        font-size: 12px;
      }
    }

    &-dropdown {
      position: absolute;
      top: 100%;
      right: 32px;
      display: none;
      background: #fff;
      border-radius: 0 0 4px 4px;
      box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);

      .dropdown-item {
        min-width: 140px;
        padding: 12px 22px;
        line-height: 100%;
        cursor: pointer;

        &:hover {
          @include background_color('menu-hover-color');
        }
      }
    }

    &:hover {
      .avatar-container-dropdown {
        display: block;
      }
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
