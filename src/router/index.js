import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

import carsRoute from '@/router/cars.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(
        /* webpackChunkName: 'login' */
        '@/views/Login.vue')
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/cars',
    meta: {
      requiresAuth: true,
      roles: [
        'user',
        'admin'
      ]
    },
    children: carsRoute
  },
  {
    path: '*',
    redirect: {
      name: 'login'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const role = sessionStorage.getItem('role')
    if (to.meta.roles && to.meta.roles.includes(role)) {
      next()
    } else {
      next('login')
    }
  } else {
    next()
  }
})

export default router
