<template>
  <svg-icon style="font-size: 24px;" :icon-class="`v${doctorLevel}`"></svg-icon>
</template>

<script>
export default {
  name: 'DoctorLevel',
  props: {
    doctorLevel: {
      type: String,
      default: ''
    }
  }
}
</script>
