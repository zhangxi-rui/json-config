import router from './router'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式

// 全局路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
