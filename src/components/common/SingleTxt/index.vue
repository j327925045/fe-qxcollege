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
  margin-bottom: 10px;
  line-height: 32px;
}

.common-sing-txt_label{
  float: left;
  padding: 0 10px 0 0;
  color: #666;
  font-size: 14px;
}

.common-sing-txt_content::before,
.common-sing-txt_content::after{
  display: table;
  content: "";
}

.common-sing-txt_content{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.common-sing-txt_content::after{
  clear: both;
}
</style>
