<template>
  <div class="gyl-view">
    <h3 class="gyl-title"><i class="el-icon-s-order" />模板标题</h3>
    <div ref="barChart" style="height: 330px" />
  </div>
</template>

<script>
import echarts from 'echarts'
import { EleResize } from './mixins/esresize'

export default {
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      const myChart = echarts.init(this.$refs.barChart)
      const resizeDiv = this.$refs.barChart
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          bottom: 0,
          icon: 'circle'
        },
        grid: {
          top: 20,
          left: 0,
          right: 0,
          bottom: 35,
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: ['华东地区', '华南地区', '西南地区', '东北地区', '华中地区', '西北地区', '东北地区'],
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#666',
            fontSize: 12
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          }
        },
        series: [
          {
            name: '2021年',
            type: 'bar',
            barWidth: 18,
            showBackground: true,
            backgroundStyle: {
              color: '#F9FAFC'
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: 4
              },
              normal: {
                barBorderRadius: 4,
                // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: '#628EFF' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#9BC1FF' // 100% 处的颜色
                  }
                ]) // 背景渐变色
              }
            },
            data: [18203, 23489, 29034, 24970, 31744, 30230, 40000]
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
