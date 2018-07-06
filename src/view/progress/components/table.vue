<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    header-row-class-name="tableHeader"
    row-class-name="tableRow">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>
<style scoped>
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
</style>
