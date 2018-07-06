<template>
  <!-- <el-container> -->
  <div class="container" :class="{hideSidebar:!sidebar.opened}" @click="containerClick">
    <sidebar class="sidebar-container"></sidebar>
    <div class="next-container">
      <navbar :user-plane="userPlane" @planeClick="planeClick"></navbar>
      <el-main>
        <router-view></router-view>
      </el-main>
    </div>
  </div>
  <!-- </el-container> -->
</template>

<script>
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

export default {
  components: {
    Sidebar,
    Navbar
  },
  data () {
    return {
      userPlane: null
    }
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    }
  },
  // created () {
  //   this.axios({
  //     method: 'post',
  //     url: 'list.php',
  //     data: {
  //       page: 1
  //     }
  //   }).then(response => {
  //     console.log(response)
  //   }).catch(response => {
  //     console.log(response)
  //   })
  // },
  methods: {
    containerClick () {
      if (this.userPlane === false) {
        this.userPlane = true
      }
    },
    planeClick (data) {
      this.userPlane = data
    }
  }
}
</script>
<style scoped>
  /*.el-container {
    height: 100%;
  }*/
  .container {
    height: 100%;
    /*width: 100%;*/
    display: flex;
    /*flex-basis: auto;*/
  }
  .next-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    margin-left: 200px;
    transition: .3s;
    z-index: 2;
  }
  .el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
    overflow-x: hidden;
  }
</style>
