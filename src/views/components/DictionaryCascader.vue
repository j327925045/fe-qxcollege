<template>
  <el-cascader
    v-model="myValue"
    :props="props"
    :options="options"
    :placeholder="placeholder"
    :collapse-tags="collapseTags"
    clearable
    :show-all-levels="showAllLevels"
    filterable
    @change="handleChange"
  ></el-cascader>
</template>

<script>
import { getDictionaryBySine } from '@/api/dictionary.js'

export default {
  name: 'DictionaryCascader',
  props: {
    value: {
      type: [String, Number, Array],
      default: undefined
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    sign: {
      required: true,
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: false
    },
    showAllLevels: {
      type: Boolean,
      default: false
    },
    emitPath: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      myValue: undefined,
      options: [],
      props: {
        multiple: this.multiple,
        label: 'name',
        value: 'objectCode',
        children: 'options',
        emitPath: this.emitPath
      }
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
      getDictionaryBySine({ sign: this.sign }).then(res => {
        if (res.code === 200) {
          this.options = res.data || []
        }
      })
    },

    handleChange() {
      this.$emit('input', this.myValue)
      this.$emit('change', this.myValue)
      console.log('this.myValue', this.myValue)
    }
  }
}
</script>
