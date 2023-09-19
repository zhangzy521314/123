import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../views/welcome.vue'),
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../views/goods.vue'),
      },
      {
        path: '/goodsAdd',
        name: 'goodsAdd',
        component: () => import('../views/goodsAdd.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (!token && to.path !== '/') {
    next('/')
  } else {
    if (token && to.path == '/') {
      next('/welcome')
    }
  }
  next()
})
export default router
