<template>
  <el-dialog title="详情弹窗-服务单信息" :visible.sync="dialogDetail" width="900px">
    <el-form class="gyl-mock-form" label-width="100px">
      <h3 class="gyl-detail-tit"><i class="el-icon-s-order icon" />运单信息</h3>
      <el-form-item class="el-col-8" label="服务单号：">JDLD1010989977876277</el-form-item>
      <el-form-item class="el-col-8" label="运单号：">18888909787879777</el-form-item>
      <el-form-item class="el-col-8" label="业务单号：">F1887200710160816626-2</el-form-item>
      <el-form-item class="el-col-8" label="业务来源：">大件调度系统</el-form-item>
      <el-form-item class="el-col-8" label="业务来源：">大件调度系统</el-form-item>
      <el-form-item class="el-col-8" label="业务来源：">大件调度系统</el-form-item>
      <el-form-item class="el-col-8" label="业务来源：">大件调度系统</el-form-item>
      <el-form-item class="el-col-8" label="业务来源：">大件调度系统</el-form-item>
      <el-form-item class="el-col-8" label="业务来源：">大件调度系统</el-form-item>
      <el-form-item class="el-col-8" label="业务来源：">大件调度系统</el-form-item>
    </el-form>
    <el-table :data="tableList" stripe width="100" max-height="386">
      <el-table-column property="serviceName" label="服务项名称" show-overflow-tooltip width="100" />
      <el-table-column property="serviceNo" label="服务项编号" width="180" />
      <el-table-column property="serviceDetailNo" label="服务单明细编号" width="180" />
      <el-table-column property="serviceType" label="服务项类型" width="100" />
      <el-table-column property="feesObject" label="收费对象" width="" />
      <el-table-column property="count" label="数量" width="" />
      <el-table-column property="sku" label="SKU" width="130" />
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogDetail = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogDetail',
  data() {
    return {
      dialogDetail: false,
      tableList: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const data = []
      for (let i = 0; i < 7; i++) {
        data.push({
          serviceName: `冰箱 ${i}`, // 服务项名称
          serviceNo: 'AB4E201104094634516', // 服务项编号
          serviceDetailNo: 'FDAA201116113231501', // 服务单明细编号
          serviceType: '2', // 服务项类型
          feesObject: '客户', // 收费对象
          count: '2', // 数量
          sku: 'FDAA201116113' // SKU
        })
      }
      this.tableList = data
    },
    show() {
      this.dialogDetail = true
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-form-item__label {
  padding-right: 0;
}
</style>
