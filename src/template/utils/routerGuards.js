/**
 * 全局路由导航守卫
 */
import router from '@/router/index'
// 页面加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()

  // 路由发生变化修改页面title
  document.title = '点一点 - ' + process.env.VUE_APP_PROJECT_NAME
  if (to.meta && to.meta.title) {
    document.title += ' - ' + to.meta.title
  }

  next()

  // finish progress bar
  NProgress.done()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
