<template>
  <el-drawer
    :visible.sync="drawerVisible"
    size="650px"
    custom-class="gyl-detail-drawer"
    :with-header="false"
    :wrapper-closable="false"
  >
    <div class="gyl-hamburger" @click="drawerVisible = false">
      <i class="el-icon-arrow-right" />
    </div>
    <div class="drawer-content">
      <el-row type="flex" align="middle" justify="start" class="drawer-tit">
        <h2>{{ editId?'编辑医院':'新建医院' }}</h2>
      </el-row>
      <div class="gyl-form-view pb-[60px]">
        <h3 class="gyl-title"><i class="el-icon-s-order" />基本信息</h3>
        <el-form ref="form" :model="form" :rules="rules" label-width="140px">
          <el-form-item label="医院名称" prop="name">
            <el-input v-model.trim="form.name" placeholder="请输入医院名称" />
          </el-form-item>
          <el-form-item label="所属机构" prop="organizationCode">
            <OrganizationSelect v-model="form.organizationCode" placeholder="请选择所属机构"></OrganizationSelect>
          </el-form-item>
          <el-form-item label="区域" prop="regionCode">
            <RegionCascader v-model="form.regionCode" placeholder="请选择区域"></RegionCascader>
          </el-form-item>
          <el-form-item label="医院状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择医院状态">
              <el-option
                v-for="item in enums.hospitalStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="fixed bottom-0 right-0 z-10 text-right w-[650px] p-4 bg-white shadow-dark-50 shadow-2xl">
        <el-button @click="closeDrower">取 消</el-button>
        <el-button type="primary" @click="submitForm">保 存</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { addHospitalItem, getHospitalDetail, updateHospitalItem } from '@/api/hospital'
import { mapGetters } from 'vuex'
import OrganizationSelect from '@/views/components/OrganizationSelect'
import RegionCascader from '@/views/components/RegionCascader'

export default {
  name: 'AddOrEdit',
  components: {
    OrganizationSelect,
    RegionCascader
  },
  data() {
    return {
      form: {
        name: undefined,
        organizationCode: undefined,
        regionCode: undefined,
        status: undefined
      },
      rules: {
        name: [{ required: true, message: '请输入医院名称' }],
        organizationCode: [{ required: true, message: '请选择所属机构' }],
        regionCode: [{ required: true, message: '请选择区域' }],
        status: [{ required: true, message: '请选择医院状态' }]
      },
      editId: undefined,
      drawerVisible: false
    }
  },
  computed: {
    ...mapGetters(['enums'])
  },
  methods: {
    add() {
      this.editId = undefined
      this.drawerVisible = true
    },

    edit(editId) {
      this.editId = editId
      this.drawerVisible = true
      this.getItemDetail()
    },

    getItemDetail() {
      getHospitalDetail({ objectCode: this.editId }).then(res => {
        if (res.code === 200) {
          this.form = {
            name: res.data.name,
            organizationCode: res.data.organizationCode,
            regionCode: res.data.regionCode,
            status: res.data.status
          }
        }
      })
    },

    submitForm() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          this.$message('请检查表单项！')
          return
        }
        const data = {
          ...this.form
        }
        if (this.editId) {
          data.objectCode = this.editId
          updateHospitalItem(data).then(res => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addHospitalItem(data).then(res => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.$emit('add')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    closeDrower() {
      this.$refs.form.resetFields()
      this.drawerVisible = false
    }
  }
}
</script>
