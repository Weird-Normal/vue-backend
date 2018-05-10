import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    username: '',
    permit: []
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
    },
    // 保存页面权限
    setPermit (state, permit) {
      state.permit = permit
    }
  }
})

export default store
