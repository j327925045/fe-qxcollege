<template>
  <div>
    <span v-if="gender==='0'">未知</span>
    <svg-icon v-if="gender==='1'" style="color: red;font-size: 18px;" icon-class="boy"></svg-icon>
    <svg-icon v-if="gender==='2'" style="color: blue;font-size: 18px;" icon-class="girl"></svg-icon>
  </div>
</template>

<script>
export default {
  name: 'GenderShow',
  props: {
    gender: {
      type: String,
      default: '0'
    }
  }
}
</script>
