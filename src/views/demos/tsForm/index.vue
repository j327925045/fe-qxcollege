<!--
 * @Description: ts表格示例
 * @Author: liruifang6
 * @Date: 2020-01-22 19:00:00
 * @LastEditTime: 2020-01-22 20:00:00
 * @LastEditors: liruifang6
-->
<template>
  <div class="statistical-report-page">
    <div class="gyl-form-view">
      <h3 class="gyl-title"><i class="el-icon-s-order" />模板标题</h3>
      <el-form ref="form" class="gyl-form-flex" :modal="form" label-width="120px">
        <el-form-item label="账单时间" prop="time1">
          <el-date-picker v-model="form.time1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" />
        </el-form-item>
        <el-form-item label="签收状态" prop="signStatus">
          <el-select v-model="form.signStatus" placeholder="请选择" clearable filterable>
            <el-option v-for="item in signStatusList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="寄件网点" prop="fromSiteCode">
          <el-select v-model="form.fromSiteCode" placeholder="请选择" filterable :remote-method="remoteSearchSite" remote clearable @focus="remoteSearchSite('')">
            <el-option v-for="item in siteList" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item class="gyl-form-btn-wrap">
          <el-button @click="resetForm('form')">重置</el-button>
          <el-button type="primary" @click="submitForm('form')">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格栏 -->
    <table-list
      v-loading="loading"
      :table-data="tableData"
      :table-columns="tableColumns"
      :total="total"
      :current-page="currentPage"
      :page-size="pageSize"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @handleItemDelete="handleItemDelete"
      @handleImport="handleImport"
    />
  </div>
</template>

<script>
import TableList from './components/TableList.vue'
import { signStatusList, targetTypeList, tableColumns } from './configData'

export default {
  name: 'TsForm',
  components: {
    TableList
  },
  data() {
    return {
      // loading加载
      loading: true,

      // 表格头
      tableColumns: tableColumns,

      // 表格中的数据
      tableData: [],

      // 当前页
      currentPage: 1,

      // 初始每页多少条
      pageSize: 10,

      // 消息总数
      total: 0,

      form: {
        time1: [],
        time2: [],
        signStatus: '',
        toSiteCode: '', // 派件网点
        fromSiteCode: '' // 寄件网点
      },

      // 签收状态
      signStatusList: signStatusList,

      // 网点
      siteList: []
    }
  },

  // 初始化页面表格
  created() {
    this.getList('init')
  },
  methods: {
    async remoteSearchSite(PageParam) {
      this.siteList = targetTypeList
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    // 提交表单
    submitForm() {},

    handleImport() {},

    // 改变当前页条数
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },

    // 改变当前页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },

    // 删除一条表格数据
    handleItemDelete(val) {
      this.tableData.splice(val, 1)
      this.getList()
    },

    // 格式化列表请求需要的参数
    formatParams() {
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        ...this.form
      }
      return params
    },

    // 初始化列表参数
    initParams() {
      const params = {
        pageNum: 1,
        pageSize: 10
      }
      return params
    },

    // 查询表格中的信息
    async getList(init) {
      let params = {}

      if (init) {
        params = this.initParams()
      } else {
        params = this.formatParams()
      }
      console.log(params)
      // const data: any = await getTableList(params)
      this.loading = false
      // if (data && data.list && data.list.length) {
      //   this.tableData = data.list
      //   this.total = data.total
      // } else {
      //   this.total = 0
      //   this.tableData = []
      // }
      const data = []
      for (let i = 0; i < 10; i++) {
        data.push({
          targetName: `客户 ${i}`,
          targetTypeName: '供应链前端',
          coefficient: `20${i}`,
          effectiveTime: new Date().valueOf(),
          endTime: new Date().valueOf(),
          createUser: '赵薇'
        })
      }
      this.tableData = data
    }
  }
}
</script>
