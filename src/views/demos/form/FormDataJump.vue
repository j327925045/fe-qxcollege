<template>
  <div>
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
            <el-button @click="resetForm('searchForm')">重置</el-button>
            <el-button type="primary" @click="submitForm('searchForm')">查询</el-button>
            <collapse-form @showChange="mySwitch($event)" />
          </el-form-item>
        </el-form>
      </el-row>
    </div>
    <div class="gyl-table-view">
      <el-row class="mb10">
        <el-col :span="12">
          <h3 class="gyl-title"><i class="el-icon-s-order" />模板标题</h3>
        </el-col>
        <el-col :span="12" class="txt-right">
          <el-radio-group v-model="radio1">
            <el-radio-button label="数据纬度1" />
            <el-radio-button label="数据纬度2" />
            <el-radio-button label="数据纬度3" />
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="data-item mb10">
        <el-col v-for="(item, index) in dataList" :key="index" :span="3">
          <div class="item">
            <p>{{ item.title }}</p>
            <div>
              <span>{{ item.number }}</span> <i class="el-icon-arrow-cycle-right-solid" />
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="table-tools">
        <div class="fr">
          <el-button class="gyl-button-new"><i class="el-icon-import" /> 导入</el-button>
          <el-button class="gyl-button-new"><i class="el-icon-export" /> 导出</el-button>
        </div>
      </el-row>
      <div class="mb10">
        <el-table :data="tableData" border stripe max-height="528">
          <el-table-column prop="date" label="日期" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="address" label="地址" />
        </el-table>
      </div>
      <div class="gyl-pagination">
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
  </div>
</template>

<script>
import CollapseForm from './components/CollapseForm.vue'
export default {
  name: 'FormDataJump',
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
      currentPage: 4,
      radio1: '数据纬度1',
      dataList: [
        {
          title: '未来七天',
          number: 9999
        },
        {
          title: '方量',
          number: 23000
        },
        {
          title: '件数',
          number: 9999
        },
        {
          title: '件数',
          number: 9999
        },
        {
          title: '件数',
          number: 9999
        },
        {
          title: '件数',
          number: 9999
        },
        {
          title: '件数',
          number: 9999
        },
        {
          title: '其他',
          number: 9999
        }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const data = []
      for (let i = 0; i < 11; i++) {
        data.push({
          number: '1',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        })
      }
      this.tableData = data
    },
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

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';

.data-item {
  height: 120px;
  background: rgba(252, 252, 252, 1);
  border: 1px solid rgba(233, 233, 233, 1);
  border-radius: 4px;

  .item {
    height: 118px;
    padding: 30px 0 0 24px;
    background: url('./img/card-bg.png') right bottom no-repeat;
    background-size: 70%;

    p {
      margin-bottom: 8px;
      color: rgba(153, 153, 153, 1);
      font-size: 14px;
    }

    div {
      span {
        color: rgba(51, 51, 51, 1);
        font-size: 25px;
        line-height: 30px;
        vertical-align: middle;
      }

      i {
        color: #dcdcdc;
      }
    }

    &:hover {
      cursor: pointer;

      p,
      div span {
        @include font_color('main-color');
      }

      div {
        i {
          @include font_color('button-hover-color');
        }
      }
    }
  }
}
</style>
