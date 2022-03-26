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
        <h2>{{ editId?'编辑字段':'新建字段' }}</h2>
      </el-row>
      <div class="gyl-form-view pb-[60px]">
        <h3 class="gyl-title"><i class="el-icon-s-order" />基本信息</h3>
        <el-form ref="form" :model="form" :rules="rules" label-width="140px">
          <el-form-item label="字段名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入字段名称" />
          </el-form-item>
          <!-- <el-form-item label="字段图标" prop="icon">
            <el-input v-model="form.icon" placeholder="请输入字段图标" />
          </el-form-item>
          <el-form-item label="字段顺序">
            <el-input-number v-model="form.level" controls-position="right" placeholder="请输入字段顺序"></el-input-number>
          </el-form-item> -->
          <!-- <el-form-item label="上层归属">
            <el-input-number v-model="form.parentId" controls-position="right" placeholder="请输入上层归属"></el-input-number>
          </el-form-item> -->
          <el-form-item label="字段标识" prop="sign">
            <el-input v-model="form.sign" placeholder="请输入字段标识" />
          </el-form-item>
          <el-form-item label="字段状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择字段状态">
              <el-option
                v-for="item in [{label: '启用', value: 0}, {label: '停用', value: 1}]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字段选项" prop="options">
            <EnumOption v-model="form.options"></EnumOption>
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
import { setDictionaryByOnce, getDictionaryDetail, updateDictionaryItem } from '@/api/dictionary'
import EnumOption from './EnumOption'
export default {
  name: 'AddOrEdit',
  components: {
    EnumOption
  },
  data() {
    return {
      form: {
        name: undefined,
        // icon: undefined,
        // level: undefined,
        // parentId: undefined,
        sign: undefined,
        status: undefined,
        options: []
      },
      rules: {
        name: [{ required: true, message: '请输入字段名称' }],
        sign: [{ required: true, message: '请输入字段标识' }],
        status: [{ required: true, message: '请选择字段状态' }],
        options: [{ required: true, message: '请配置字段选项' }]
      },
      editId: undefined,
      drawerVisible: false
    }
  },
  methods: {
    add() {
      this.editId = undefined
      this.drawerVisible = true
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },

    edit(editId) {
      this.editId = editId
      this.drawerVisible = true
      this.getItemDetail()
    },

    getItemDetail() {
      getDictionaryDetail({ objectCode: this.editId }).then(res => {
        if (res.code === 200) {
          this.form = {
            name: res.data.name,
            // icon: res.data.icon,
            // level: res.data.level,
            // parentId: res.data.parentId,
            sign: res.data.sign,
            status: res.data.status,
            options: res.data.options
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
          icon: '',
          level: 0,
          parentId: 0,
          ...this.form
        }
        if (this.form.options && this.form.options.length > 0) {
          data.options = this.form.options.filter(item => {
            return typeof item.label !== 'undefined' && typeof item.value !== 'undefined'
          })
        }
        if (this.editId) {
          data.objectCode = this.editId
          updateDictionaryItem(data).then(res => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          setDictionaryByOnce(data).then(res => {
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
