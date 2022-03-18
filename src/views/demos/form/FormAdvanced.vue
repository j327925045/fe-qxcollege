<template>
  <div>
    <div class="gyl-form-view gyl-form-advanced">
      <span class="form-switch" @click="formSwitch"> {{ isShow ? '全部收起' : '全部展开' }} <i :class="isShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" /> </span>
      <h3 class="gyl-title">
        <i class="el-icon-s-order" />模板标题
        <dl class="quick-list">
          <dt>快捷查询项</dt>
          <dd class="gyl-tag main">自定义查询条件A</dd>
        </dl>
        <el-popover placement="bottom" trigger="click" popper-class="gyl-quick-popover">
          <div class="quick-box">
            <el-scrollbar style="height: 100%">
              <ul>
                <li v-for="item in quickList" :key="item">{{ item }}</li>
              </ul>
            </el-scrollbar>
          </div>
          <el-button slot="reference" class="ml10" type="text" size="small">更多<i class="el-icon-arrow-down" /></el-button>
        </el-popover>
        <i class="form-setting el-icon-setting" @click="dialogSetting = true" />
      </h3>
      <el-form v-show="isShow" ref="form" :model="form" label-width="100px">
        <el-row>
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
          <el-col v-show="collapse" :span="8">
            <el-form-item label="商品编码1">
              <el-input v-model="form.f12" />
            </el-form-item>
          </el-col>
          <el-col v-show="collapse" :span="8">
            <el-form-item label="商品编码1">
              <el-input v-model="form.f13" />
            </el-form-item>
          </el-col>
          <el-form-item class="gyl-form-btn-wrap">
            <el-button @click="saveForm('form')">保存条件</el-button>
            <el-button @click="resetForm('form')">重 置</el-button>
            <el-button type="primary" @click="submitForm('form')">查 询</el-button>
            <collapse-form @showChange="mySwitch($event)" />
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div class="gyl-table-view">
      <el-row class="table-tools">
        <div class="fl">
          <el-button type="primary">主要操作1</el-button>
          <el-button>次要操作</el-button>
          <el-button>次要操作</el-button>
          <el-button>次要操作</el-button>
          <el-button>次要操作</el-button>
        </div>
        <div class="fr">
          <el-button type="primary" plain class="gyl-button-new"><i class="el-icon-import" /> 导入</el-button>
          <el-button type="primary" plain class="gyl-button-new"><i class="el-icon-export" /> 导出</el-button>
        </div>
      </el-row>
      <div class="gyl-form-view-box">
        <table-setting />
        <el-table :data="tableData" max-height="620" stripe border>
          <el-table-column type="selection" fixed="left" width="55" />
          <el-table-column prop="t1" label="异常单号" show-overflow-tooltip min-width="180" />
          <el-table-column prop="t2" label="业务异常单号" show-overflow-tooltip min-width="180" />
          <el-table-column prop="t3" label="运单号" show-overflow-tooltip min-width="150" />
          <el-table-column prop="t4" label="包裹号" show-overflow-tooltip min-width="180" />
          <el-table-column prop="t5" label="异常单状态" show-overflow-tooltip min-width="120" />
          <el-table-column prop="t6" label="网络类型" show-overflow-tooltip min-width="120" />
          <el-table-column prop="t7" label="一级原因" show-overflow-tooltip min-width="120" />
          <el-table-column prop="t8" label="二级原因" show-overflow-tooltip min-width="120" />
          <el-table-column prop="t9" label="三级原因" show-overflow-tooltip min-width="120" />
          <el-table-column prop="t10" label="提报环节" show-overflow-tooltip min-width="120" />
          <el-table-column prop="t11" label="异常级别" show-overflow-tooltip min-width="120" />
          <el-table-column fixed="right" label="操作" width="210">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handleClick(scope.row)">查看</el-button>
              <el-button type="text" size="mini">编辑</el-button>
              <el-button type="text" size="mini">删除</el-button>
              <el-dropdown class="ml10" trigger="click">
                <el-button type="text" class="el-dropdown-link" size="mini">更多<i class="el-icon-arrow-down el-icon--right" /></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>操作A</el-dropdown-item>
                  <el-dropdown-item>操作B</el-dropdown-item>
                  <el-dropdown-item>操作C</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
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
    <!-- dialog: form快捷查询条件设置 -->
    <el-dialog title="设置快捷查询条件" :visible.sync="dialogSetting" width="900px" custom-class="gyl-dialog-setting">
      <h5 class="sub-title">快捷查询条件设置</h5>
      <div class="setting-box">
        <vuedraggable v-model="settingList">
          <transition-group>
            <el-tooltip v-for="item in settingList" :key="item" effect="dark" placement="top-start">
              <div slot="content">
                <p>5项筛选条件</p>
                <span>大件快运事业部+寄件咨询+pc端+验收通过+案例等级低</span>
              </div>
              <p><i class="el-icon-clear" @click="deleteItem" />{{ item }}</p>
            </el-tooltip>
          </transition-group>
        </vuedraggable>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSetting = false">取 消</el-button>
        <el-button @click="dialogSetting = false">恢复默认</el-button>
        <el-button type="primary" @click="dialogSetting = false">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable'
import CollapseForm from './components/CollapseForm.vue'
import TableSetting from './components/TableSetting.vue'
export default {
  name: 'FormAdvanced',
  components: { CollapseForm, vuedraggable, TableSetting },
  data() {
    return {
      settingList: [
        '仓库配置项1',
        '仓库配置项2',
        '仓库配置项3',
        '仓库配置项4',
        '仓库配置项5',
        '仓库配置项6',
        '仓库配置项7',
        '仓库配置项8',
        '仓库配置项9',
        '仓库配置项10',
        '仓库配置项11',
        '仓库配置项12'
      ],
      dialogSetting: false, // 设置快捷查询条件
      isShow: true,
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
        f12: '',
        f13: ''
      },
      tableData: [],
      currentPage: 4,
      quickList: ['快运配置项1', '快运配置项2', '快运配置项3', '快运配置项4', '快运配置项5', '快运配置项6']
    }
  },
  updated() {
    // console.log(this.settingList)
  },
  created() {
    this.getData()
  },
  methods: {
    deleteItem() {
      console.log('删除当前查询条件项！')
    },
    formSwitch() {
      this.isShow = !this.isShow
    },
    getData() {
      const data = []
      for (let i = 0; i < 10; i++) {
        data.push({
          t1: 'AB4E201104094634516',
          t2: 'CS2011040000001297',
          t3: 'JDLD10296911013',
          t4: 'JDLD10296911013-1-1',
          t5: '已开单',
          t6: '家电',
          t7: '破损',
          t8: '运输损',
          t9: '运输损',
          t10: '分拣',
          t11: '轻微'
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
    saveForm(formName) {
      console.log('保存条件')
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
@import '@/views/form/advanced.scss';
</style>
