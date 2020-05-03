import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminLogin from '../views/Admin/AdminLogin'
import AdminHome from '../views/Admin/AdminHome'
import CustomHome from '../views/Custom/CustomHome'
import CustomLogin from '../views/Custom/CustomLogin'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/admin',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/adminHome',
      component: AdminHome,
      redirect: { path: '/adminHome/1'},
      children: [
        {
          path: '/adminHome/1',
          component: () => import('../components/Admin/VideoManager.vue')    //视频管理
        },
        {
          path: '/adminHome/2',
          component: () => import('../components/Admin/VideoManagerChild.vue')    //视频上传
        }
      ]
    },
    {
      path: '/',
      name: 'CustomHome',
      component: CustomHome,
      redirect: { path: '/1'},
      children: [
        {
          path: '/1',
          component: () => import('../components/Custom/VideoHome.vue'),   //首页
        },
        {
          path: '/3',
          component: () => import('../components/Custom/PersonHome.vue'),   //个人页
        }, 
        {
          path: '/4',
          component: () => import('../components/Custom/VideoPlayerLocal.vue'),   //本地播放页
        },
        {
          path: '/2',
          component: () => import('../components/Custom/VideoHomeChild.vue'),   //  视频详情页 实现收藏、播放、评价功能
        }
      ]
    },
    {
      path: '/login',
      name: '/CustomLogin',
      component: CustomLogin
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
