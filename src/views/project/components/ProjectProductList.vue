<template>
  <el-select
    v-model="myValue"
    :placeholder="placeholder"
    multiple
    clearable
    @change="onChange"
  >
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
import { getProjectProduct } from '@/api/project'
export default {
  name: 'ProjectProductList',
  props: {
    value: {
      type: [],
      default: undefined
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data() {
    return {
      myValue: [],
      dataList: [],
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
      getProjectProduct({ limit: 20000, page: 1 }).then(res => {
        if (res.code === 200) {
          this.options = res.data.list
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
