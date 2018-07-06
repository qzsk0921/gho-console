import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Layout from '@/view/layout/layout.vue'
import login from '@/view/login/index.vue'
import dashboard from '@/view/dashboard.vue'
import financial from '@/view/financial/index.vue'
import overview from '@/view/financial/overview.vue'
import price from '@/view/financial/price.vue'
import recharge from '@/view/financial/recharge.vue'
import bill from '@/view/financial/bill.vue'
import voucher from '@/view/svg-icons'
import dc from '@/view/dataCenter'
import progress from '@/view/progress'
import pictures from '@/view/progress/pictures'

Vue.use(Router)

export default new Router({
  // mode: 'hash', // router的模式，分为history 、hash(默认)
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    { path: '/login', name: 'login', component: login },
    { path: '/earth/views/console',
      name: 'layout',
      component: Layout,
      redirect: '/earth/views/console/dashboard',
      children: [
        {
          path: '/earth/views/console/dashboard',
          component: dashboard,
          name: 'dashboard',
          meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
        },
        { path: '/earth/views/console/financial', redirect: '/earth/views/console/financial/overview' },
        { path: '/earth/views/console/financial',
          name: 'financial',
          component: financial,
          meta: {
            title: '财务中心'
          },
          children: [
            { path: 'overview',
              name: 'overview',
              component: overview,
              meta: {
                title: '财务概览'
              }
            },
            {
              path: 'price',
              name: 'price',
              component: price,
              meta: {
                title: '价格和优惠'
              }
            },
            { path: 'recharge',
              name: 'recharge',
              component: recharge,
              meta: {
                title: '账户充值'
              }
            },
            {
              path: 'bill',
              name: 'bill',
              component: bill,
              meta: {
                title: '账单详情'
              }
            },
            {
              path: 'voucher',
              name: 'icons',
              component: voucher,
              meta: {
                title: '抵用券'
              }
            }
          ]
        },
        {
          path: '/earth/views/console/dc',
          name: 'dc',
          component: dc
        },
        {
          path: '/earth/views/console/progress',
          name: 'progress',
          component: progress
        },
        {
          path: '/earth/views/console/pictures',
          component: pictures,
          name: 'pictures'
        }
      ]
    }
    // { path: '/', redirect: '/dashboard' },
    // { path: '/financial/overview', component: financial },
    // { path: '/financial/recharge', component: recharge }
  ]
})
