<template>
  <el-table ref="table" highlight-current-row stripe :data="tableData" class="gyl-table-expand">
    <el-table-column label="序号" type="index" />
    <el-table-column label="包裹编号" prop="codeid" min-width="180" />
    <el-table-column label="包裹名称" prop="title" min-width="330" />
    <!-- <el-table-column label="包裹重量（kg）" prop="kg" min-width="120" />
    <el-table-column label="长*宽*高（mm）" prop="mmm" min-width="160">
      <template slot-scope="scope">
        <div>{{ scope.row.mmm }}</div>
        <div class="sub-text">下发（{{ scope.row.mmm }}）</div>
      </template>
    </el-table-column>
    <el-table-column label="包裹总体积（m）" prop="m3" min-width="150">
      <template slot-scope="scope">
        <div>{{ scope.row.m3 }}</div>
        <div class="sub-text">下发（{{ scope.row.m3 }}）</div>
      </template>
    </el-table-column>
    <el-table-column label="包裹件型" prop="type" min-width="150" />
    <el-table-column label="包裹识别码" prop="code" min-width="150" /> -->
    <el-table-column label="包裹金额" prop="price" min-width="150" />
    <el-table-column label="是否有效" prop="radio" min-width="150" />
    <el-table-column label="操作" min-width="180">
      <template slot-scope="scope">
        <el-button type="text" @click="toggleExpand(scope.row)">包裹跟踪 <i :class="scope.row.expansion ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" /></el-button>
        <el-button type="text" @click="toggleExpand2(scope.row)">商品明细 <i :class="scope.row.expansion2 ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" /></el-button>
      </template>
    </el-table-column>

    <el-table-column type="expand" width="1">
      <template slot-scope="scope">
        <expand-timeline v-if="scope.row.expansion" />
        <expand-info v-if="scope.row.expansion2" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import ExpandInfo from './ExpandInfo.vue'
import ExpandTimeline from './ExpandTimeline.vue'
// import ExpandInfo from './ExpandInfo'

export default {
  name: 'TableExpand',
  components: {
    ExpandInfo,
    ExpandTimeline
    // ExpandInfo
  },
  data() {
    return {
      isShow: false,
      isFirst: true,
      tableData: [
        {
          codeid: 'JDLD10301383743-1-1',
          title: '美的（Midea）波轮洗衣机全自动小型家用洗衣机',
          kg: '39',
          mmm: '566*333*999',
          m3: '0.4893',
          type: '中件',
          code: '123456677',
          price: '￥1999.00',
          expansion2: false,
          expansion: false
        },
        {
          codeid: 'JDLD10301383743-1-1',
          title: '美的（Midea）波轮洗衣机全自动小型家用洗衣机',
          kg: '39',
          mmm: '566*333*999',
          m3: '0.4893',
          type: '中件',
          code: '123456677',
          price: '￥1999.00',
          expansion2: false,
          expansion: false
        },
        {
          codeid: 'JDLD10301383743-1-1',
          title: '美的（Midea）波轮洗衣机全自动小型家用洗衣机',
          kg: '39',
          mmm: '566*333*999',
          m3: '0.4893',
          type: '中件',
          code: '123456677',
          price: '￥1999.00',
          expansion2: false,
          expansion: false
        }
      ]
    }
  },
  created() {},
  methods: {
    toggleExpand(row) {
      const $table = this.$refs.table
      row.expansion = !row.expansion
      $table.toggleRowExpansion(row, row.expansion)
      if (row.expansion === true) {
        row.expansion2 = false
      } else {
        row.expansion2 = false
      }
    },
    toggleExpand2(row) {
      const $table = this.$refs.table
      row.expansion2 = !row.expansion2
      $table.toggleRowExpansion(row, row.expansion2)
      if (row.expansion2 === true) {
        row.expansion = false
      } else {
        row.expansion = false
      }
    }
  }
}
</script>
