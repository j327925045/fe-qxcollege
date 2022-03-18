<template>
  <el-dialog title="高级编辑弹窗" :visible.sync="dialogEdit" width="900px">
    <el-form ref="ruleForm" :model="form" label-width="120px">
      <el-row :gutter="10" class="mb10">
        <el-col :span="12">
          <el-form-item label="机构" prop="f1" required>
            <el-select v-model="form.f1" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="区域" prop="f2" required>
            <el-select v-model="form.f2" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="配送中心" prop="f3" required>
            <el-radio-group v-model="form.f3">
              <el-radio label="新增配送中心" />
              <el-radio label="选择已有" />
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="配送中心编码" prop="f4" required>
            <el-input v-model="form.f4" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="配送中心名称" prop="f5" required>
            <el-input v-model="form.f5" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="仓库号" prop="f6" required>
            <el-select v-model="form.f6" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="仓库名" prop="f7" required>
            <el-select v-model="form.f7" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="选择开通系统" prop="f8">
            <el-radio-group v-model="form.f8" class="mb10">
              <el-radio-button label="全部系统" />
              <el-radio-button label="单WMS" />
              <el-radio-button label="纯配系统" />
            </el-radio-group>
            <p>
              <span class="gyl-tag main round">WMS</span>
              <span class="gyl-tag main round">调度</span>
              <span class="gyl-tag main round">承运</span>
            </p>
          </el-form-item>
        </el-col>
      </el-row>
      <h4 class="gyl-sub-tit">配置开通系统参数</h4>
      <div class="gyl-edit-card">
        <h5>WMS系统</h5>
        <div class="card-content">
          <el-row :gutter="10" class="mb10">
            <el-col :span="12">
              <el-form-item label="登录账户类型" prop="f11" required>
                <el-select v-model="form.f11" placeholder="请选择">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="仓库分类" prop="f12" required>
                <el-select v-model="form.f12" placeholder="请选择">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="仓库短码" prop="f13" required>
                <el-input v-model="form.f13" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数参照仓库" prop="f14" required>
                <el-select v-model="form.f14" placeholder="请选择">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="仓库所在地" prop="f15" required>
                <el-select v-model="form.f15" placeholder="请选择">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="详细地址" prop="f16" required>
                <el-input v-model="form.f16" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人姓名" prop="f7">
                <el-input v-model="form.f17" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人电话" prop="f8">
                <el-input v-model="form.f18" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="gyl-edit-card">
        <h5>承运系统</h5>
        <div class="card-content">
          <el-row :gutter="10" class="mb10">
            <el-col :span="12">
              <el-form-item label="领用人编号" prop="f21" required>
                <el-input v-model="form.f21" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="领用人姓名" prop="f22" required>
                <el-input v-model="form.f22" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="对应人资架构" prop="f23" required>
                <el-select v-model="form.f23" placeholder="请选择">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="配送中心电话" prop="f24" required>
                <el-input v-model="form.f24" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="枢纽城市" prop="f25" required>
                <el-select v-model="form.f25" placeholder="请选择">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogEdit = false">取消</el-button>
      <el-button type="primary" @click="dialogEdit = false">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogEdit: false,
      form: {
        f1: '',
        f2: '',
        f3: '新增配送中心',
        f4: '',
        f5: '',
        f6: '',
        f7: '',
        f8: '全部系统',
        f11: '',
        f12: '',
        f13: '',
        f14: '',
        f15: '',
        f16: '',
        f17: '',
        f18: '',
        f21: '',
        f22: '',
        f23: '',
        f24: '',
        f25: ''
      }
    }
  },
  methods: {
    show() {
      this.dialogEdit = true
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-input,
/deep/ .el-select {
  display: block;
}
</style>
