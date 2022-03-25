<template>
  <div>
    <div class="gyl-form-view">
      <h3 class="gyl-title"><i class="el-icon-s-order" />员工列表</h3>
      <el-form ref="form" :model="filterForm" label-width="100px">
        <el-row>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="filterForm.name" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="账号" prop="account">
              <el-input v-model="filterForm.account" placeholder="请输入" />
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
        <el-button type="primary" @click="createNewEmployees">新建员工</el-button>
      </el-row>
      <div class="gyl-form-view-box">
        <el-table v-loading="loading" :data="tableData" stripe border>
          <el-table-column fixed="left" label="序号" width="60">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="员工姓名" show-overflow-tooltip min-width="120" />
          <el-table-column prop="account" label="账号" show-overflow-tooltip min-width="120" />
          <el-table-column label="创建时间" show-overflow-tooltip min-width="120">
            <template slot-scope="scope">
              {{ scope.row.createTime|dateFormat }}
            </template>
          </el-table-column>
          <el-table-column label="更新时间" show-overflow-tooltip min-width="120">
            <template slot-scope="scope">
              {{ scope.row.updateTime|dateFormat }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="showDetail(scope.row)">查看</el-button>
              <el-button type="text" size="mini" @click="editItem(scope.row)">编辑</el-button>
              <el-button type="text" size="mini" @click="deleteItem(scope.row)">删除</el-button>
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
    <DetailDialog ref="DetailDialog"></DetailDialog>
  </div>
</template>

<script>
import { getEmployeesList, deleteEmployeesItem } from '@/api/employees.js'
import DetailDialog from '@/views/employees/components/DetailDialog'
export default {
  name: 'EmployeesList',
  components: {
    DetailDialog
  },
  data() {
    return {
      filterForm: {
        name: undefined,
        account: undefined
      },
      tableData: [],
      loading: false,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      detailDialogVisible: false,
      employDetail: {}
    }
  },
  activated() {
    this.getList()
  },
  methods: {
    /**
     * 展示详情
     */
    showDetail(record) {
      this.$refs.DetailDialog.show(record)
    },

    /**
     * 编辑
     */
    editItem(record) {
      this.$router.push({ name: 'EmployeesUpdate', query: { id: record.id } })
    },

    /**
     * 删除
     */
    deleteItem(record) {
      this.$confirm('确定要删除该项吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          deleteEmployeesItem({ id: record.id }).then(res => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.getList()
            } else {
              this.$message.error(res.message)
            }
          })
        })
        .catch(() => {
        })
    },

    createNewEmployees() {
      this.$router.push({ name: 'EmployeesCreate' })
    },

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
          ...this.filterForm
        }
      }
      this.loading = true
      getEmployeesList(params).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.total = res.data.totalCount
          this.tableData = res.data.list || []
        } else {
          this.$message.error(res.message)
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
