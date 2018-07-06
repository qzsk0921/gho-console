<template>
  <div>
    <el-table
      :data="tableData"
      header-row-class-name="tableHeader"
      row-class-name="tableRow"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        type="index"
        :index="indexMethod"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="money"
        label="金额"
        width="100"
        sortable>
      </el-table-column>
      <el-table-column
        prop="jiaoyiId"
        label="校验ID"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="info"
        label="描述"
        min-width="100">
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="tableData.length"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :pager-count=5
      :page-size="pageSize"
      background
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1,
      // pagerCount: 5,
      pageSize: 12,
      total: null,
      loading: true
    }
  },
  created () {
    this.axios({
      method: 'post',
      url: 'User_QinxiePHP/user_caiwu_zhangdan.php',
      data: {
        usernum: 'admin',
        page2: this.currentPage
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
  },
  watch: {
    currentPage () {
      this.axios({
        method: 'post',
        url: 'User_QinxiePHP/user_caiwu_zhangdan.php',
        data: {
          usernum: 'admin',
          page2: this.currentPage
        }
      }).then(response => {
        console.log(response)
        this.loading = true
        if (response.status === 200) {
          this.loading = false
          this.tableData = response.data.data
        }
      }).catch(response => {
        console.log(response)
      })
    }
  },
  methods: {
    indexMethod (index) {
      return (this.currentPage - 1) * 12 + (index + 1)
    },
    handleCurrentChange (val) {
      this.currentPage = val
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
