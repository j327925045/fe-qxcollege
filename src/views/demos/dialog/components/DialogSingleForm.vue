<template>
  <el-dialog title="单列编辑弹窗" :visible.sync="dialogSingleForm" width="440px">
    <el-form ref="form" :model="ruleForm" :rules="rules" label-width="80px" class="gyl-form-dialog">
      <el-form-item label="区域编号" prop="areaID">
        <el-input v-model="ruleForm.areaID" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item label="区域名称" prop="areaName">
        <el-input v-model="ruleForm.areaName" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item label="区域编码" prop="areaNum">
        <el-input v-model="ruleForm.areaNum" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="ruleForm.status" clearable placeholder="请选择">
          <el-option label="label" value="value" />
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogSingleForm = false">取 消</el-button>
      <el-button type="primary" @click="dialogSingleForm = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogSingleForm: false,
      ruleForm: {
        areaID: '',
        areaName: '',
        areaNum: '',
        status: ''
      },
      rules: {
        areaID: [{ required: true, message: '请输入区域编号', trigger: 'blur' }],
        areaName: [{ required: true, message: '请输入区域名称', trigger: 'blur' }],
        areaNum: [{ required: true, message: '请输入区域编码', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'blur' }]
      }
    }
  },
  methods: {
    show() {
      this.dialogSingleForm = true
    }
  }
}
</script>
