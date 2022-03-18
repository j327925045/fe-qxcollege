<template>
  <div class="gyl-with-footer">
    <div class="gyl-form-view">
      <h3 class="gyl-title"><i class="el-icon-s-order" />模板标题</h3>
      <el-row>
        <el-form ref="form" :model="form" label-width="100px">
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="最多五个字" required>
              <el-input v-model="form.f1" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="商家编码" required>
              <el-input v-model="form.f2" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="事业部" required>
              <el-select v-model="form.f3" placeholder="请选择">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="预约时间" required>
              <el-date-picker v-model="form.f4" type="date" placeholder="选择日期" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="订单编号" required>
              <el-input v-model="form.f5" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="事业部" required>
              <el-select v-model="form.f6" placeholder="请选择">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="审核状态" required>
              <el-select v-model="form.f7" placeholder="请选择">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="审核状态" required>
              <el-select v-model="form.f8" placeholder="请选择">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="备注信息" required>
              <el-input v-model="form.f9" />
            </el-form-item>
          </el-col>
          <el-col v-show="collapse" :span="8">
            <el-form-item label="备注信息1">
              <el-input v-model="form.f10" />
            </el-form-item>
          </el-col>
          <el-col v-show="collapse" :span="8">
            <el-form-item label="商品编码1">
              <el-input v-model="form.f11" />
            </el-form-item>
          </el-col>
          <el-form-item class="gyl-form-btn-wrap">
            <el-button @click="resetForm('form')">重 置</el-button>
            <el-button type="primary" @click="submitForm('form')"> 查 询 </el-button>
            <collapse-form @showChange="mySwitch($event)" />
          </el-form-item>
        </el-form>
      </el-row>
    </div>
    <div class="gyl-table-view mb10">
      <span class="card-tag dispatch">配</span>
      <h4 class="list-card-title">JDLD10196863448 <i class="el-icon-document-copy copy" /></h4>
      <div class="detail-list">
        <el-form label-position="left">
          <el-row :gutter="20">
            <el-col :md="6">
              <el-form-item label="状态：">拒收</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="收货日期："> 2020-10-10 12:28:45 </el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="滞留天数：">20天</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="商品件数：">1000件</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="配送员：">张宝伟</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="预约配送日期："> 2010-10-10 00:00:00 </el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="滞留原因："> 客户原因退货客户原因退货客户原因退货客户原因退货客户原因退货 </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="gyl-table-view mb10">
      <span class="card-tag collection">取</span>
      <h4 class="list-card-title">JDLD10196863448 <i class="el-icon-document-copy copy" /></h4>
      <div class="detail-list">
        <el-form label-position="left">
          <el-row :gutter="20">
            <el-col :md="6">
              <el-form-item label="状态：">拒收</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="收货日期："> 2020-10-10 12:28:45 </el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="滞留天数：">20天</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="商品件数：">1000件</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="配送员：">张宝伟</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="预约配送日期："> 2010-10-10 00:00:00 </el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="滞留原因："> 客户原因退货客户原因退货客户原因退货客户原因退货客户原因退货 </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="gyl-table-view mb10">
      <span class="card-tag dispatch">配</span>
      <h4 class="list-card-title">JDLD10196863448 <i class="el-icon-document-copy copy" /></h4>
      <div class="detail-list">
        <el-form label-position="left">
          <el-row :gutter="20">
            <el-col :md="6">
              <el-form-item label="状态：">拒收</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="收货日期："> 2020-10-10 12:28:45 </el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="滞留天数：">20天</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="商品件数：">1000件</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="配送员：">张宝伟</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="预约配送日期："> 2010-10-10 00:00:00 </el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="滞留原因："> 客户原因退货客户原因退货客户原因退货客户原因退货客户原因退货 </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="gyl-table-view mt10">
      <span class="card-tag collection">取</span>
      <h4 class="list-card-title">JDLD10196863448 <i class="el-icon-document-copy copy" /></h4>
      <div class="detail-list">
        <el-form label-position="left">
          <el-row :gutter="20">
            <el-col :md="6">
              <el-form-item label="状态：">拒收</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="收货日期："> 2020-10-10 12:28:45 </el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="滞留天数：">20天</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="商品件数：">1000件</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="配送员：">张宝伟</el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="预约配送日期："> 2010-10-10 00:00:00 </el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="滞留原因："> 客户原因退货客户原因退货客户原因退货客户原因退货客户原因退货 </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!-- 固定在底部按钮 -->
    <div class="gyl-footer-bar txt-right">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="10"
        :page-sizes="[10, 20, 30, 40]"
        :current-page="currentPage"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import CollapseForm from './components/CollapseForm.vue'
export default {
  name: 'FormCard',
  components: { CollapseForm },
  data() {
    return {
      collapse: false,
      form: {
        f1: '',
        f2: '',
        f3: '',
        f4: '',
        f5: '',
        f7: '',
        f8: '',
        f9: '',
        f10: '',
        f11: '',
        f12: ''
      },
      tableData: [],
      currentPage: 4
    }
  },
  methods: {
    mySwitch(e) {
      this.collapse = e
    },
    submitForm(formName) {
      console.log('提交')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss">
.detail-list {
  /deep/ .el-form-item {
    margin-bottom: 8px !important;

    .el-form-item__content {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

.list-card-title {
  margin-bottom: 15px;
  font-weight: 600;

  .copy {
    cursor: pointer;
  }
}

.card-tag {
  position: absolute;
  top: 12px;
  left: 0;
  width: 22px;
  height: 28px;
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  line-height: 24px;
  text-align: center;

  &.dispatch {
    background: url('./img/tag-blue.png') no-repeat;
    background-size: 100%;
  }

  &.collection {
    background: url('./img/tag-red.png') no-repeat;
    background-size: 100%;
  }
}
</style>
