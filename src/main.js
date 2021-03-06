// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from './http.js'
import App from './App'
import router from './router'
import store from '@/store'
import ElementUI from 'element-ui'
import './icons'
import './permission'
// import '@/styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

Vue.config.productionTip = false

Vue.prototype.axios = axios

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  router,
  store,
  components: { App },
  template: '<App/>'
})

// import Vue from 'vue'
// import router from './router'
// import store from '@/store'
// import '@/config/rem'
// import '@/style/common.scss'
// import 'mint-ui/lib/style.css'
// import Tabbar from '@/page/tabbar'
// import { Swipe, SwipeItem, Cell } from 'mint-ui'
// import axios from 'axios'
// import './mock' // simulation data

// Vue.prototype.axios = axios
// Vue.config.productionTip = false

// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Cell.name, Cell)
// Vue.component('tabbar', Tabbar)
// /* eslint-disable no-new */
// new Vue({
//   router,
//   store
// }).$mount('#app')
