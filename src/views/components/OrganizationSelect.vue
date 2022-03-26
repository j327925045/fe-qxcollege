<template>
  <el-select v-model="myValue" :placeholder="placeholder" @change="onChange">
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
import { getAllOrganizationItems } from '@/api/organization'
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
      console.log('this.value', this.value)
      this.myValue = this.value
    },

    getOptions() {
      getAllOrganizationItems({}).then(res => {
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
