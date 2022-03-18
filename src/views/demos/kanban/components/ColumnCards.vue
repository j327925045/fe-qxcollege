<template>
  <div class="gyl-view">
    <h3 class="gyl-title"><i class="el-icon-s-order" />模板标题</h3>
    <el-row :gutter="12">
      <el-col :xs="24" :sm="12" :lg="8">
        <data-card2 />
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8">
        <data-card2 />
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8">
        <data-card2 />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DataCard2 from './DataCard2.vue'
export default {
  components: { DataCard2 },
  data() {
    return {}
  }
}
</script>
