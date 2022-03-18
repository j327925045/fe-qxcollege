<template>
  <div>
    <column-data-cards />
    <el-row :gutter="12">
      <el-col :span="18">
        <column-cards class="mb10" />
        <column-mix-chart />
      </el-col>
      <el-col :span="6">
        <column-pie-chart class="mb10" />
        <column-bar-chart />
      </el-col>
    </el-row>
    <el-row :gutter="12" class="mb10">
      <el-col :span="9">
        <column-bar-stack-chart />
      </el-col>
      <el-col :span="9">
        <column-pie-chart2 />
      </el-col>
      <el-col :span="6">
        <column-notice />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ColumnBarChart from './components/ColumnBarChart.vue'
import ColumnBarStackChart from './components/ColumnBarStackChart.vue'
import ColumnCards from './components/ColumnCards.vue'
import ColumnDataCards from './components/ColumnDataCards.vue'
import ColumnMixChart from './components/ColumnMixChart.vue'
import ColumnNotice from './components/ColumnNotice.vue'
import ColumnPieChart from './components/ColumnPieChart.vue'
import ColumnPieChart2 from './components/ColumnPieChart2.vue'

export default {
  name: 'KanBan',
  components: { ColumnDataCards, ColumnCards, ColumnPieChart, ColumnMixChart, ColumnBarChart, ColumnPieChart2, ColumnBarStackChart, ColumnNotice },
  data() {
    return {
    }
  }

}
</script>

<style lang="scss">
@import '@/views/kanban/kanban.scss';
</style>
