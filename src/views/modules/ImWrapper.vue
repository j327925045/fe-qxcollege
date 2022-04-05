<template>
  <div class="p-4">
    <div class="-m-4 mb-4">
      <slot name="header"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ImWrapper'
}
</script>
