import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/shops',
    name: 'shops',
    component: () => import('../views/ShopsPage.vue')
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('../views/MenuPage.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/Order.vue')
  },
  {
    path: '/tweets',
    name: 'tweets',
    component: () => import('../views/TweetsList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
