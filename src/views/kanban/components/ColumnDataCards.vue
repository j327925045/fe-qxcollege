<template>
  <el-row :gutter="12" class="mb10">
    <el-col :span="6">
      <data-card :title="title1" :number="number1" :number-small="numberSmall1" :number-state="false" :percent="percent1" />
    </el-col>
    <el-col :span="6">
      <data-card :title="title2" :number="number2" :number-small="numberSmall2" :number-state="true" :percent="percent2" />
    </el-col>
    <el-col :span="6">
      <data-card :title="title3" :number="number3" :number-small="numberSmall3" :number-state="true" :percent="percent3" />
    </el-col>
    <el-col :span="6">
      <data-card :title="title4" :number="number4" :number-small="numberSmall4" :number-state="true" :percent="percent4" />
    </el-col>
  </el-row>
</template>

<script>
import DataCard from './DataCard.vue'
export default {
  components: { DataCard },
  data() {
    return {
      title1: '生产任务量1',
      number1: 2900,
      numberSmall1: 10000,
      percent1: '20.34%',
      title2: '生产任务量2',
      number2: 2900,
      numberSmall2: 20000,
      percent2: '23.34%',
      title3: '生产任务量3',
      number3: 2900,
      numberSmall3: 30000,
      percent3: '29.34%',
      title4: '生产任务量4',
      number4: 2900,
      numberSmall4: 40000,
      percent4: '63.34%'
    }
  }
}
</script>

<style>

</style>
