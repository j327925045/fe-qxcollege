<template>
  <div class="gyl-view">
    <h3 class="gyl-title"><i class="el-icon-s-order" />模板标题</h3>
    <div ref="barStackChart" style="height: 270px" />
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
    /* if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null */
  },
  methods: {
    initChart() {
      const myChart = echarts.init(this.$refs.barStackChart)
      const resizeDiv = this.$refs.barStackChart
      const t = this
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (param) => {
            let str = ''
            for (const item of param) {
              item.seriesName && (str += item.seriesName + '：' + this.formatNum(item.value) + '<br>')
            }
            return str
          }
        },
        color: ['#34C697', '#5FDFE2', '#FED75A', '#F7B500', '#FF9E49', '#F56C84'],
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
        yAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
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
        xAxis: {
          type: 'category',
          data: ['中央仓', '省级', '市级', '县级', '乡镇级', '社会', '乡镇级'],
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
            show: false
          }
        },
        series: [
          {
            name: '指数一',
            type: 'bar',
            barWidth: 18,
            stack: '总量',
            label: {
              show: false
            },
            data: [18203, 23489, 29034, 24970, 31744, 30230, 40000]
          },
          {
            name: '指数二',
            type: 'bar',
            barWidth: 18,
            stack: '总量',
            label: {
              show: false
            },
            data: [18203, 23489, 29034, 24970, 31744, 30230, 40000]
          },
          {
            name: '指数三',
            type: 'bar',
            barWidth: 18,
            stack: '总量',
            label: {
              show: false
            },
            data: [18203, 23489, 29034, 24970, 31744, 30230, 40000]
          },
          {
            name: '指数四',
            type: 'bar',
            barWidth: 18,
            stack: '总量',
            label: {
              show: false
            },
            data: [18203, 23489, 29034, 24970, 31744, 30230, 40000]
          },
          {
            name: '指数五',
            type: 'bar',
            barWidth: 18,
            stack: '总量',
            label: {
              show: false
            },
            data: [18203, 23489, 29034, 24970, 31744, 30230, 40000]
          },
          {
            name: '',
            type: 'bar',
            data: [0, 0, 0, 0, 0, 0, 0],
            stack: '总量',
            barWidth: 18,
            label: {
              show: true,
              position: 'top',
              color: '#333',
              fontSize: 12
            }
          }
        ]
      }
      const series = option.series
      function getSum(params) {
        let datavalue = 0
        for (let i = 0; i < series.length; i++) {
          datavalue += series[i].data[params.dataIndex]
        }
        return t.formatNum(datavalue)
      }
      series[series.length - 1].label.formatter = getSum
      myChart.setOption(option)
      myChart.on('legendselectchanged', (obj) => {
        const series = option.series
        function getSum(params) {
          let datavalue = 0
          for (let i = 0; i < series.length; i++) {
            if (obj.selected[series[i].name]) {
              datavalue += series[i].data[params.dataIndex]
            }
          }
          return t.formatNum(datavalue)
        }
        series[series.length - 1].label.formatter = getSum
        myChart.setOption(option)
      })

      const listener = function() {
        myChart.resize()
      }
      EleResize.on(resizeDiv, listener)
    },
    formatNum(strNum) {
      if (strNum.length <= 3) {
        return strNum
      }
      if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
        return strNum
      }
      const a = RegExp.$1
      let b = RegExp.$2
      const c = RegExp.$3
      const re = new RegExp()
      re.compile('(\\d)(\\d{3})(,|$)')
      while (re.test(b)) {
        b = b.replace(re, '$1,$2$3')
      }
      return a + '' + b + '' + c
    }
  }
}
</script>
