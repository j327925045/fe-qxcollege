<template>
  <div>
    <div class="gyl-form-view">
      <h3 class="gyl-title"><i class="el-icon-s-order" />模板标题</h3>
      <el-form ref="form" class="gyl-form-flex" :model="form" label-width="100px">
        <el-form-item label="最多五个字" required>
          <el-input v-model="form.f1" />
        </el-form-item>
        <el-form-item label="商家编码" required>
          <el-input v-model="form.f2" />
        </el-form-item>
        <el-form-item label="事业部" required>
          <el-select v-model="form.f3" placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="预约时间" required>
          <el-date-picker v-model="form.f4" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="订单编号" required>
          <el-input v-model="form.f5" />
        </el-form-item>
        <el-form-item label="事业部" required>
          <el-select v-model="form.f6" placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态" required>
          <el-select v-model="form.f7" placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态" required>
          <el-select v-model="form.f8" placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注信息" required>
          <el-input v-model="form.f9" />
        </el-form-item>
        <el-form-item v-show="collapse" label="备注信息1">
          <el-input v-model="form.f10" />
        </el-form-item>
        <el-form-item v-show="collapse" label="商品编码1">
          <el-input v-model="form.f11" />
        </el-form-item>
        <el-form-item class="gyl-form-btn-wrap">
          <el-button @click="resetForm('searchForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('searchForm')"> 查询 </el-button>
          <collapse-form @showChange="mySwitch($event)" />
        </el-form-item>
      </el-form>
    </div>
    <div class="gyl-table-view">
      <el-row class="table-tools">
        <div class="fl">
          <el-button type="primary">主要操作1</el-button>
          <el-button>次要操作</el-button>
          <el-button>次要操作</el-button>
          <el-button>次要操作</el-button>
          <el-button>次要操作</el-button>
        </div>
        <div class="fr">
          <el-button type="primary" plain class="gyl-button-new"> <i class="el-icon-import" /> 导入 </el-button>
          <el-button type="primary" plain class="gyl-button-new"> <i class="el-icon-export" /> 导出 </el-button>
        </div>
      </el-row>
      <div class="mb10">
        <el-table :data="tableData" border stripe max-height="528">
          <el-table-column prop="date" label="日期" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="address" label="地址" />
        </el-table>
      </div>
      <div class="gyl-pagination">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="10"
          :page-sizes="[10, 20, 30, 40]"
          :current-page="currentPage"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CollapseForm from './components/CollapseForm.vue'
export default {
  name: 'Form',
  components: { CollapseForm },
  data() {
    return {
      collapse: false,
      form: {
        f1: '',
        f2: '',
        f3: '',
        f4: '',
        f5: '',
        f7: '',
        f8: '',
        f9: '',
        f10: '',
        f11: '',
        f12: ''
      },
      tableData: [],
      currentPage: 4,
      total: 100
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const data = []
      for (let i = 0; i < 10; i++) {
        data.push({
          number: '1',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        })
      }
      this.tableData = data
      // this.total = data.length
    },
    mySwitch(e) {
      this.collapse = e
    },
    submitForm(formName) {
      console.log('提交')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
