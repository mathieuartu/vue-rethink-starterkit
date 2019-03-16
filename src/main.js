// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueAsyncComputed from 'vue-async-computed'
import Meta from 'vue-meta'

import App from './App'
import router from './router'
import store from './vuex/store'
import axios from 'axios'

Vue.use(VueAsyncComputed)
Vue.use(Meta)

axios.interceptors.request.use(request => {
  store.commit('setLoadingState', true)
  return request
})
axios.interceptors.response.use(response => {
  store.commit('setLoadingState', false)
  return response
})

Vue.config.productionTip = false
Vue.prototype.$http = axios

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
