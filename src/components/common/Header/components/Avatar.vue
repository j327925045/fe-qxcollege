<template>
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
</template>

<script>
import { removeToken } from '@/utils/auth.js'
import { mapGetters } from 'vuex'
export default {
  name: 'Avatar',
  computed: {
    ...mapGetters(['name', 'avatar'])
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixins.scss';

.avatar-container {
  padding: 0 32px 0 12px;

  .avatar-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;

    .user-avatar {
      width: $navHeight - 15;
      height: $navHeight - 15;
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
</style>
