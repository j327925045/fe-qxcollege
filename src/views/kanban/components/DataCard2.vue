<template>
  <div class="gyl-data-card2">
    <h5>出库任务量</h5>
    <div class="card-body">
      <el-row>
        <el-col v-for="(item, index) in dataList" :key="index" :span="8" class="card-sub-item">
          <p>{{ item.title }}</p>
          <div>{{ item.number | numberal }}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [
        {
          title: '车次',
          number: 1202
        },
        {
          title: '方量',
          number: 89012
        },
        {
          title: '件数',
          number: 23232
        }
      ]
    }
  }
}
</script>
