<template>
  <div>
    <div v-if="balance === 0">
      余额¥0
    </div>
    <div v-else>
      <line-chart :chart-data="lineChartData"></line-chart>
    </div>
  </div>
</template>
<script>
import LineChart from './components/LineChart'

let lineChartData = {
  // 真实数据
  newVisitis: {
    areaChartxAxis: [],
    actualData: []
  }
  // newVisitis: {
  //   expectedData: [100, 120, 161, 134, 105, 160, 165],
  //   actualData: [120, 82, 91, 154, 162, 140, 1405]
  // },
  // messages: {
  //   expectedData: [200, 192, 120, 144, 160, 130, 140],
  //   actualData: [180, 160, 151, 106, 145, 150, 130]
  // },
  // purchases: {
  //   expectedData: [80, 100, 121, 104, 105, 90, 100],
  //   actualData: [120, 90, 100, 138, 142, 130, 130]
  // },
  // shoppings: {
  //   expectedData: [130, 140, 141, 142, 145, 150, 160],
  //   actualData: [120, 82, 91, 154, 162, 140, 130]
  // }
}

export default {
  name: 'overview',
  components: {
    LineChart
  },
  created () {
    this.axios({
      method: 'post',
      url: 'User_QinxiePHP/user_caiwu_gailan.php',
      data: {
        usernum: 'admin'
      }
    }).then(response => {
      if (response.status === 200) {
        lineChartData.newVisitis.areaChartxAxis = []
        lineChartData.newVisitis.actualData = []
        // let chineseTimeArr
        // let yearArr = []
        response.data.forEach((v) => {
          // chineseTimeArr = []
          // yearArr = v.time.split(' ')[0].split('-')
          // chineseTimeArr.push(`${yearArr[0]}年`, `${yearArr[1]}月`)
          lineChartData.newVisitis.areaChartxAxis.push(v.time)
          lineChartData.newVisitis.actualData.push(v.money)
        })
      }
      console.log(response)
    }).catch(response => {
      console.log(response)
    })
  },
  data () {
    return {
      balance: 1,
      lineChartData: lineChartData.newVisitis
    }
  }
}
</script>
