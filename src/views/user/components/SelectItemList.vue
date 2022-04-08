<template>
  <div>
    <div v-for="(item,idx) in myValue" :key="idx" class="enum-item">
      <el-row>
        <el-col :span="8">
          <el-form-item
            label-width="80px"
            label="医院"
            prop="hospital"
          >
            <el-select
              v-model="item.realHospitalCode"
              placeholder="请选择"
              @change="onChange"
            >
              <el-option
                v-for="(item1, index) in hospital"
                :key="index"
                :label="item1.name"
                :value="item1.objectCode"
              >
              </el-option>
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="8">

          <el-form-item
            label-width="80px"
            label="科室"
            prop="department"
          >
            <el-select
              v-model="item.realDepartment"
              placeholder="请选择"
              @change="onChange"
            >
              <el-option
                v-for="(item2, index) in department"
                :key="index"
                :label="item2.name"
                :value="item2.objectCode"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item
            label-width="80px"
            label="机构关系"
            prop="relationship"
          >
            <el-select
              v-model="item.realRelationshipInstitutions"
              placeholder="请选择"
              @change="onChange"
            >
              <el-option
                v-for="(item1, index) in relationship"
                :key="index"
                :label="item1.name"
                :value="item1.objectCode"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label-width="80px"
            label="机构职务"
            prop="position"
          >
            <el-select
              v-model="item.realInstitutionalAppointment"
              placeholder="请选择"
              @change="onChange"
            >
              <el-option
                v-for="(item1, index) in position"
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
  name: 'SelectItemList',
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
      hospital: [],
      department: [],
      relationship: [],
      position: [],
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
    this.setOptionsA('1511981602954915841')
    this.setOptionsB('1509918194763927554')
    this.setOptionsC('1511986012586094594')
    this.setOptionsD('1511986276340707329')
  },
  methods: {
    setOptionsA(parent) {
      return request({
        url: `/qxcollege/dictionary/getSubset/${parent}`,
        method: 'get'
      }).then((res) => {
        this.hospital = res.data
      })
    },
    setOptionsB(parent) {
      return request({
        url: `/qxcollege/dictionary/getSubset/${parent}`,
        method: 'get'
      }).then((res) => {
        this.department = res.data
      })
    },
    setOptionsC(parent) {
      return request({
        url: `/qxcollege/dictionary/getSubset/${parent}`,
        method: 'get'
      }).then((res) => {
        this.relationship = res.data
      })
    },
    setOptionsD(parent) {
      return request({
        url: `/qxcollege/dictionary/getSubset/${parent}`,
        method: 'get'
      }).then((res) => {
        this.position = res.data
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
