<template>
  <div class="gyl-with-footer">
    <div class="gyl-form-view">
      <h3 class="gyl-title"><i class="el-icon-s-order" />基本信息</h3>
      <el-row>
        <el-form ref="form" :model="form" :rules="rules" label-width="140px">
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="机构地址(详细地址)" prop="address">
              <el-input v-model="form.address" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="经营范围" prop="businessScope">
              <el-input v-model="form.businessScope" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="机构全称" prop="name">
              <el-input v-model="form.name" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="机构性质" prop="nature">
              <el-select v-model="form.nature" placeholder="请选择">
                <el-option
                  v-for="item in [
                    { label: '公立', value: 1 },
                    { label: '私立', value: 2 }
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="经营状态" prop="operateStatus">
              <el-select v-model="form.operateStatus" placeholder="请选择">
                <el-option
                  v-for="item in [
                    { label: '存续', value: 1 },
                    { label: '在业', value: 2 },
                    { label: '吊销', value: 3 },
                    { label: '注销', value: 4 },
                    { label: '迁入', value: 5 },
                    { label: '迁出', value: 6 },
                    { label: '停业', value: 7 },
                    { label: '清算', value: 8 }
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="实缴资本(万)" prop="paidCapital">
              <el-input v-model="form.paidCapital" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="所在区域(省市县)" prop="regionCode">
              <el-input v-model="form.regionCode" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="注册资本(万)" prop="registeredCapital">
              <el-input v-model="form.registeredCapital" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="机构规模" prop="scale">
              <el-select v-model="form.scale" placeholder="请选择">
                <el-option
                  v-for="item in [
                    { label: '大型连锁', value: 1 },
                    { label: '菩通机枸', value: 2 }
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="机构简称" prop="shortName">
              <el-input v-model="form.shortName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="机构状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option
                  v-for="item in [
                    { label: '有效', value: 1 },
                    { label: '失效', value: 2 }
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="gyl-footer-bar">
      <div class="txt-right">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">保 存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addOrganizationItem, getOrganizationDetail, updateOrganizationItem } from '@/api/organization'
import { mapGetters } from 'vuex'
export default {
  name: 'OrganizationCreate',
  inject: ['removeTab'],
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
      editId: this.$route.query.id
    }
  },
  computed: {
    ...mapGetters(['enums'])
  },
  created() {
    if (this.editId) {
      this.getItemDetail()
    }
  },
  methods: {
    getItemDetail() {
      getOrganizationDetail({ id: this.editId }).then((res) => {
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
        }
        const data = {
          ...this.form
        }
        if (this.editId) {
          data.id = this.editId
          updateOrganizationItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.closeTab()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addOrganizationItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.closeTab()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    cancel() {
      this.$refs.form.resetFields()
      this.closeTab()
    },
    closeTab() {
      this.removeTab(this.$route.name)
    }
  }
}
</script>
