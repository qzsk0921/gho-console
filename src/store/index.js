import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import financial from './modules/financial'
import navroute from './modules/navroute'
import progress from './modules/progress'
import getters from './getters'

Vue.use(Vuex)

// const store = new Vuex.Store({
//   state: {
//     // options: [],
//     activeIndex: '/financial/overview',
//     rechargeInfo: {
//       name: '',
//       src: '',
//       des: '',
//       id: '',
//       rechargeAmount: ''
//     }
//     // userInfo: {}
//   },
//   mutations: {
//     // 设置当前激活的tab
//     set_active_index (state, index) {
//       this.state.activeIndex = index
//     }
//   }
// })

const store = new Vuex.Store({
  modules: {
    app,
    financial,
    navroute,
    progress
  },
  getters
})

export default store
