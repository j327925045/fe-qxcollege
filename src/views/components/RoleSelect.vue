<template>
  <el-select v-model="myValue" multiple :placeholder="placeholder" @change="onChange">
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
import { getAllRoleList } from '@/api/role'
export default {
  name: 'RoleSelect',
  props: {
    value: {
      type: [Number, String, Array],
      default: undefined
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
      getAllRoleList({}).then(res => {
        if (res.code === 200) {
          this.options = res.data
        }
      })
    },

    onChange() {
      console.log('this.myValue', this.myValue)
      this.$emit('input', this.myValue)
    }
  }
}
</script>
