<template>
  <div class="sidebar-links">
    <router-link :class="['sidebar-link', { active: /\/dashboard/.test($route.path) }]" to="/earth/views/console/dashboard">
      <svg-icon icon-class="sidebar-svg" icon-name="personal"></svg-icon>
      <div class="title">个人中心</div>
      <el-tooltip :disabled="sidebar.opened" effect="dark" content="个人中心" placement="right">
        <div id="tooltip"></div>
      </el-tooltip>
    </router-link>
    <router-link :class="['sidebar-link', { active: /\/financial/.test($route.path) }]" :to="'/earth/views/console'+$store.state.navroute.activeIndex">
      <svg-icon icon-class="sidebar-svg" icon-name="financial"></svg-icon>
      <div class="title">财务中心</div>
      <el-tooltip :disabled="sidebar.opened" effect="dark" content="财务中心" placement="right">
        <div id="tooltip"></div>
      </el-tooltip>
    </router-link>
    <router-link :class="['sidebar-link', { active: /\/dc/.test($route.path) }]" to="/earth/views/console/dc">
      <svg-icon icon-class="sidebar-svg" icon-name="data"></svg-icon>
      <div class="title">数据中心</div>
      <el-tooltip :disabled="sidebar.opened" effect="dark" content="数据中心" placement="right">
        <div id="tooltip"></div>
      </el-tooltip>
    </router-link>
    <router-link :class="['sidebar-link', { active: /\/progress/.test($route.path) }]" to="/earth/views/console/progress">
      <svg-icon icon-class="sidebar-svg" icon-name="progress"></svg-icon>
      <div class="title">进度查询</div>
      <el-tooltip :disabled="sidebar.opened" effect="dark" content="进度查询" placement="right">
        <div id="tooltip"></div>
      </el-tooltip>
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      // active: false
    }
  },
  computed: {
    ...mapGetters(['sidebar'])
  }
}
</script>
<style scoped>
  /*.sidebar-link {
    display: flex;
    align-items: center;
    height: 90px;
    line-height: 90px;
    padding: 0 30px;
  }
  .sidebar-link:hover {
    background-color: #f7d42c;
  }
  .active {
    background-color: #f9d00b;
  }
  .title {
    margin-left: 10px;
  }
  .sidebar-svg {
    width: 1.1em!important;
    height: 1.1em!important;
  }*/
</style>
