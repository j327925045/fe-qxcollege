<template>
  <el-table ref="table" highlight-current-row stripe :data="tableData">
    <el-table-column label="序号" type="index" />
    <el-table-column label="包裹编号" prop="codeid" min-width="180" />
    <el-table-column label="包裹名称" prop="title" min-width="330" />
    <el-table-column label="包裹重量（kg）" prop="kg" min-width="120" />
    <el-table-column label="长*宽*高（mm）" prop="mmm" min-width="150" />
    <el-table-column label="包裹总体积（m）" prop="m3" min-width="150" />
    <el-table-column label="包裹件型" prop="type" min-width="150" />
    <el-table-column label="包裹识别码" prop="code" min-width="150" />
    <el-table-column label="包裹金额" prop="price" min-width="150" />
    <el-table-column label="是否有效" prop="radio" min-width="150" />
    <el-table-column label="包裹金额" prop="price" min-width="150" />
    <el-table-column label="是否有效" prop="radio" min-width="150" />
  </el-table>
</template>

<script>
export default {
  name: 'TableSimple',
  data() {
    return {
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
          radio: '有'
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
          radio: '有'
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
          radio: '有'
        }
      ]
    }
  },
  created() {},
  methods: {}
}
</script>
