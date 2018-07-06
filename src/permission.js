import router from './router'
import { getToken } from '@/utils/auth'

// no redirect白名单
const whiteList = ['/login', '/test']
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // ..
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 否则重定向到登录页
      // next('/login')
      // 调用next时传递参数
      // next({path: '/login', query: { toPath: to.path }})
      console.log(to.path)
      next({name: 'login', params: { toPath: to.path }})
    }
  }
})
