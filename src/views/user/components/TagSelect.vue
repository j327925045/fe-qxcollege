<template>
  <el-select v-model="myValue" filterable collapse-tags multiple clearable :placeholder="placeholder" @change="onChange">
    <el-option v-for="(item, idx) in options" :key="idx" :label="item.name" :value="item.objectCode"></el-option>
  </el-select>
</template>

<script>
import { getTagList } from '@/api/tag'
export default {
  name: 'TagSelect',
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    placeholder: {
      type: String,
      default: '请选择'
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
      try {
        this.myValue = JSON.parse(JSON.stringify(this.value))
      } catch (error) {
        this.myValue = undefined
      }
    },

    getOptions() {
      getTagList({ page: 1, limit: 10000 }).then(res => {
        if (res.code === 200) {
          this.options = res.data.list || []
        }
      })
    },

    onChange() {
      this.$emit('input', this.myValue)
    }
  }
}
</script>
