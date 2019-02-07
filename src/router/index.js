import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Signup from '@/components/Signup'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      name: 'All',
      component: Home
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

export default router
