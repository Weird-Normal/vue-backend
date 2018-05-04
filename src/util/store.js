import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    // 设置token
    setToken (state, token) {
      state.token = token
      sessionStorage.token = token
    },
    // 清楚token
    delToken (state) {
      state.token = ''
      sessionStorage.removeItem('token')
    }
  }
})

export default store
