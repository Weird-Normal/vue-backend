import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    username: ''
  },
  mutations: {
    // 设置token
    setToken (state, token) {
      state.token = token
      sessionStorage.token = token
    },
    // 删除token
    delToken (state) {
      state.token = ''
      sessionStorage.removeItem('token')
    },
    // 保存用户名
    setUserName (state, username) {
      state.username = username
    },
    // 删除用户名
    delUserName (state) {
      state.username = ''
    }
  }
})

export default store
