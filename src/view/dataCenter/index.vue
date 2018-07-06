<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane v-for="(item, index) in options" :key="index" :label="item.label" :name="item.name">
      <!-- <div v-if="index === 0">
        <data-statistics></data-statistics>
      </div>
      <div v-else-if="index === 1">
        <content-management></content-management>
      </div>
      <div v-else-if="index === 2">
        <table-people></table-people>
      </div>
      <div v-else-if="index === options.length-1">
        管理
      </div> -->
      <!-- <div v-if="item.name === 'first'">
        <data-statistics v-if="'first' === activeName"></data-statistics>
      </div>
      <div v-else-if="item.name === 'second'">
        <content-management></content-management>
      </div>
      <div v-else-if="item.name === 'third'">
        <table-people></table-people>
      </div>
      <div v-else-if="item.name === 'fourth'">管理</div> -->
    </el-tab-pane>
    <component :is="currentTabComponent"></component>
  </el-tabs>
</template>

<script>
import dataStatistics from './dataStatistics'
import contentManagement from './contentManagement'
import TablePeople from './TablePeople'

export default {
  components: {
    dataStatistics,
    contentManagement,
    TablePeople
  },
  data () {
    return {
      options: [
        // {label: '数据统计', name: 'first'},
        // {label: '内容管理', name: 'second'},
        // {label: '据统计', name: 'third'},
        // {label: '统计', name: 'fourth'}
        {label: '数据统计', name: 'dataStatistics'},
        {label: '内容管理', name: 'contentManagement'},
        {label: '据统计', name: 'TablePeople'},
        {label: '统计', name: 'fourth'}
      ],
      // currentTab: 'dataStatistics',
      activeName: 'dataStatistics',
      currentTabComponent: 'dataStatistics'
    }
  },
  // computed: {
  //   currentTabComponent () {
  //     return this.currentTab
  //   }
  // },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
      // this.currentTab = tab.name
      this.currentTabComponent = tab.name
    }
  }
}
</script>
<style scoped></style>
