<template>
  <div>
    <div class="gyl-form-view">
      <h3 class="gyl-title"><i class="el-icon-s-order" />机构列表</h3>
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="机构名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入" />
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
        <el-button type="primary" @click="addItem">添加机构</el-button>
      </el-row>
      <div class="gyl-form-view-box">
        <el-table v-loading="loading" :data="tableData" stripe border>
          <el-table-column fixed="left" label="序号" width="60">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="机构地址(详细地址)" show-overflow-tooltip min-width="180" />
          <el-table-column prop="businessScope" label="经营范围" show-overflow-tooltip min-width="180" />
          <el-table-column prop="name" label="机构全称" show-overflow-tooltip min-width="150" />
          <el-table-column prop="nature" label="机构性质" show-overflow-tooltip min-width="180" />
          <el-table-column prop="operateStatus" label="经营状态" show-overflow-tooltip min-width="120" />
          <el-table-column prop="paidCapital" label="实缴资本(万)" show-overflow-tooltip min-width="120" />
          <el-table-column prop="regionCode" label="所在区域" show-overflow-tooltip min-width="120" />
          <el-table-column prop="registeredCapital" label="注册资本(万)" show-overflow-tooltip min-width="120" />
          <el-table-column prop="scale" label="机构规模" show-overflow-tooltip min-width="120" />
          <el-table-column prop="shortName" label="机构简称" show-overflow-tooltip min-width="120" />
          <el-table-column prop="status" label="机构状态" show-overflow-tooltip min-width="120" />
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="editItem(scope.row)">编辑</el-button>
              <el-button type="text" @click="deleteItem(scope.row)">删除</el-button>
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
import { getOrganizationList, deleteOrganizationItem } from '@/api/organization'
export default {
  name: 'OrganizationList',
  data() {
    return {
      form: {
        name: undefined
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
    editItem(record) {
      this.$router.push({ name: 'OrganizationUpdate', query: { id: record.objectCode } })
    },

    deleteItem(record) {
      this.$confirm('确定要删除该项吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          deleteOrganizationItem({ id: record.objectCode }).then(res => {
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
    /**
     * 添加用户
     */
    addItem() {
      this.$router.push({ name: 'OrganizationCreate' })
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
        ...this.form
      }
      console.log('params', params)
      this.loading = true
      getOrganizationList(params).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.total = res.data.totalCount
          this.tableData = res.data.list || []
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
