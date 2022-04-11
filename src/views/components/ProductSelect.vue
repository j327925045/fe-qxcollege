<template>
  <el-select v-model="myValue" :filterable="filterable" :allow-create="allowCreate" :placeholder="placeholder" @change="onChange">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.name"
      :value="item.objectCode"
    >
    </el-option>
  </el-select>
</template>

<script>
import { getProductList } from '@/api/product'
export default {
  name: 'OrganizationSelect',
  props: {
    value: {
      type: [Number, String],
      default: undefined
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    filterable: {
      type: Boolean,
      default: false
    },
    allowCreate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      myValue: undefined,
      options: []
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
  created() {
    this.getOptions()
  },
  methods: {
    setMyValue() {
      this.myValue = this.value
    },

    getOptions() {
      getProductList({}).then(res => {
        if (res.code === 200) {
          this.options = res.data
        }
        console.log('res', res)
      })
    },

    onChange() {
      this.$emit('input', this.myValue)
      this.$emit('change', this.myValue)
    }
  }
}
</script>
