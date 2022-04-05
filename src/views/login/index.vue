<template>
  <div :class="prefixCls" class="absolute w-full h-full px-4">
    <span class="-enter-x xl:hidden">
      <img alt="logo" src="../../assets/img/pages/logo.png" class="w-[124px] mt-4 enter-x" />
    </span>

    <div class="container relative h-full py-2 mx-auto sm:px-10">
      <div class="flex h-full">
        <div class="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
          <div class="my-auto">
            <img alt="logo" src="../../assets/img/pages/logo.png" class="w-1/2 -mt-16 -enter-x" />
            <div class="mt-10 font-medium text-white -enter-x">
              <span class="inline-block mt-4 text-3xl"> 让生命有更高的质量和尊严 </span>
            </div>
            <div class="mt-5 font-normal text-white text-md dark:text-gray-500 -enter-x">
              公司立足于生物医用软组织修复材料的研发和转化，已成功实现透明质酸钠填充剂系列产品及面部埋植线产品的产业化。基于求美者术前、术中和术后需求，提供技术领先、品质优异的合规产品及解决方案
            </div>
          </div>
        </div>
        <div class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12">
          <div
            :class="`${prefixCls}-form`"
            class="relative w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md xl:ml-16 xl:bg-transparent sm:px-8 xl:p-4 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-full enter-x"
          >
            <LoginForm></LoginForm>
            <!-- <LoginForm />
            <ForgetPasswordForm />
            <RegisterForm />
            <MobileForm />
            <QrCodeForm /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoginForm from '@/views/login/components/LoginForm'
export default {
  name: 'Login',
  components: { LoginForm },
  data() {
    return {
      prefixCls: 'imeik-login'
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/breakpoint.scss';
@import '@/assets/styles/variables.scss';

$primary-color: $mainColor;
$text-color-secondary: $menuText;

.imeik-login {
  min-height: 100%;
  overflow: hidden;
  background-color: #fff;
  @media (max-width: $screen-xl) {
    background-color: #293146;

    .imeik-login-form {
      background-color: #fff;
    }
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 52%;
    height: 100%;
    background-image: url(../../assets/img/pages/login-bg.png);
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: cover;
    content: '';
    @media (max-width: $screen-xl) {
      display: none;
    }
  }

  .logo-imeik-login {
    position: absolute;
    top: 12px;
    height: 30px;

    &__title {
      color: #fff;
      font-size: 16px;
    }

    img {
      width: 32px;
    }
  }

  .container {
    .logo-imeik-login {
      display: flex;
      width: 60%;
      height: 80px;

      &__title {
        color: #fff;
        font-size: 24px;
      }

      img {
        width: 48px;
      }
    }
  }

  &-sign-in-way {
    .anticon {
      color: #888;
      font-size: 22px;
      cursor: pointer;

      &:hover {
        color: $primary-color;
      }
    }
  }

  input:not([type='checkbox']) {
    min-width: 360px;

    @media (max-width: $screen-xl) {
      min-width: 320px;
    }

    @media (max-width: $screen-lg) {
      min-width: 260px;
    }

    @media (max-width: $screen-md) {
      min-width: 240px;
    }

    @media (max-width: $screen-sm) {
      min-width: 160px;
    }
  }

  .countdown-imeik-login input {
    min-width: unset;
  }

  .ant-divider-inner-text {
    color: $text-color-secondary;
    font-size: 12px;
  }
}
</style>
