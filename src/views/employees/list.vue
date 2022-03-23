<template>
  <div>
    <div class="gyl-form-view">
      <h3 class="gyl-title"><i class="el-icon-s-order" />员工列表</h3>
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="输入框" prop="f1">
              <el-input v-model="form.f1" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="输入框" prop="f2">
              <el-input v-model="form.f2" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="下拉框" prop="f3">
              <el-select v-model="form.f3" placeholder="请选择">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-form-item class="gyl-form-btn-wrap">
            <el-button @click="resetForm('form')">重 置</el-button>
            <el-button type="primary" @click="search">查 询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>

    <div class="gyl-table-view">
      <el-row class="table-tools">
        <div class="fl">
          <el-button type="primary" @click="createNewEmployees">新建员工</el-button>
          <el-button>次要操作</el-button>
        </div>
        <div class="fr">
          <el-button type="primary" plain class="gyl-button-new"><i class="el-icon-import" /> 导入</el-button>
          <el-button type="primary" plain class="gyl-button-new"><i class="el-icon-export" /> 导出</el-button>
        </div>
      </el-row>
      <div class="gyl-form-view-box">
        <el-table v-loading="loading" :data="tableData" stripe border>
          <el-table-column fixed="left" label="序号" width="60">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column prop="t1" label="t1" show-overflow-tooltip min-width="180" />
          <el-table-column prop="t2" label="t2" show-overflow-tooltip min-width="180" />
          <el-table-column prop="t3" label="t3" show-overflow-tooltip min-width="150" />
          <el-table-column prop="t4" label="t4" show-overflow-tooltip min-width="180" />
          <el-table-column prop="t5" label="t5" show-overflow-tooltip min-width="120" />
          <el-table-column prop="t6" label="t6" show-overflow-tooltip min-width="120" />
          <el-table-column prop="t7" label="t7" show-overflow-tooltip min-width="120" />
          <el-table-column prop="t8" label="t8" show-overflow-tooltip min-width="120" />
          <el-table-column prop="t9" label="t9" show-overflow-tooltip min-width="120" />
          <el-table-column prop="t10" label="t10" show-overflow-tooltip min-width="120" />
          <el-table-column prop="t11" label="t11" show-overflow-tooltip min-width="120" />
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handleClick(scope.row)">查看</el-button>
              <el-button type="text" size="mini">编辑</el-button>
              <el-button type="text" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="gyl-pagination">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="pageSize"
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
export default {
  name: 'EmployeesList',
  data() {
    return {
      form: {
        f1: '',
        f2: '',
        f3: ''
      },
      tableData: [],
      loading: false,
      currentPage: 1,
      pageSize: 20,
      total: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    createNewEmployees() {
      this.$router.push({ name: 'EmployeesCreate' })
    },

    /**
     * 搜索按钮点击事件，回到第一页
     */
    search() {
      this.pageSize = 20
      this.currentPage = 1
      this.search()
    },

    /**
     * 获取列表
     */
    getList() {
      const params = {
        current_page: this.currentPage,
        page_size: this.pageSize,
        ...this.form
      }
      console.log('params', params)
      this.loading = true
      setTimeout(() => {
        this.loading = false
        const result = []
        for (let i = 0; i < 20; i++) {
          result.push({
            t1: 't1',
            t2: 't2',
            t3: 't3',
            t4: 't4',
            t5: 't5',
            t6: 't6',
            t7: 't7',
            t8: 't8',
            t9: 't9',
            t10: 't10',
            t11: 't11'
          })
        }
        this.total = 100
        this.tableData = result
      }, 1000)
    },

    /**
     * 重置表单
     */
    resetForm() {
      this.$refs.form.resetFields()
      this.search()
    },

    /**
     * 每页个数发生变化事件
     */
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },

    /**
     * 当前页码发生变化事件
     */
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    }
  }
}
</script>
