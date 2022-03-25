<template>
  <el-drawer :visible.sync="drawerVisible" size="650px" custom-class="gyl-detail-drawer" :with-header="false" :wrapper-closable="false">
    <div class="gyl-hamburger" @click="drawerVisible = false">
      <i class="el-icon-arrow-right" />
    </div>
    <div class="drawer-content">
      <el-row type="flex" align="middle" justify="start" class="drawer-tit">
        <h2>{{ editId ? '编辑权限' : '新建权限' }}</h2>
      </el-row>
      <div class="gyl-form-view pb-[60px]">
        <h3 class="gyl-title"><i class="el-icon-s-order" />基本信息</h3>
        <el-form ref="form" :model="form" :rules="rules" label-width="140px">
          <el-form-item label="是否显示" prop="hide">
            <el-select v-model="form.hide" placeholder="请选择">
              <el-option
                v-for="item in [
                  { label: '显示', value: 0 },
                  { label: '不显示', value: 1 }
                ]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="排序" prop="orderNum">
            <el-input-number v-model="form.orderNum" :min="0" class="w-full" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="父菜单ID" prop="parentId">
            <el-input-number v-model="form.parentId" class="w-full" placeholder="请输入"></el-input-number>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select v-model="form.type" placeholder="请输入">
              <el-option
                v-for="item in [
                  { label: '目录', value: 1 },
                  { label: '菜单', value: 2 },
                  { label: '按钮', value: 3 }
                ]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单URL" prop="url">
            <el-input v-model="form.url" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="授权" prop="urls">
            <el-input v-model="form.urls" placeholder="请输入" />
          </el-form-item>
        </el-form>
      </div>
      <div class="fixed bottom-0 right-0 text-right w-[650px] p-4 bg-white shadow-dark-50 shadow-2xl">
        <el-button @click="closeDrower">取 消</el-button>
        <el-button type="primary" @click="submitForm">保 存</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { addPermissionItem, getPermissionDetail, updatePermissionItem } from '@/api/permission'
import { mapGetters } from 'vuex'
export default {
  name: 'AddOrEdit',
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
          return
        }
        const data = {
          ...this.form
        }
        if (this.editId) {
          data.id = this.editId
          updatePermissionItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addPermissionItem(data).then((res) => {
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
