<template>
  <div class="info-list">
    <el-form label-position="left">
      <el-row :gutter="20">
        <el-col :md="8">
          <el-form-item label="运单号：">JDLD1010989977876277</el-form-item>
        </el-col>
        <el-col :md="8">
          <el-form-item label="货主：">佛山市江臣有限公司（EBU4418046636666）</el-form-item>
        </el-col>
        <el-col :md="8">
          <el-form-item label="运单状态：">正在上架正在上架正在上架正在上架正在上架正在上架正在上架正在上架正在上架正在上架正在上架正在上架正在上架正在上架正在上架正在上架正在上架正在上架正在上架</el-form-item>
        </el-col>
        <el-col :md="8">
          <el-form-item label="正逆类型：">正向运单</el-form-item>
        </el-col>
        <el-col :md="8">
          <el-form-item label="运单类型：">纯配</el-form-item>
        </el-col>
        <el-col :md="8">
          <el-form-item label="运单生成时间：">2010-10-10 00:00:00</el-form-item>
        </el-col>
        <el-col :md="8">
          <el-form-item label="业务类型：">上门揽件—转运—落地配送</el-form-item>
        </el-col>
        <el-col :md="8">
          <el-form-item label="运单sendpay：">00002287868698898986756443343</el-form-item>
        </el-col>
        <el-col :md="8">
          <el-form-item label="货主电话：">18898778889</el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="detail-sub-card mb10">
      <h5>收件方信息</h5>
      <div class="sub-card-content">
        <el-form label-position="left">
          <el-row :gutter="20">
            <el-col :md="6">
              <el-form-item label="姓名：">丁程鑫</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="手机：">18810668061</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="电话：">010-98726754</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="四级地址：">山东（13）青岛（1007）青岛区（5505）</el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="详细地址：">山东省青岛市黄岛区沿江四路100号富兴2期12号楼3单元309室河海技术发展公司</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="标题内容标题：">这里是内容区域内容区域内容区域内容…</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="标题内容标题：">这里是内容区域内容区域内容区域内容…</el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="detail-sub-card mb10">
      <h5>寄件方信息</h5>
      <div class="sub-card-content">
        <el-form label-position="left">
          <el-row :gutter="20">
            <el-col :md="6">
              <el-form-item label="姓名：">丁程鑫</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="手机：">18810668061</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="电话：">010-98726754</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="四级地址：">山东（13）青岛（1007）青岛区（5505）</el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="详细地址：">山东省青岛市黄岛区沿江四路100号富兴2期12号楼3单元309室河海技术发展公司</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="标题内容标题：">这里是内容区域内容区域内容区域内容…</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="标题内容标题：">这里是内容区域内容区域内容区域内容…</el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-sub-card{
  border: 1px solid rgba(229,229,229,1);
  border-radius: 4px;
  h5{
    padding: 15px 16px;
    background: rgba(247,247,247,1);
    border-radius: 4px 4px 0px 0px;
    font-size: 16px;
    line-height: 16px;
    color: rgba(0,0,0,1);
  }
  .sub-card-content{
    padding: 20px;
  }
}
</style>
