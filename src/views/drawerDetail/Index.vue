<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" @click="drawerVisible = true">抽屉详情</el-button>
    <!-- 抽屉详情 -->
    <el-drawer title="服务单信息" :visible.sync="drawerVisible" :with-header="false" size="1080px" custom-class="gyl-detail-drawer">
      <div class="gyl-hamburger" @click="drawerVisible = false">
        <i class="el-icon-arrow-right" />
      </div>
      <div class="drawer-content">
        <el-row type="flex" align="middle" justify="start" class="drawer-tit">
          <span class="icon">取</span>
          <h2>JDLA862268992366</h2>
          <span class="gyl-tag">集齐</span>
          <span class="gyl-tag warning">高值</span>
          <span class="gyl-tag success">高值</span>
          <span class="gyl-tag danger">危险</span>
        </el-row>
        <el-form class="gyl-mock-form" label-width="140px">
          <h3 class="gyl-detail-tit"><i class="el-icon-s-order icon" />运单信息</h3>
          <el-form-item class="el-col-8" label="寄件网点">北京大兴公司</el-form-item>
          <el-form-item class="el-col-8" label="寄件地区">北京大兴公司</el-form-item>
          <el-form-item class="el-col-8" label="派件网点">广州白云公司</el-form-item>
          <el-form-item class="el-col-8" label="派件地区">广东省广州市白云区</el-form-item>
          <el-form-item class="el-col-8" label="客户名称">大兴钢铁公司</el-form-item>
          <el-form-item class="el-col-8" label="客户编号">2223333325555</el-form-item>
          <el-form-item class="el-col-8" label="运输方式">汽运</el-form-item>
          <el-form-item class="el-col-8" label="单边长度">12 cm</el-form-item>
          <el-form-item class="el-col-8" label="结算重量">5.02 kg</el-form-item>
          <el-form-item class="el-col-8" label="支付方式">到付</el-form-item>
          <el-form-item class="el-col-8" label="到付金额">26.00</el-form-item>
          <el-form-item class="el-col-8" label="代收货款金额">0.00</el-form-item>
        </el-form>
        <el-form class="gyl-mock-form" label-width="140px">
          <h3 class="gyl-detail-tit"><i class="el-icon-s-order icon" />运单标识</h3>
          <el-form-item class="el-col-8" label="是否有逆向单标识">是</el-form-item>
          <el-form-item class="el-col-16" label="原单单号">ZY456664566</el-form-item>
          <el-form-item class="el-col-8" label="是否生成逆向单">是</el-form-item>
          <el-form-item class="el-col-16" label="逆向单单号">ZYN54447777</el-form-item>
          <el-form-item class="el-col-8" label="是否带货服务(出货)">否</el-form-item>
          <el-form-item class="el-col-16" label="是否补收件">是</el-form-item>
        </el-form>
        <div class="gyl-mock-table-wrap">
          <h3 class="gyl-detail-tit"><i class="el-icon-s-order icon" />应收费用</h3>
          <div class="gyl-mock-table">
            <h3 class="tit">北京大兴公司<span>合计</span>1.26</h3>
            <el-form class="gyl-mock-form" label-width="140px">
              <el-form-item class="el-col-8" label="中转费">1.01</el-form-item>
              <el-form-item class="el-col-8" label="集包费">1.01</el-form-item>
              <el-form-item class="el-col-8" label="收续重派费">1.01</el-form-item>
              <el-form-item class="el-col-8" label="带货费(出货)">1.01</el-form-item>
              <el-form-item class="el-col-8" label="派费加收">1.01</el-form-item>
              <el-form-item class="el-col-8" label="代收集包费">1.01</el-form-item>
              <el-form-item class="el-col-8" label="收到付款手续费">1.01</el-form-item>
              <el-form-item class="el-col-8" label="系统揽收操作费">1.01</el-form-item>
              <el-form-item class="el-col-8" label="超重费">1.01</el-form-item>
              <el-form-item class="el-col-8" label="超长费">1.01</el-form-item>
              <el-form-item class="el-col-8" label="保价价费">1.01</el-form-item>
            </el-form>
          </div>
        </div>
        <div class="gyl-mock-table-wrap">
          <h3 class="gyl-detail-tit"><i class="el-icon-s-order icon" />应付费用</h3>
          <div class="gyl-mock-table">
            <h3 class="tit">广州保运公司<span>合计</span>1.26</h3>
            <el-form class="gyl-mock-form" label-width="140px">
              <el-form-item class="el-col-8" label="付派费">1.01</el-form-item>
              <el-form-item class="el-col-8" label="代付集包费">1.01</el-form-item>
            </el-form>
          </div>
          <div class="gyl-mock-table">
            <h3 class="tit">北京大兴集包中心<span>合计</span>1.26</h3>
            <el-form class="gyl-mock-form" label-width="140px">
              <el-form-item class="el-col-8" label="付派费">1.01</el-form-item>
              <el-form-item class="el-col-8" label="代付集包费">1.01</el-form-item>
            </el-form>
          </div>
        </div>
        <div class="gyl-table-wrap">
          <h3 class="gyl-detail-tit"><i class="el-icon-s-order icon" />修改记录</h3>
          <el-table :data="tableList" stripe max-height="528">
            <el-table-column property="serviceName" label="服务项名称" show-overflow-tooltip width="100" />
            <el-table-column property="serviceNo" label="服务项编号" width="180" />
            <el-table-column property="serviceDetailNo" label="服务单明细编号" width="180" />
            <el-table-column property="serviceType" label="服务项类型" width="100" />
            <el-table-column property="feesObject" label="收费对象" width="" />
            <el-table-column property="count" label="数量" width="" />
            <el-table-column property="sku" label="SKU" width="130" />
          </el-table>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
// import JdlDrawer from '@/views/dialogAndDrawer/components/Drawer.vue'
export default {
  name: 'DrawerDetail',
  components: {
    // JdlDrawer
  },
  data() {
    return {
      drawerVisible: false,
      tableList: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    showDrawer() {
      this.drawerVisible = true
    },
    getData() {
      const data = []
      for (let i = 0; i < 10; i++) {
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
    }
  }
}
</script>
<style lang="scss" scoped>
.drawer-content {
  .drawer-tit {
    .icon {
      width: 28px;
      height: 28px;
      margin-right: 6px;
      color: #fff;
      font-size: 14px;
      line-height: 28px;
      text-align: center;
      background: rgba(255, 110, 76, 1);
      border-radius: 2px;
    }

    h2 {
      margin-right: 6px;
      color: #333;
      font-weight: 500;
      font-size: 18px;
    }
  }
}
</style>
