<template>
  <div class="expand-info">
    <div v-for="item in 2" :key="item" class="expand-info-item">
      <h4 class="pro-title">EMG4418093605969</h4>
      <el-form label-position="left">
        <el-row :gutter="20">
          <el-col :md="12">
            <el-form-item label="商品名称：">美的（Midea）波轮洗衣机全自动小型迷你甩干脱水家用8公斤大容量MB80V3111 EMG441809305969</el-form-item>
          </el-col>
          <el-col :md="4">
            <el-form-item label="商品数量：">12</el-form-item>
          </el-col>
          <el-col :md="4">
            <el-form-item label="商品重量：">39kg</el-form-item>
          </el-col>
          <el-col :md="4">
            <el-form-item label="商品重量：">39kg</el-form-item>
          </el-col>
          <el-col :md="4">
            <el-form-item label="长*宽*高">拒收</el-form-item>
          </el-col>
          <el-col :md="4">
            <el-form-item label="商品体积：">中件</el-form-item>
          </el-col>
          <el-col :md="4">
            <el-form-item label="商品类型：">1234567890</el-form-item>
          </el-col>
          <el-col :md="4">
            <el-form-item label="商品品牌">1000件</el-form-item>
          </el-col>
          <el-col :md="4">
            <el-form-item label="商品品牌">1000件</el-form-item>
          </el-col>
          <el-col :md="4">
            <el-form-item label="商品品牌">1000件</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoList1'
}
</script>

<style lang="scss" scoped>
.expand-info {
  &-item {
    border-bottom: 1px solid #e4e9f0;
    padding-bottom: 5px;
    padding-top: 15px;
    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
    .pro-title {
      font: 700 16px/20px sans-serif;
      color: #333;
      margin-bottom: 10px;
    }
    /deep/
    .el-form-item {
      margin-bottom: 8px !important;
      .el-form-item__content {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
  }
  }
}
</style>
