<template>
  <div class="gyl-data-card">
    <div class="card-body">
      <div ref="pieChart" class="pie-chart" />
      <p class="title">
        {{ title }}
        <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
          <i class="el-icon-info" />
        </el-tooltip>
      </p>
      <div class="number">{{ number | numberal }}</div>
      <p class="ringNumber">
        日环比
        <span v-if="numberState == true" class="up">{{ percent }}</span>
        <span v-if="numberState == false" class="down">{{ percent }}</span>
      </p>
    </div>
    <div class="card-bottom">
      日均入库量<span>{{ numberSmall | numberal }}</span>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { EleResize } from './mixins/esresize'

export default {
  // mixins: [resize],
  props: {
    title: {
      type: String,
      default: ''
    },
    number: {
      type: Number,
      default: 0
    },
    numberSmall: {
      type: Number,
      default: 100
    },
    percent: {
      type: String,
      default: ''
    },
    numberState: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  /* beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  }, */
  methods: {
    initChart() {
      const myChart = echarts.init(this.$refs.pieChart)
      const resizeDiv = this.$refs.pieChart

      myChart.setOption({
        title: {
          text: '90.00%',
          subtext: '出库上报',
          left: '47%',
          top: '30%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#333'
          }
        },
        color: ['#628EFF', '#E4E7EF'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          show: false
        },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true
        },
        series: [
          {
            name: '任务量',
            type: 'pie',
            radius: ['70%', '100%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: false
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '出库' },
              { value: 110, name: '未出库' }
            ]
          }
        ]
      })
      const listener = function() {
        myChart.resize()
      }
      EleResize.on(resizeDiv, listener)
    }
  }
}
</script>
