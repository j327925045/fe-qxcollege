<template>
  <div class="navbar-logo-container">
    <router-link class="navbar-logo-link" to="/">
      <!-- 图片logo  样式一-->
      <!-- <img src="@/assets/img/framework/logo.png" class="sidebar-logo" /> -->
      <!--<span v-show="title" class="dep" />-->

      <!-- 文字 logo  样式二 -->
      <h1 class="sidebar-title">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NavbarLogo',
  data() {
    return {
      title: '后台系统'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixins.scss';

.navbar-logo-container {
  float: left;
  height: 100%;
  margin: 0 53px 0 18px;
  line-height: $navHeight;

  .navbar-logo-link {
    display: block;
    height: 100%;
  }

  .sidebar-logo {
    max-height: $logoHeight;
    vertical-align: middle;
  }

  .dep {
    display: inline-block;
    width: 1px;
    height: 20px;
    margin: 0 10px;
    line-height: 20px;
    vertical-align: middle;
    opacity: 0.6;
    @include themify() {
      background: themed('primary-color');
    }
  }

  .sidebar-title {
    display: inline-block;
    color: #fff;
    font-weight: 600;
    font-size: 22px;
    vertical-align: middle;
  }
}
</style>
