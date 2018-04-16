import Axios from 'axios'
// import qs from 'qs'

Axios.defaults.timeout = 5000
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Axios.defaults.params = {}

// 添加请求拦截器
Axios.interceptors.request.use(config => {
  // 在发送请求前要做的
  // let URL = config.url.split(config.baseURL)
  return config
}, error => {
  // 对请求错误要做的

  return Promise.reject(error)
})

// 添加响应拦截器
Axios.interceptors.response.use(response => {
  // 对响应的数据操作

  return response
}, error => {
  // 对响应错误的操作

  return Promise.reject(error)
})

// 获取数据封装
export const myGet = (url, params) => {
  return new Promise((resolve, reject) => {
    Axios.get(url, params).then(res => {
      resolve(res.data)
    }, err => {
      reject(err)
    }).catch(err => {
      reject(err)
    })
  })
}

// 传递数据封装
export const myPost = (url, params) => {
  return new Promise((resolve, reject) => {
    Axios.post(url, params).then(res => {
      resolve(res.data)
    }, err => {
      reject(err)
    }).cath(err => {
      reject(err)
    })
  })
}

// 传递修改数据封装
export const myUpdate = (url, param, params) => {
  return new Promise((resolve, reject) => {
    Axios.patch(url, param, params).then(res => {
      resolve(res.data)
    }, err => {
      reject(err)
    }).catch(err => {
      reject(err)
    })
  })
}

// 传递删除数据封装
export const myDelete = (url, params) => {
  return new Promise((resolve, reject) => {
    Axios.delete(url, params).then(res => {
      resolve(res.data)
    }, err => {
      reject(err)
    }).catch(err => {
      reject(err)
    })
  })
}

export default {
  _get () {
    return myGet('/getUser/')
  },

  _post (params) {
    return myPost('', params)
  },

  _update (param, params) {
    return myPost('' + '?ids=' + param, params)
  },

  _delete (user) {
    let userid = user.id
    return myDelete('' + userid)
  },

  _deletes () {
    let ids = []
    // $.each(this.selected, (i, user) => {
    //   ids.push(user.id)
    // })
    this.selected.forEach((user, i) => {
      ids.push(user.id)
    })
    ids = ids.join(',')
    return myDelete('' + ids)
  },

  Get (link) {
    return myGet(link)
  }
}
