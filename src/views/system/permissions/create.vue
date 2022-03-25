<template>
  <div class="gyl-with-footer">
    <div class="gyl-form-view">
      <h3 class="gyl-title"><i class="el-icon-s-order" />基本信息</h3>
      <el-row>
        <el-form ref="form" :model="form" :rules="rules" label-width="140px">
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="是否显示" prop="hide">
              <el-select v-model="form.hide" placeholder="请选择">
                <el-option
                  v-for="item in [{label: '显示', value: 0}, {label: '不显示', value: 1}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="菜单名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="排序" prop="orderNum">
              <el-input-number v-model="form.orderNum" :min="0" class="w-full" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="父菜单ID" prop="parentId">
              <el-input-number v-model="form.parentId" class="w-full" placeholder="请输入"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="类型" prop="type">
              <el-select v-model="form.type" placeholder="请输入">
                <el-option
                  v-for="item in [{label: '目录', value: 1},{label: '菜单', value: 2},{label: '按钮', value: 3}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="菜单URL" prop="url">
              <el-input v-model="form.url" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="授权" prop="urls">
              <el-input v-model="form.urls" placeholder="请输入" />
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
import { addPermissionItem, getPermissionDetail, updatePermissionItem } from '@/api/permission'
import { mapGetters } from 'vuex'
export default {
  name: 'PermissionCreate',
  inject: ['removeTab'],
  data() {
    return {
      form: {
        hide: undefined,
        name: undefined,
        orderNum: undefined,
        parentId: undefined,
        type: undefined,
        url: undefined,
        urls: undefined
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
      getPermissionDetail({ id: this.editId }).then((res) => {
        if (res.code === 200) {
          this.form = {
            hide: res.data.hide,
            name: res.data.name,
            orderNum: res.data.orderNum,
            parentId: res.data.parentId,
            type: res.data.type,
            url: res.data.url,
            urls: res.data.urls
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
          updatePermissionItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.closeTab()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addPermissionItem(data).then((res) => {
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
