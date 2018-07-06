<template>
  <div class="beradcrumb-cantainer">
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.name">
          <span v-if="item==='noredirect'||index==levelList.length-1">{{item.meta.title}}</span>
          <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data () {
    return {
      levelList: null
    }
  },
  created () {
    this.getBreadcrumb()
  },
  watch: {
    '$route' () {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
      this.levelList = matched
    }
  }
}
</script>
<style scoped>
  .beradcrumb-cantainer {
    padding: 20px 0;
  }
  .breadcrumb {
    height: 20px;
    line-height: 20px;
    font-size: 17px;
    text-align: left;
  }
  .breadcrumb >>> .el-breadcrumb__item {
    float: inherit;
    overflow: hidden;
    width: 85px;
    height: 20px;
  }
  /*.breadcrumb >>> [class^=el-breadcrumb__item]:nth-child(2) >>> .el-breadcrumb__separator{
    display: none;
    color: red;
  }*/
</style>
