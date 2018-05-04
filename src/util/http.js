'use strict'

import axios from 'axios'
// import qs from 'qs'

// 请求前
axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  console.log('@@@@@@@@@@@' + token)
  // 判断 localStorage 中是否存在 token
  if (token) {
    // 存在则将 token 写入 request header
    config.headers.Authorization = token
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 请求后
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

export default axios
