<template>
  <div>
    <div v-for="(item,idx) in myValue" :key="idx" class="enum-item">
      <el-row>
        <el-col :span="24">
          <el-form-item
            label-width="80px"
            label="针头习惯"
            prop="habit"
          >
            <el-select
              v-model="item.type"
              placeholder="请选择"
              @change="onChange"
            >
              <el-option
                v-for="(item1, index) in habit"
                :key="index"
                :label="item1.name"
                :value="item1.objectCode"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="item.details"
              placeholder="请选择"
              @change="onChange"
            >
              <el-option
                v-for="(item1, index) in zhen"
                :key="index"
                :label="item1.name"
                :value="item1.objectCode"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <div>
        <el-button
          style="height:34px"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          round
          @click="addItem"
        ></el-button>
        <el-button
          style="height:34px"
          size="mini"
          :disabled="myValue.length===1"
          type="danger"
          icon="el-icon-delete"
          round
          @click="deleteItem(idx)"
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script>import request from '@/utils/request.js'
export default {
  name: 'zhen',
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
      habit: [],
      zhen: [],
      datas: [],
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
  created() {
    console.log(JSON.parse(JSON.stringify(this.value)))
    this.setOptionsA('1511999185397583873')
    this.setOptionsB('1511999464503349249')
  },
  methods: {
    setOptionsA(parent) {
      return request({
        url: `/qxcollege/dictionary/getSubset/${parent}`,
        method: 'get'
      }).then((res) => {
        this.habit = res.data
      })
    },
    setOptionsB(parent) {
      return request({
        url: `/qxcollege/dictionary/getSubset/${parent}`,
        method: 'get'
      }).then((res) => {
        this.zhen = res.data
      })
    },

    setMyValue() {
      if (!this.value || this.value.length === 0) {
        this.myValue = [{
          name: undefined,
          objectCode: undefined
        }]
        return
      }
      try {
        this.myValue = JSON.parse(JSON.stringify(this.value))
        console.log(this.myValue)
      } catch (error) {
        this.myValue = [{
          name: undefined,
          objectCode: undefined
        }]
      }
    },

    addItem() {
      this.myValue.push({
        name: undefined,
        objectCode: undefined
      })
      this.onChange()
    },

    deleteItem(idx) {
      this.myValue.splice(idx, 1)
      this.onChange()
    },

    onChange() {
      console.log(this.myValue)
      this.$emit('input', this.myValue)
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
