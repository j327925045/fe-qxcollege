<template>
  <div>
    <div class="gyl-form-view">
      <span class="form-switch" @click="formSwitch">
        {{ isShow ? '全部收起' : '全部展开' }}
        <i :class="isShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
      </span>
      <h3 class="gyl-title pb-4"><i class="el-icon-s-order" />操作日志</h3>
      <el-form v-show="isShow" ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="操作名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-form-item class="gyl-form-btn-wrap">
            <el-button @click="resetForm">重 置</el-button>
            <el-button type="primary" @click="search">查 询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>

    <div class="gyl-table-view">
      <div class="gyl-form-view-box">
        <AffixedTable v-loading="loading" :data="tableData" stripe border>
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
        </AffixedTable>
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
import AffixedTable from '@/views/components/AffixedTable'
export default {
  name: 'SystemLogList',
  components: {
    AffixedTable
  },
  data() {
    return {
      form: {
        name: ''
      },
      tableData: [],
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      isShow: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    formSwitch() {
      this.isShow = !this.isShow
    },
    /**
     * 搜索按钮点击事件，回到第一页
     */
    search() {
      this.pageSize = 10
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
