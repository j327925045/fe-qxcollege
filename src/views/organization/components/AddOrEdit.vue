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
        <h2>{{ editId?'编辑机构':'新建机构' }}</h2>
      </el-row>
      <div class="gyl-form-view pb-[60px]">
        <h3 class="gyl-title"><i class="el-icon-s-order" />基本信息</h3>
        <el-form ref="form" :model="form" :rules="rules" label-width="140px">
          <el-form-item label="机构全称" prop="name">
            <el-input v-model="form.name" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="机构地址(详细地址)" prop="address">
            <el-input v-model="form.address" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="经营范围" prop="businessScope">
            <el-input v-model="form.businessScope" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="机构性质" prop="nature">
            <el-select v-model="form.nature" placeholder="请选择">
              <el-option
                v-for="item in enums.organizationNature"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="经营状态" prop="operateStatus">
            <el-select v-model="form.operateStatus" placeholder="请选择">
              <el-option
                v-for="item in enums.organizationOperateStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="实缴资本(万)" prop="paidCapital">
            <el-input-number v-model="form.paidCapital" :min="0" controls-position="right" placeholder="请输入"></el-input-number>
          </el-form-item>
          <el-form-item label="所在区域(省市县)" prop="regionCode">
            <RegionSelect v-model="form.regionCode"></RegionSelect>
          </el-form-item>
          <el-form-item label="注册资本(万)" prop="registeredCapital">
            <el-input-number v-model="form.registeredCapital" :min="0" controls-position="right" placeholder="请输入"></el-input-number>
          </el-form-item>
          <el-form-item label="机构规模" prop="scale">
            <el-select v-model="form.scale" placeholder="请选择">
              <el-option
                v-for="item in enums.organizationScale"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机构简称" prop="shortName">
            <el-input v-model="form.shortName" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="机构状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option
                v-for="item in enums.organizationStatus"
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
import { addOrganizationItem, getOrganizationDetail, updateOrganizationItem } from '@/api/organization'
import { mapGetters } from 'vuex'
import RegionSelect from '@/views/components/RegionSelect'

export default {
  name: 'OrganizationCreate',
  components: {
    RegionSelect
  },
  data() {
    return {
      form: {
        address: undefined,
        businessScope: undefined,
        name: undefined,
        nature: undefined,
        operateStatus: undefined,
        paidCapital: undefined,
        regionCode: undefined,
        registeredCapital: undefined,
        scale: undefined,
        shortName: undefined,
        status: undefined
      },
      rules: {},
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
      getOrganizationDetail({ objectCode: this.editId }).then((res) => {
        if (res.code === 200) {
          this.form = {
            address: res.data.address,
            businessScope: res.data.businessScope,
            name: res.data.name,
            nature: res.data.nature,
            operateStatus: res.data.operateStatus,
            paidCapital: res.data.paidCapital,
            regionCode: res.data.regionCode,
            registeredCapital: res.data.registeredCapital,
            scale: res.data.scale,
            shortName: res.data.shortName,
            status: res.data.status
          }
        }
      })
    },

    submitForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          this.$message('请检查表单项！')
          return
        }
        const data = {
          ...this.form
        }
        const formRegionCode = this.form.regionCode
        if (Array.isArray(formRegionCode) && formRegionCode.length > 0) {
          data.regionCode = formRegionCode[formRegionCode.length - 1]
        } else if (formRegionCode) {
          data.regionCode = formRegionCode
        }
        if (this.editId) {
          data.objectCode = this.editId
          updateOrganizationItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addOrganizationItem(data).then((res) => {
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
