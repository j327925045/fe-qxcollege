<template>
  <el-drawer :visible.sync="drawerVisible" size="650px" custom-class="gyl-detail-drawer" :with-header="false" :wrapper-closable="false">
    <div class="gyl-hamburger" @click="drawerVisible = false">
      <i class="el-icon-arrow-right" />
    </div>
    <div class="drawer-content">
      <el-row type="flex" align="middle" justify="start" class="drawer-tit">
        <h2>{{ editId ? '编辑角色' : '新建角色' }}</h2>
      </el-row>
      <div class="gyl-form-view pb-[60px]">
        <h3 class="gyl-title"><i class="el-icon-s-order" />基本信息</h3>
        <el-form ref="form" :model="form" :rules="rules" label-width="140px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="角色备注" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入角色备注"></el-input>
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
import { addRoleItem, getRoleDetail, updateRoleItem } from '@/api/role'
import { mapGetters } from 'vuex'
export default {
  name: 'AddOrEdit',
  data() {
    return {
      form: {
        name: undefined,
        remark: undefined
      },
      rules: {
        name: [{ required: true, message: '请输入角色名称' }],
        remark: [{ required: true, message: '请输入角色备注' }]
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
      getRoleDetail({ objectCode: this.editId }).then((res) => {
        if (res.code === 200) {
          this.form = {
            name: res.data.name,
            remark: res.data.remark
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
        if (this.editId) {
          data.objectCode = this.editId
          updateRoleItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addRoleItem(data).then((res) => {
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
