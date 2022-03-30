<template>
  <component
    :is="item.type"
    v-bind="item.attrs"
    v-model="form.props[item.prop]"
    :attrs="item.attrs"
    :listeners="item.listeners"
    :slots="item.slots"
    v-on="item.listeners"
  >
    <template v-for="(value) in item.slots" :slot="value">
      <slot :name="value" />
    </template>
  </component>
</template>
<script>
import components from './components/index.js'

export default {
  name: 'FormComponents',
  components: components,
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    },
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
