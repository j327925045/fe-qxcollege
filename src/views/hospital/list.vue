<template>
  <div>
    <div class="gyl-form-view">
      <span class="form-switch" @click="formSwitch">
        {{ isShow ? '全部收起' : '全部展开' }}
        <i :class="isShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
      </span>
      <h3 class="gyl-title pb-4"><i class="el-icon-s-order" />医院列表</h3>
      <el-form v-show="isShow" ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="医院名称" prop="name">
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
      <el-row class="table-tools">
        <el-button type="primary" @click="addItem">新建医院</el-button>
      </el-row>
      <div class="gyl-form-view-box">
        <el-table v-loading="loading" :data="tableData" stripe border>
          <el-table-column fixed="left" label="序号" width="60">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称" show-overflow-tooltip min-width="150" />
          <el-table-column prop="organizationName" label="所属机构" show-overflow-tooltip min-width="150">
            <template slot-scope="scope">
              {{ scope.row.organizationName||'-' }}
            </template>
          </el-table-column>
          <el-table-column prop="regionFullName" label="区域" show-overflow-tooltip min-width="150" />
          <el-table-column prop="status" label="医院状态" show-overflow-tooltip min-width="150">
            <template slot-scope="scope">
              {{ scope.row.status|getLabelByValue('hospitalStatus') }}
            </template>
          </el-table-column>
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

    <AddOrEdit ref="AddOrEdit" @update="getList" @add="getList"></AddOrEdit>
  </div>
</template>

<script>
import { getHospitalList, deleteHospitalItem } from '@/api/hospital'
import AddOrEdit from './components/AddOrEdit'

export default {
  name: 'HospitalList',
  components: {
    AddOrEdit
  },
  data() {
    return {
      form: {
        name: undefined
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

    addItem() {
      this.$refs.AddOrEdit.add()
    },

    editItem(record) {
      this.$refs.AddOrEdit.edit(record.objectCode)
    },

    deleteItem(record) {
      this.$confirm('确定要删除该项吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          deleteHospitalItem({ objectCode: record.objectCode }).then(res => {
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
      getHospitalList(params).then(res => {
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
