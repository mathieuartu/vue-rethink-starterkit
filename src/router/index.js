import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'

import e404 from '@/pages/errors/404'
import e503 from '@/pages/errors/503'
import Home from '@/pages/Home'
import Signup from '@/pages/Signup'
import Login from '@/pages/Login'
import Logout from '@/pages/Logout'
import MyAccount from '@/pages/MyAccount'

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
      name: 'e404',
      component: e404
    },
    {
      path: '/503',
      name: 'e503',
      component: e503
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/account',
      name: 'MyAccount',
      component: MyAccount,
      meta: {
        requiresAuth: true,
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.isAuthenticated) {
      next()
      return
    }
    next('/503')
  } else {
    next()
  }
})

export default router
