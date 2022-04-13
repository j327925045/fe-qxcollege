<template>
  <div>
    <div v-for="(item, idx) in myValue" :key="idx" class="enum-item">
      <el-row class="row" :gutter="24">
        <el-col :span="6">
          <el-form-item label-width="80px" label="机构" required>
            <HospitalSelect v-model="item.hospitalCode" :disabled-code="disabledCode" class="w-full" @change="onChange"></HospitalSelect>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="80px" label="科室" required>
            <el-select v-model="item.orgDepartment" class="w-full" placeholder="请选择" @change="onChange">
              <el-option v-for="(opt, index) in enums.realDepartment" :key="index" :label="opt.label" :value="opt.value"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="80px" label="机构关系" required>
            <el-select v-model="item.relationship" class="w-full" placeholder="请选择" @change="onChange">
              <el-option v-for="(opt, index) in enums.relationship" :key="index" :label="opt.label" :value="opt.value"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="80px" label="机构职务" required>
            <el-select v-model="item.post" class="w-full" placeholder="请选择" @change="onChange">
              <el-option v-for="(opt, index) in enums.position" :key="index" :label="opt.label" :value="opt.value"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-link class="btn" :disabled="myValue.length === 1" @click="deleteItem(idx)"><i class="el-icon-delete"></i></el-link>
    </div>
    <a class="addBtn" href="javascript:;" @click="addItem">
      <span>
        <i class="el-icon-plus"></i>添加
      </span>
    </a>
  </div>
</template>

<script>
import HospitalSelect from '@/views/components/HospitalSelect'
import { mapGetters } from 'vuex'
export default {
  name: 'OrgInfoList',
  components: {
    HospitalSelect
  },
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
  computed: {
    ...mapGetters(['enums']),
    disabledCode() {
      return this.myValue.map(i => i.hospitalCode)
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
    setMyValue() {
      if (!this.value || this.value.length === 0) {
        this.myValue = [
          {
            hospitalCode: undefined,
            orgDepartment: undefined,
            relationship: undefined,
            post: undefined
          }
        ]
        return
      }
      try {
        this.myValue = JSON.parse(JSON.stringify(this.value))
      } catch (error) {
        this.myValue = [
          {
            hospitalCode: undefined,
            orgDepartment: undefined,
            relationship: undefined,
            post: undefined
          }
        ]
      }
    },

    addItem() {
      this.myValue.push({
        hospitalCode: undefined,
        orgDepartment: undefined,
        relationship: undefined,
        post: undefined
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

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.enum-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  .row {
    flex: 1;
  }

  .btn {
    min-width: 24px;
    transform: translate(0, 10px);
  }
}

.addBtn {
  display: block;
  width: 100%;
  text-align: center;
  border: 1px #ccc dashed;
  transition: all 0.3s;

  &:hover {
    color: $mainColor;
    border-color: $mainColor;
  }
}
</style>
