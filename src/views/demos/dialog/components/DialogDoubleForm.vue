<template>
  <el-dialog
    title="双列编辑弹窗"
    :visible.sync="dialogDoubleForm"
    width="856px"
  >
    <el-form ref="form" :model="ruleForm" :rules="rules" label-width="80px">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="区域编号" prop="areaID">
            <el-input v-model="ruleForm.areaID" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商家编码" prop="areaName">
            <el-input v-model="ruleForm.areaName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预约时间" prop="appointTime">
            <el-input v-model="ruleForm.appointTime" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="事业部" prop="model">
            <el-input v-model="ruleForm.model" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单编号" prop="model">
            <el-input v-model="ruleForm.model" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审核状态" prop="model">
            <el-input v-model="ruleForm.model" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" prop="model">
            <el-input v-model="ruleForm.model" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标题名称" prop="model">
            <el-input v-model="ruleForm.model" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单编号" prop="model">
            <el-input v-model="ruleForm.model" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审核状态" prop="model">
            <el-input v-model="ruleForm.model" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" prop="model">
            <el-input v-model="ruleForm.model" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标题名称" prop="model">
            <el-input v-model="ruleForm.model" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单编号" prop="model">
            <el-input v-model="ruleForm.model" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审核状态" prop="model">
            <el-input v-model="ruleForm.model" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" class="last-row-item" prop="model">
            <el-input v-model="ruleForm.model" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标题名称" class="last-row-item" prop="model">
            <el-input v-model="ruleForm.model" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogDoubleForm = false">取 消</el-button>
      <el-button type="primary" @click="dialogDoubleForm = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogDoubleForm: false,
      ruleForm: {
        areaID: '',
        areaName: '',
        appointTime: '',
        areaNum: '',
        status: '',
        model: ''
      },
      rules: {
        areaID: [
          { required: true, message: '请输入区域编号', trigger: 'blur' }
        ],
        areaName: [
          { required: true, message: '请输入区域名称', trigger: 'blur' }
        ],
        areaNum: [
          { required: true, message: '请输入区域编码', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        model: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show() {
      this.dialogDoubleForm = true
    }
  }
}
</script>
