<template>
  <div>
    <div class="date-picker-box">
      <!-- <span class="demonstration">默认</span>
      {{value6}}
      <el-date-picker
        v-model="value6"
        :default-time="['00:00:02', '23:59:59']"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker> -->
      <!-- <div class="demonstration">值：{{ value }}</div> -->
      <el-date-picker
        v-model="value"
        value-format="yyyy-MM-dd"
        type="daterange"
        align="center"
        size="mini"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>
    </div>
    <div class="areaChart-box">
      <area-chart v-if="areaChartData !== null" :chart-data="areaChartData.data.newVisitis" :chartxaxis='areaChartxAxis'></area-chart>
      <span v-else style="color:#999">数据获取失败</span>
    </div>
    <h3 class="table-title">倾斜模型信息</h3>
    <el-table
      :data="tableData"
      header-row-class-name="tableHeader"
      row-class-name="tableRow"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="GUID"
        label="GUID">
      </el-table-column>
      <el-table-column
        prop="title"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="scenesize"
        label="容量"
        width="100"
        :formatter="formatterCapacity">
      </el-table-column>
      <el-table-column
        prop="addTime"
        label="添加时间"
        sortable
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="descript"
        label="场景描述"
        :formatter="formatterdesc">
      </el-table-column>
      <el-table-column
        prop="keyword"
        label="标签"
        :filters="[{ text: '风光', value: '风光' }, { text: '旅游', value: '旅游' }, { text: '规划', value: '规划' }, { text: '地质', value: '地质' }, { text: '3D建模', value: '3D建模' }, { text: '文物保护', value: '文物保护' }, { text: '三维实景', value: '三维实景' }, { text: '校园', value: '校园' }, { text: '2018年', value: '2018年' }, { text: '园区', value: '园区' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
          size="mini"
          v-for="(item, index) of scope.row.keyword"
          v-if="item"
          :key="index"
          disable-transitions>{{item}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="tableData.length"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="total, prev, pager, next, jumper"
      :pager-count=5
      :page-size="pageSize"
      background
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import AreaChart from './components/AreaChart'
import { formatTime } from '@/utils/formatTime.js'

// const areaChartData = {
//   data: {
//     newVisitis: {
//       expectedData: [1, 2, 6, 0, 0, 443, 100, 120, 161, 134, 105, 160, 165],
//       actualData: [120, 82, 91, 154, 162, 140, 1405]
//     },
//     messages: {
//       expectedData: [200, 192, 120, 144, 160, 130, 140],
//       actualData: [180, 160, 151, 106, 145, 150, 130]
//     },
//     purchases: {
//       expectedData: [80, 100, 121, 104, 105, 90, 100],
//       actualData: [120, 90, 100, 138, 142, 130, 130]
//     },
//     shoppings: {
//       expectedData: [130, 140, 141, 142, 145, 150, 160],
//       actualData: [120, 82, 91, 154, 162, 140, 130]
//     }
//   }
// }
// 最近六个月的时跨度
// let fromtime = formatTime(new Date(Date.now() - 3600 * 1000 * 24 * 180)).split(' ')[0]
let fromtime = formatTime(new Date(Date.now() - 3600 * 1000 * 24 * 6)).split(' ')[0]
let totime = formatTime(new Date()).split(' ')[0]

export default {
  components: {
    AreaChart
  },
  data () {
    return {
      loading: true,
      value: '',
      currentPage: 1,
      total: null,
      pageSize: 12,
      pickerOptions: {
        disabledDate (time) {
          // return time.getTime() < Date.now() - 8.64e7
          let curDate = (new Date()).getTime()
          let six = 180 * 24 * 3600 * 1000
          let sixMonths = curDate - six
          return time.getTime() > Date.now() || time.getTime() < sixMonths
        },
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      // areaChartData: areaChartData.data.newVisitis,
      // areaChartxAxis: areaChartxAxis,
      areaChartData: null,
      areaChartxAxis: null,
      tagColor: null,
      tableData: []
    }
  },
  created () {
    this.axios({
      method: 'post',
      url: 'User_QinxiePHP/user_shuju_gailan.php',
      data: {
        usernum: 'admin',
        fromtime: fromtime,
        totime: totime
      }
    }).then(response => {
      if (response.status === 200) {
        console.log(response)
        // 先清空然后重新把存储量和时间存起来
        // areaChartData.data.newVisitis.actualData = []
        // areaChartxAxis = []
        let actualData = []
        let daterange = []
        response.data.forEach((v) => {
          // areaChartData.data.newVisitis.actualData.push((v.size / (1024 * 1024)).toFixed(2))
          actualData.push((v.size / (1024 * 1024)).toFixed(2))
        })
        response.data.forEach((v) => {
          // areaChartxAxis.push(v.time)
          daterange.push(v.time)
        })
        this.areaChartData = {
          data: {
            newVisitis: {
              // expectedData: [],
              actualData: actualData
            }
          }
        }
        this.areaChartxAxis = daterange
        // areaChartData.data.newVisitis.actualData = actualData
        // areaChartxAxis = daterange
      }
    }).catch(response => {
      console.log(response)
    })
    // 获取模型GUID清单
    this.axios({
      method: 'post',
      url: 'User_QinxiePHP/user_listScene.php',
      data: {
        Phonenum: 'admin',
        page2: 1
      }
    }).then(response => {
      console.log(response)
      if (response.status === 200) {
        this.loading = false
        this.tableData = response.data.data
        this.total = +response.data.sumPage
      }
    }).catch(response => {
      console.log(response)
    })
    // this.areaChartData = {
    //   data: {
    //     newVisitis: {
    //       expectedData: [50, 40, 60, 80, 100, 143, 180, 220, 361, 434, 505, 660, 765],
    //       actualData: [120, 82, 91, 154, 162, 140, 1405]
    //     },
    //     messages: {
    //       expectedData: [200, 192, 120, 144, 160, 130, 140],
    //       actualData: [180, 160, 151, 106, 145, 150, 130]
    //     },
    //     purchases: {
    //       expectedData: [80, 100, 121, 104, 105, 90, 100],
    //       actualData: [120, 90, 100, 138, 142, 130, 130]
    //     },
    //     shoppings: {
    //       expectedData: [130, 140, 141, 142, 145, 150, 160],
    //       actualData: [120, 82, 91, 154, 162, 140, 130]
    //     }
    //   }
    // }
    // this.areaChartxAxis = ['2017 1月', '2017 2月', '2017 3月', '2017 4月', '2017 5月', '2017 6月', '2017 7月', '2017 8月', '2017 9月', '2017 10月', '2017 11月', '2017 12月']
  },
  watch: {
    value () {
      this.axios({
        method: 'post',
        url: 'User_QinxiePHP/user_shuju_gailan.php',
        data: {
          usernum: 'admin',
          fromtime: this.value[0],
          totime: this.value[1]
        }
      }).then(response => {
        console.log(response)
        if (response.status === 200) {
          let actualData = []
          let daterange = []
          response.data.forEach((v) => {
            // areaChartData.data.newVisitis.actualData.push((v.size / (1024 * 1024)).toFixed(2))
            actualData.push((v.size / (1024 * 1024)).toFixed(2))
          })
          response.data.forEach((v) => {
            // areaChartxAxis.push(v.time)
            daterange.push(v.time)
          })
          this.areaChartData = {
            data: {
              newVisitis: {
                // expectedData: [],
                actualData: actualData
              }
            }
          }
          this.areaChartxAxis = daterange
        }
      }).catch(response => {
        console.log(response)
      })
    }
  },
  methods: {
    formatterCapacity (row) {
      return `${row.scenesize}KB`
    },
    formatterdesc (row) {
      if (!row.descript) {
        return '无'
      } else {
        return row.descript
      }
    },
    filterTag (value, row) {
      // return row.tag === value
      return row.keyword.indexOf(value) !== -1
    },
    handleCurrentChange (val) {

    }
    // filterTag (value, row, column) {
    //   const property = column['property']
    //   return row[property] === value
    // }
  }
}
</script>

<style scoped>
  .date-picker-box {
    padding: 20px 0 10px;
    border-bottom: 1px solid #dcdfe5;
    text-align: right;
    margin-bottom: 50px;
  }
  .el-input__inner {
    border: none;
  }
  .areaChart-box {
    padding-bottom: 50px;
    border-bottom: 1px solid #dcdfe5;
  }
  .table-title {
    color: #2f3033;
    margin: 40px 0 25px;
  }
  .el-table >>> .tableHeader {
    color: #5e6166;
    /*font-size: 14px;*/
  }
  .el-table >>> th.is-leaf {
    background-color: #f7f7f7;
    /*line-height: 23px;*/
  }
  .el-table >>> .tableRow {
    text-align: left;
  }
  .el-table >>> .tableRow >>> td {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .el-tag {
    margin-left: 5px;
    margin-top: 5px;
  }
  .el-pagination {
    padding: 10px;
    display: flex;
    justify-content: flex-end;
  }
</style>
