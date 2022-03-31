<template>
  <span>
    <template v-for="slot in slots">
      <slot :name="slot" />
    </template>
  </span>
</template>

<script>
export default {
  name: 'ImSlot',
  props: {
    value: {
      type: String,
      default: undefined
    },
    attrs: {
      type: Object,
      default() {
        return {}
      }
    },
    listeners: {
      type: Object,
      default() {
        return {}
      }
    },
    slots: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
