<template>
  <div class="text-center">
    <svg-icon v-if="bindingWechat==='1'" style="color: red;font-size: 18px;" icon-class="wechat-bind"></svg-icon>
    <svg-icon v-if="bindingWechat==='2'" style="color: blue;font-size: 18px;" icon-class="wechat-unbind"></svg-icon>
  </div>
</template>

<script>
export default {
  name: 'BindWeChatShow',
  props: {
    bindingWechat: {
      type: String,
      default: '2'
    }
  }
}
</script>
