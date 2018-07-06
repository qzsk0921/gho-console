<template>
  <el-aside width="200px">
    <router-link class="logo-wrap" to="http://www.guihuao.com">
      <img class="logo-img" src="@/assets/logo.png">
    </router-link>
    <sidebar-item></sidebar-item>
  </el-aside>
</template>
<script>
import SidebarItem from './SidebarItem'

export default {
  components: {
    SidebarItem
  }
}
</script>
<style scoped>
  /*.el-aside {
    background-color: #f7e27c;
    color: #333;
    text-align: center;
  }
  .logo-wrap {
    display: block;
    height: 90px;
    line-height: 90px;
  }
  .logo-img {
    width: 50%;
    vertical-align: middle;
    transition: width .3s;
  }*/
</style>
