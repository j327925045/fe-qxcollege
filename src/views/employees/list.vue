<template>
  <div>
    <div class="gyl-form-view">
      <span class="form-switch" @click="formSwitch">
        {{ isShow ? '全部收起' : '全部展开' }}
        <i :class="isShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
      </span>
      <h3 class="gyl-title pb-4"><i class="el-icon-s-order" />员工列表</h3>
      <el-form v-show="isShow" ref="form" :model="filterForm" label-width="100px">
        <el-row>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="员工姓名" prop="name">
              <el-input v-model="filterForm.name" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-form-item class="float-right">
            <el-button @click="resetForm">重 置</el-button>
            <el-button type="primary" @click="search">查 询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>

    <div class="bg-white p-4">
      <el-row class="mb-4">
        <el-button type="primary" @click="addItem">新建员工</el-button>
      </el-row>
      <AffixedTable v-loading="loading" :data="tableData" border stripe>
        <el-table-column fixed="left" label="序号" width="60">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="员工姓名" show-overflow-tooltip min-width="120">
          <template slot-scope="scope">
            {{ scope.row.name || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="员工性别" show-overflow-tooltip min-width="120">
          <template slot-scope="scope">
            {{ scope.row.gender|getLabelByValue('gender') }}
          </template>
        </el-table-column>
        <el-table-column label="员工性质" show-overflow-tooltip min-width="120">
          <template slot-scope="scope">
            {{ scope.row.nature|getLabelByValue('employeeNature') }}
          </template>
        </el-table-column>
        <el-table-column label="员工状态" show-overflow-tooltip min-width="120">
          <template slot-scope="scope">
            {{ scope.row.status|getLabelByValue('employeeStatus') }}
          </template>
        </el-table-column>
        <el-table-column label="账号（手机号）" show-overflow-tooltip min-width="120">
          <template slot-scope="scope">
            {{ scope.row.account || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" show-overflow-tooltip min-width="120">
          <template slot-scope="scope">
            {{ scope.row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="showDetail(scope.row)">查看</el-button>
            <el-button type="text" @click="setRole(scope.row)">设置角色</el-button>
            <el-button type="text" @click="editItem(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </AffixedTable>
      <div class="text-right mt-2">
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
    <AddOrEdit ref="AddOrEdit" @update="getList" @add="getList"></AddOrEdit>
    <SetRoleDrower ref="SetRoleDrower" @update="getList"></SetRoleDrower>
  </div>
</template>

<script>
import { getEmployeesList, deleteEmployeesItem } from '@/api/employees.js'
import DetailDialog from './components/DetailDialog'
import AddOrEdit from './components/AddOrEdit'
import SetRoleDrower from './components/SetRoleDrower'
import utils from '@/utils/utils'
import AffixedTable from '@/views/components/AffixedTable'
export default {
  name: 'EmployeesList',
  components: {
    DetailDialog,
    AddOrEdit,
    SetRoleDrower,
    AffixedTable
  },
  data() {
    return {
      filterForm: {
        name: undefined
      },
      tableData: [],
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      detailDialogVisible: false,
      employDetail: {},
      isShow: true
    }
  },
  activated() {
    this.getList()
  },
  methods: {
    getLabelByValue(key, value) {
      const item = utils.getOptionsItemByValue(key, value)
      return item.label || '-'
    },

    formSwitch() {
      this.isShow = !this.isShow
    },

    /**
     * 展示详情
     */
    showDetail(record) {
      this.$refs.DetailDialog.show(record)
    },

    setRole(record) {
      this.$refs.SetRoleDrower.edit(record.objectCode)
    },

    /**
     * 编辑
     */
    editItem(record) {
      this.$refs.AddOrEdit.edit(record.objectCode)
    },

    addItem() {
      this.$refs.AddOrEdit.add()
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
          deleteEmployeesItem({ objectCode: record.objectCode }).then((res) => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.getList()
            } else {
              this.$message.error(res.message)
            }
          })
        })
        .catch(() => {})
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
        ...this.filterForm
      }
      this.loading = true
      getEmployeesList(params)
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.total = res.data.totalCount
            this.tableData = res.data.list || []
          } else {
            this.$message.error(res.message)
          }
        })
        .catch((_) => {
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
