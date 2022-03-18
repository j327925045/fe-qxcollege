<template>
  <div class="common-sing-txt">
    <label class="common-sing-txt_label">{{ label }}</label>
    <div class="common-sing-txt_content">
      <slot />
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'ComSingleTxt',
  props: {
    label: {
      type: String,
      default() {
        return ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.common-sing-txt{
  line-height: 32px;
  margin-bottom: 10px;
}
.common-sing-txt_label{
  float: left;
  font-size: 14px;
  color: #666;
  padding: 0 10px 0 0;
}
.common-sing-txt_content::before,
.common-sing-txt_content::after{
  display: table;
  content: "";
}
.common-sing-txt_content{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.common-sing-txt_content::after{
  clear: both;
}
</style>
