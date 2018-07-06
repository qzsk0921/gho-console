<template>
  <div>
    <h3>内容管理</h3>
    <!-- <label for="">内容管理</label> -->
    <div class="content-storage">
      <div class="info">
        <div>
          <svg-icon class="svg" icon-name="folder"></svg-icon>
          <span>共111111个文件</span>
        </div>
        <div>
          <svg-icon class="svg" icon-name="storage"></svg-icon>
          <span>共2222.22GB存储量</span>
        </div>
      </div>
      <div class="search-box">
        <input v-model="searchVal" class="search" type="search" placeholder="输入文件名搜索" @keyup="searchfile(tableData)">
        <span class="search-svg-box">
          <svg-icon class="svg" icon-name="search"></svg-icon>
        </span>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      header-row-class-name="tableHeader"
      row-class-name="tableRow"
      v-loading="loading">
      <el-table-column
        prop="name"
        label="文件"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="size"
        label="存储量"
        :formatter="formattersize"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型">
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="tableData.length"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :pager-count=5
      :page-size="pagesize"
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
      searchVal: '',
      loading: true,
      currentPage: 1,
      pagesize: 12,
      total: null
    }
  },
  created () {
    this.axios({
      method: 'post',
      url: 'User_QinxiePHP/user_shuju_list.php',
      data: {
        usernum: 'admin',
        page2: 1,
        keyword: ''
      }
    }).then(response => {
      console.log(response)
      if (response.status === 200) {
        this.tableData = response.data.data

        this.total = +response.data.sumPage
        // 区域加载完成后
        this.loading = false
      }
    })
  },
  watch: {
    currentPage () {
      this.axios({
        method: 'post',
        url: 'User_QinxiePHP/user_shuju_list.php',
        data: {
          usernum: 'admin',
          page2: this.currentPage,
          keyword: this.searchVal
        }
      }).then(response => {
        this.loading = true
        if (response.status === 200) {
          this.tableData = response.data.data
          this.loading = false
        }
      }).catch(response => {
        console.log(response)
      })
    },
    searchVal () {
      this.currentPage = 1
      this.axios({
        method: 'post',
        url: 'User_QinxiePHP/user_shuju_list.php',
        data: {
          usernum: 'admin',
          page2: this.currentPage,
          keyword: this.searchVal
        }
      }).then(response => {
        console.log(response)
        if (response.status === 200) {
          this.total = +response.data.sumPage

          this.tableData = response.data.data
        }
      }).catch(response => {
        console.log(response)
      })
    }
  },
  // computed: {
  //   filterTableData () {
  //     if (this.searchVal) {
  //       // let newitems = []
  //       // let searchRegexp = new RegExp(this.searchVal)
  //       // this.tableData.forEach((v) => {
  //       //   if (searchRegexp.test(v.date)) {
  //       //     newitems.push(v)
  //       //   } else {
  //       //     return false
  //       //   }
  //       // })
  //       // return newitems
  //       return this.tableData
  //     } else {
  //       return this.tableData
  //     }
  //   }
  // },
  methods: {
    formattersize (row) {
      return `${(row.size / 1024).toFixed(2)}KB`
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
    },
    searchfile (items) {

    }
  }
}
</script>

<style scoped>
  h3 {
    text-align: left;
    width: 80px;
    height: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 18px;
    line-height: 30px;
  }
  .content-storage {
    display: flex;
    padding: 20px 0;
    margin-bottom: 10px;
    justify-content: space-between;
    border-top: 1px solid #e9e9e9;
    line-height: 30px;
    font-size: 14px;
  }
  .info {
    display: flex;
    vertical-align: middle;
  }
  .info div {
    padding-right: 40px;
  }
  .info .svg {
    vertical-align: middle;
  }
  .search-box {
    /*padding: 8px 0;*/
  }
  .search {
    width: 100%;
    padding: 6px 35px 6px 15px;
    height: 34px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    transition: all .2s;
    outline: none;
    overflow: hidden;
  }
  .search:focus {
    border-radius: 4px;
    border-color: #eab008;
  }
  .search:hover {
    border-color: #eab008;
  }
  .search-box {
    position: relative;
  }
  .search-svg-box {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
  .search-svg-box .svg {
    width: 100%;
    height: 100%;
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
</style>
