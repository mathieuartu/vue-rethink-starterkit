import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

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
      path: '/my-movies',
      name: 'MyMovies',
      component: Home,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

export default router
