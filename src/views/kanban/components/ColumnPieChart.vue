<template>
  <div class="gyl-view">
    <h3 class="gyl-title"><i class="el-icon-s-order" />模板标题</h3>
    <div ref="pieChart" style="height: 160px" />
  </div>
</template>

<script>
import echarts from 'echarts'
import { EleResize } from './mixins/esresize'

export default {
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
      const option = {
        title: {
          text: '900,000',
          subtext: '总量',
          left: '28%',
          top: '38%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 20,
            color: '#333'
          }
        },
        color: ['#5A82E3', '#34C697', '#F56C84', '#FED75A'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          show: true,
          left: '60%',
          top: 20,
          orient: 'horizontal',
          icon: 'circle',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          formatter: function(name) {
            const data = option.series[0].data
            let total = 0
            let tarValue
            for (let i = 0; i < data.length; i++) {
              total += data[i].value
              if (data[i].name === name) {
                tarValue = data[i].value
              }
            }
            const v = tarValue
            const p = Math.round((tarValue / total) * 100)
            return `${name}  ${v}(${p}%)`
            // return `${name}  ${v}`
          }
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
            name: '访问来源',
            type: 'pie',
            radius: ['60%', '85%'],
            center: ['30%', '50%'],
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
              { value: 435, name: '出库上报' },
              { value: 290, name: '审核通过' },
              { value: 235, name: '执⾏中' },
              { value: 110, name: '已满足' }
            ]
          }
        ]
      }
      myChart.setOption(option)
      const listener = function() {
        myChart.resize()
      }
      EleResize.on(resizeDiv, listener)
    }
  }
}
</script>
