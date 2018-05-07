// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
// import Vuex from 'vuex'
import './mock/mock'
import Axios from 'axios'
import store from './util/store'
// import axios from './util/http'

Vue.use(ElementUI)

Vue.prototype.$axios = Axios
// Axios.defaults.baseURL = 'https://localhost:8080'
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Axios.defaults.headers.common['Authorization'] = store.state.token

// 添加请求拦截器
Axios.interceptors.request.use(config => {
  // 判断是否存在 token,如果存在则把token添加给每个页面header
  if (store.state.token) {
    config.headers.common['Authorization'] = store.state.token
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 添加响应拦截器
Axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
      case 403:
        this.$store.commit('delToken')
        router.replace({
          path: '/Login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
        break
    }
  }
  return Promise.reject(error.response.data)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store,
  components: { App },
  template: '<App/>'
})
