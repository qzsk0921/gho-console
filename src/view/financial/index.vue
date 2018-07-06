<template>
  <div>
    <breadcrumb></breadcrumb>
    <div class="template-tabs">
      <el-tabs v-model="activeIndex" @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in options" :key="index" :label="item.label" :name="item.route">
        </el-tab-pane>
        <div class="content-wrap">
          <router-view/>
        </div>
      </el-tabs>
    </div>
    <!-- <div class="content-wrap">
      <router-view/>
    </div> -->
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb'
// import { mapGetter } from 'vuex'

export default {
  name: 'financial',
  components: {
    Breadcrumb
  },
  data () {
    return {
      options: [
        {label: '财务概览', name: 'first', route: '/financial/overview'},
        {label: '价格和优惠', name: 'second', route: '/financial/price'},
        {label: '账户充值', name: 'third', route: '/financial/recharge'},
        {label: '账单详情', name: 'fourth', route: '/financial/bill'},
        {label: '抵用券', name: 'fiveth', route: '/financial/voucher'}
      ]
    }
  },
  created () {
    let child = this.$route.path.split('/')[5]
    // this.$store.commit('set_active_index', `/financial/${child}`)
    // this.$store.dispatch('set_active_index', `/financial/${child}`)
    this.$store.dispatch({
      type: 'set_active_index',
      index: `/financial/${child}`
    })
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
      // let path = this.activeIndex
      let path = '/earth/views/console' + tab.name
      this.$router.push({path: path})
    }
  },
  computed: {
    activeIndex: {
      get () {
        return this.$store.state.navroute.activeIndex
        // return '/financial/' + this.$route.path.split('/')[2]
      },
      set (val) {
        // this.$store.commit('set_active_index', val)
        // this.$store.dispatch('set_active_index', val)
        // this.$store.dispatch({
        //   type: 'set_active_index',
        //   index: val
        // })
        return false
      }
    }
  },
  watch: {
    '$route' (to) {
      // let flag = false
      // for (let option of this.options ) {
      //   if (option.name === to.name) {
      //     flag = true
      //     this.$store.commit('set_active_index', '/' + to.path.split('/')[1])
      //     break
      //   }
      // }
      // if (!flag) {
      // this.$store.commit('add_tabs', {route: '/' + to.path.split('/')[1], name: to.name})
      // this.$store.commit('set_active_index', `/financial/${to.path.split('/')[2]}`)
      // console.log(this.$store.state.navroute.activeIndex)
      // this.$store.dispatch('set_active_index', `/financial/${to.path.split('/')[2]}`)
      this.$store.dispatch({
        type: 'set_active_index',
        // index: `/financial/${to.path.split('/')[2]}`
        // index: to.path
        index: '/' + to.path.split('/')[4] + '/' + to.path.split('/')[5]
      })
    }
  }
}
</script>
