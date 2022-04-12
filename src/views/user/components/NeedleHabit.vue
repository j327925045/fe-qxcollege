<template>
  <div>
    <div v-for="(item, idx) in myValue" :key="idx" class="mb-4">
      <el-select v-model="item.type" placeholder="请选择产品" @change="onChange">
        <el-option v-for="opt in options" :key="opt.objectCode" :label="opt.name" :value="opt.objectCode"> </el-option>
      </el-select>
      <el-select v-model="item.details" class="ml-4 mr-4" placeholder="请选择针头" @change="onChange">
        <el-option v-for="opt in enums.zhen" :key="opt.value" :label="opt.label" :value="opt.value"> </el-option>
      </el-select>
      <el-button class="ml-4" size="mini" type="primary" icon="el-icon-plus" round @click="addItem"></el-button>
      <el-button class="ml-4" size="mini" :disabled="myValue.length === 1" type="danger" icon="el-icon-delete" round @click="deleteItem(idx)"></el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getProductList } from '@/api/product'
export default {
  name: 'NeedleHabit',
  props: {
    value: {
      type: [Array, Number],
      default() {
        return []
      }
    }
  },
  data() {
    return {
      myValue: [],
      options: []
    }
  },
  computed: {
    ...mapGetters(['enums'])
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
    getOptions() {
      getProductList({}).then(res => {
        if (res.code === 200) {
          this.options = res.data.list
        }
      })
    },
    setMyValue() {
      if (!Array.isArray(this.value) || !this.value || this.value.length === 0) {
        this.myValue = [{
          type: undefined,
          details: undefined
        }]
        return
      }
      try {
        this.myValue = JSON.parse(JSON.stringify(this.value))
      } catch (error) {
        this.myValue = [
          {
            type: undefined,
            details: undefined
          }
        ]
      }
    },

    addItem() {
      this.myValue.push({
        type: undefined,
        details: undefined
      })
      this.onChange()
    },

    deleteItem(idx) {
      this.myValue.splice(idx, 1)
      this.onChange()
    },

    onChange() {
      this.$emit('input', this.myValue)
    }
  }
}
</script>
