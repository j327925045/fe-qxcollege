<template>
  <div>
    <div class="gyl-form-view">
      <h3 class="gyl-title"><i class="el-icon-s-order" />操作日志</h3>
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
      <div class="gyl-form-view-box">
        <el-table v-loading="loading" :data="tableData" stripe border>
          <el-table-column fixed="left" label="序号" width="60">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="用户操作" show-overflow-tooltip max-width="180" />
          <el-table-column prop="method" label="请求方法" show-overflow-tooltip min-width="180" />
          <el-table-column prop="params" label="请求参数" show-overflow-tooltip min-width="150" />
          <el-table-column label="执行时长" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.time }}ms</span>
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
import { getLogList } from '@/api/log'
export default {
  name: 'SystemLogList',
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
    /**
     * 搜索按钮点击事件，回到第一页
     */
    search() {
      this.pageSize = 20
      this.currentPage = 1
      this.getList()
    },

    /**
     * 获取列表
     */
    getList() {
      const params = {
        page: this.currentPage,
        limit: this.pageSize,
        params: {
          ...this.form
        }
      }
      console.log('params', params)
      this.loading = true
      getLogList(params).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.total = res.data.totalCount || 0
          this.tableData = res.data.list || []
        } else {
          this.$message.error(res.msg)
        }
      }).catch(_ => {
        this.loading = false
      })
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
