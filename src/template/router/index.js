import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Page404 = () => import(/* webpackChunkName: "404" */ '@/views/errorPage/404.vue')
const Home = () => import(/* webpackChunkName: "home" */ '@/views/index/Home.vue')
const About = () => import(/* webpackChunkName: "about" */ '@/views/index/About.vue')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: '主页'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      title: '测试页'
    }
  }
  // 在这里添加其他路由
  // ......
]

const errorPage = [
  {
    path: '*',
    name: 'page404',
    component: Page404
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: '/' + process.env.VUE_APP_PROJECT_NAME,
  routes: routes.concat(errorPage)
})

export default router
