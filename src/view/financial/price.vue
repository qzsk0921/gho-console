<template>
  <div class="price-card">
    <h3>产品价格</h3>
    <div class="content">
      <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        header-row-class-name="tableHeader"
        row-class-name="tableRow"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="名目"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="阶梯"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="价格">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'price',
  data () {
    return {
      tableData: [{
        date: '存储空间 存储量取月度日均值进行费用结算。',
        name: '王小虎1',
        address: '上海市普陀区金沙江路 1518 上海市普陀区金沙江路 1518上海市普陀区金沙江路 1518'
      }, {
        date: '2016-05-04',
        name: '王小虎2',
        address: '上海市普陀区金沙江路 2222 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎3',
        address: '上海市普陀区金沙江路 3333 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎4',
        address: '上海市普陀区金沙江路 4444 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎5',
        address: '上海市普陀区金沙江路 5555 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎6',
        address: '上海市普陀区金沙江路 6666 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎7',
        address: '上海市普陀区金沙江路 7777 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎7',
        address: '上海市普陀区金沙江路 7777 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎7',
        address: '上海市普陀区金沙江路 7777 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎7',
        address: '上海市普陀区金沙江路 7777 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎7',
        address: '上海市普陀区金沙江路 7777 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎7',
        address: '上海市普陀区金沙江路 7777 弄'
      }]
    }
  },
  methods: {
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 4,
            colspan: 1
          }
        } else if (rowIndex >= 0 && rowIndex < 4) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>
<style scoped>
  .price-card h3 {
    text-align: left;
    width: 80px;
    height: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 18px;
    line-height: 30px;
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
  .el-table >>> .tableRow:nth-child(-n+3) td {
    border-bottom: 0;
  }
  .el-table >>> .tableRow:nth-child(5) td:first-child {
    border-top-color: #ebeef5;
    border-top-style: solid;
    border-top-width: 1px;
  }
</style>
