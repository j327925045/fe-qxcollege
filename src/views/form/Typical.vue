<template>
  <div id="gyl-full-box">
    <div id="search-box" class="gyl-form-view">
      <h3 class="gyl-title"><i class="el-icon-s-order" />模板标题</h3>
      <el-row>
        <el-form ref="form" :model="form" label-width="100px">
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="最多五个字" required>
              <el-input v-model="form.f1" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="商家编码" required>
              <el-input v-model="form.f2" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="事业部" required>
              <el-select v-model="form.f3" placeholder="请选择">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="预约时间" required>
              <el-date-picker v-model="form.f4" type="date" placeholder="选择日期" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="订单编号" required>
              <el-input v-model="form.f5" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="事业部" required>
              <el-select v-model="form.f6" placeholder="请选择">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="审核状态" required>
              <el-select v-model="form.f7" placeholder="请选择">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="审核状态" required>
              <el-select v-model="form.f8" placeholder="请选择">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="备注信息" required>
              <el-input v-model="form.f9" />
            </el-form-item>
          </el-col>
          <el-col v-show="collapse" :span="8">
            <el-form-item label="备注信息1">
              <el-input v-model="form.f10" />
            </el-form-item>
          </el-col>
          <el-col v-show="collapse" :span="8">
            <el-form-item label="商品编码1">
              <el-input v-model="form.f11" />
            </el-form-item>
          </el-col>
          <el-col :span="8" class="fr txt-right">
            <el-button @click="resetForm('form')">重 置</el-button>
            <el-button type="primary" @click="submitForm('form')">查 询</el-button>
            <collapse-form @showChange="mySwitch($event)" />
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div id="list-box" class="gyl-table-view">
      <el-row class="table-tools">
        <div class="fl">
          <el-button type="primary">主要操作1</el-button>
          <el-button main>次要操作</el-button>
          <el-button main>次要操作</el-button>
          <el-button main>次要操作</el-button>
          <el-button main>次要操作</el-button>
          <el-button main>次要操作</el-button>
          <el-button main>次要操作</el-button>
          <el-button main>次要操作</el-button>
        </div>
        <div class="fr">
          <el-button class="gyl-button-new"><i class="el-icon-import" /> 导入</el-button>
          <el-button class="gyl-button-new"><i class="el-icon-export" /> 导出</el-button>
        </div>
      </el-row>
      <div class="mb10">
        <el-table :data="tableData" border stripe max-height="528" class="gyl-form-view">
          <el-table-column prop="number" label="序号" width="80" />
          <el-table-column prop="date" label="日期" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="address" label="地址" />
        </el-table>
      </div>
      <div class="gyl-pagination">
        <el-pagination
          v-show="isShow"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="10"
          :page-sizes="[10, 20, 30, 40]"
          :current-page="currentPage"
          :total="400"
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
      isShow: false,
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
      minHeight: 300,
      mainHeight: null,
      searchHeight: null,
      tableHeight: null
    }
  },
  computed() {
    // this.initHeight()
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const data = []
      for (let i = 0; i < 12; i++) {
        data.push({
          number: '1',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        })
      }
      this.tableData = data
      if (this.tableData.length < 7) {
        this.isShow = false
      } else {
        this.isShow = true
      }
      this.initHeight()
    },
    initHeight() {
      const mainHeight = document.getElementById('gyl-full-box').offsetHeight
      console.log('ddd:' + mainHeight)
      /* this.searchHeight = document.getElementById('search-box').offsetHeight
      this.tableHeight = document.getElementById('list-box').offsetHeight
      if (this.searchHeight && this.mainHeight) {
        let value = this.mainHeight - this.searchHeight
        if (value > 0) {
          if (value < this.minHeight) {
            value = this.minHeight
          }
          this.tableHeight = value + 'px'
        }
      } */
    },
    /* getHeight(id) {
      return getComputedStyle(document.getElementById(id)).height
    }, */
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

<style lang="scss" scoped>
#gyl-full-box {
  min-height: calc(100vh - 60px - 85px);
}
</style>
