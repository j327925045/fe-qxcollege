<template>
  <div>
    <div v-for="(item,idx) in myValue" :key="idx" class="enum-item">
      <el-input v-model="item.label" style="width: 150px;" placeholder="label" @change="onUpdate"></el-input>
      <el-input v-model="item.value" style="width: 150px;" placeholder="value" @change="onUpdate"></el-input>
      <el-button type="primary" icon="el-icon-plus" round @click="addItem"></el-button>
      <el-button :disabled="myValue.length===1" type="danger" icon="el-icon-delete" round @click="deleteItem(idx)"></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EnumOption',
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      myValue: []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.setMyValue()
      }
    }
  },
  methods: {
    addItem() {
      this.myValue.push({
        label: undefined,
        value: undefined
      })
      this.onUpdate()
    },

    deleteItem(idx) {
      this.myValue.splice(idx, 1)
      this.onUpdate()
    },

    onUpdate() {
      this.$emit('input', this.myValue)
      this.$emit('change', this.myValue)
    },

    setMyValue() {
      if (!this.value || this.value.length === 0) {
        this.myValue = [{
          label: undefined,
          value: undefined
        }]
        return
      }
      try {
        this.myValue = JSON.parse(JSON.stringify(this.value))
      } catch (error) {
        this.myValue = [{
          label: undefined,
          value: undefined
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.enum-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
</style>
