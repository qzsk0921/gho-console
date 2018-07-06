<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>
<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
require('echarts/theme/macarons') // echarts theme

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler (val) {
        this.setOptions(val)
      }
    }
  },
  methods: {
    setOptions ({ areaChartxAxis, actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          type: 'category',
          // data: ['Mon',
          //   {
          //     value: 'Tue',
          //     // 突出周一
          //     textStyle: {
          //       fontSize: 15,
          //       color: 'hotpink'
          //     }
          //   }, 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
          // ]
          data: areaChartxAxis
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '¥ {value}'
          },
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        legend: {
          // data: ['宝马', '奔驰']
          data: [
            {
              name: '消费', icon: 'rect'
            }
            // {
            //   name: '奔驰'
            // }
          ]
        },
        series: [
          {
            name: '消费',
            data: actualData,
            type: 'line',
            animationDuration: 1000
          }
          // {
          //   name: '奔驰',
          //   data: expectedData,
          //   type: 'line',
          //   animationDuration: 500
          // }
        ]
      }, true)
      // this.chart.setOption({
      //   xAxis: {
      //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      //     boundaryGap: false,
      //     axisTick: {
      //       show: false
      //     }
      //   },
      //   grid: {
      //     left: 10,
      //     right: 10,
      //     bottom: 20,
      //     top: 30,
      //     containLabel: true
      //   },
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {
      //       type: 'cross'
      //     },
      //     padding: [5, 10]
      //   },
      //   yAxis: {
      //     axisTick: {
      //       show: false
      //     }
      //   },
      //   legend: {
      //     data: ['expected', 'actual']
      //   },
      //   series: [{
      //     name: 'expected', itemStyle: {
      //       normal: {
      //         color: '#FF005A',
      //         lineStyle: {
      //           color: '#FF005A',
      //           width: 2
      //         }
      //       }
      //     },
      //     smooth: true,
      //     type: 'line',
      //     data: expectedData,
      //     animationDuration: 2800,
      //     animationEasing: 'cubicInOut'
      //   },
      //   {
      //     name: 'actual',
      //     smooth: true,
      //     type: 'line',
      //     itemStyle: {
      //       normal: {
      //         color: '#3888fa',
      //         lineStyle: {
      //           color: '#3888fa',
      //           width: 2
      //         },
      //         areaStyle: {
      //           color: '#f3f8ff'
      //         }
      //       }
      //     },
      //     data: actualData,
      //     animationDuration: 2800,
      //     animationEasing: 'quadraticOut'
      //   }]
      // }, true)
    },
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
<style>
</style>
