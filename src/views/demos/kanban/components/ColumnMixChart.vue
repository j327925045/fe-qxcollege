<template>
  <div class="gyl-view">
    <h3 class="gyl-title"><i class="el-icon-s-order" />模板标题</h3>
    <div ref="mixChart" style="height: 330px" />
  </div>
</template>

<script>
import echarts from 'echarts'
import { EleResize } from './mixins/esresize'

export default {
  data() {
    return {
      categoryData: ['2018-01-01', '2018-01-02', '2018-01-03', '2018-01-04', '2018-01-05', '2018-01-06', '2018-01-07', '2018-01-08'],
      data1: [350, 532, 580, 634, 590, 720, 500, 850],
      data2: [250, 432, 480, 534, 490, 620, 400, 650],
      data3: [150, 332, 380, 434, 590, 520, 300, 450]
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
      const myChart = echarts.init(this.$refs.mixChart)
      const resizeDiv = this.$refs.mixChart
      const option = {
        grid: {
          top: 40,
          left: 20,
          right: 10,
          bottom: 35,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: true,
          bottom: 0,
          icon: 'circle'
        },
        xAxis: {
          type: 'category',
          // boundaryGap: true,
          data: this.categoryData,
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#E0E2E7'
            }
          },
          axisLabel: {
            color: '#666',
            fontSize: 12
          },
          axisTick: {
            show: false
            // alignWithLabel: true,
          },
          splitArea: {
            show: true
          }
        },
        yAxis: [
          {
            name: '单量/万',
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: '#eee'
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              color: '#666'
            }
          },
          {
            name: '比率',
            nameLocation: 'end',
            // max: 100,
            type: 'value',
            // inverse: true,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '指数一',
            data: this.data1,
            type: 'bar',
            barWidth: 18,
            label: {
              show: false,
              position: 'top',
              color: '#fff',
              fontSize: 12,
              formatter: function(p) {
                return this.formatNum(p.value)
              }
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: [4, 4, 0, 0]
              },
              normal: {
                barBorderRadius: [4, 4, 0, 0],
                // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: '#125DDE' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#52E2FF' // 100% 处的颜色
                  }
                ]) // 背景渐变色
              }
            }
          },
          {
            name: '指数二',
            type: 'bar',
            data: this.data2,
            barWidth: 18,
            label: {
              show: false,
              position: 'top',
              color: '#fff',
              fontSize: 12,
              formatter: function(p) {
                return this.formatNum(p.value)
              }
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: [4, 4, 0, 0]
              },
              normal: {
                barBorderRadius: [4, 4, 0, 0],
                // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: '#34C697' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#64E5C8' // 100% 处的颜色
                  }
                ]) // 背景渐变色
              }
            }
          },
          {
            name: '仓累计接收量',
            type: 'line',
            symbol: 'circle',
            smooth: true,
            symbolSize: 6,
            yAxisIndex: 1,
            itemStyle: {
              color: '#FF6C7B'
            },
            lineStyle: {
              color: '#FF6C7B',
              width: 2
            },
            data: this.data3
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
