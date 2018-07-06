<template>
  <div>
    <div class="card-container">
      <progress-card></progress-card>
      <picture-card></picture-card>
    </div>
    <!-- <el-progress type="circle" :stroke-width="15" :percentage="percentage" status="success"></el-progress> -->
    <h3 class="table-title">订单信息查询</h3>
    <el-table
      :data="tableData"
      style="width: 100%"
      header-row-class-name="tableHeader"
      row-class-name="tableRow"
      v-loading="loading">
      <el-table-column
        type="index"
        :index="indexMethod"
        label="编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="TotalArea"
        label="项目面积">
      </el-table-column>
      <el-table-column
        prop="TotalPrice"
        label="项目价格">
      </el-table-column>
      <el-table-column
        prop="BeiZhu"
        label="备注"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="PAddress"
        label="地块位置"
        min-width="200">
      </el-table-column>
      <el-table-column
        prop="Time"
        label="提交时间"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="Yufu"
        label="预付状态">
      </el-table-column>
      <el-table-column
        label="地图">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="middle">查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="tableData.length"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :pager-count=5
      background
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import progressCard from './progressCard'
import pictureCard from './pictureCard'
// 给table数据添加单位
const filter = (response) => {
  response.data[0].forEach((item) => {
    item.TotalArea = `${item.TotalArea}公顷`
    item.TotalPrice = `${item.TotalPrice}元`
  })
}
export default {
  components: {
    progressCard,
    pictureCard
  },
  data () {
    return {
      loading: true,
      tableData: [],
      // pagerCount: 5,
      currentPage: 1,
      total: null
    }
  },
  created () {
    this.axios({
      method: 'post',
      url: 'list.php',
      data: {
        page: this.currentPage
      }
    }).then(response => {
      if (response.status === 200) {
        filter(response)
        console.log(response)
        this.tableData = response.data[0]
        // this.tableData = null
        this.total = +response.data[1]
        // 区域加载完成后
        this.loading = false
      }
    }).catch(response => {
      console.log(response)
    })
  },
  // computed: {
  //   status () {
  //     if (this.percentage === 100) {
  //       return 'success'
  //     }
  //   }
  // },
  watch: {
    currentPage () {
      this.axios({
        method: 'post',
        url: 'list.php',
        data: {
          page: this.currentPage
        }
      }).then(response => {
        if (response.status === 200) {
          filter(response) // 给table数据添加单位
          this.tableData = response.data[0]
        }
      }).catch(response => {
        console.log(response)
      })
    }
  },
  methods: {
    indexMethod (index) {
      return (this.currentPage - 1) * 10 + (index + 1)
    },
    handleClick (row) {
      // 查看订单地图
      window.open(`http://www.guihuao.com/3dspace/ditu.html?x=${row.LNG}&y=${row.LAT}&zoom=${row.Zoom}&projectid=${row.ProjectID}`)
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
    }
  }
}
</script>
<style scoped>
  .card-container {
    display: flex;
    /*flex-direction: column;*/
  }
  .table-title {
    color: #2f3033;
    margin: 5px 0 20px;
  }
  .el-table >>> .el-table__body-wrapper::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }
  .el-table >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
    background-color: rgba(249,208,11,1);
  }
  .el-table >>> .el-table__body-wrapper::-webkit-scrollbar-track {/*滚动条里面轨道*/
    /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
    border-radius: 10px;
    background: rgba(0,0,0,0);
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
  .el-pagination {
    padding: 10px;
    display: flex;
    justify-content: flex-end;
  }
  @media (max-width: 980px) {
    .card-container {
      flex-direction: column;
      justify-content: space-between;
    }
  }
</style>
