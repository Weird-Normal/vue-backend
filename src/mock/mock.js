import Mock from 'mockjs'

// 获取Random对象
const Rondom = Mock.Random

// Mock数据
var res = Mock.mock({
  'userInfo|20': [{
    'id|+1': 1,
    'username': () => Rondom.name(),
    'email': () => Rondom.email(),
    'age|1-100': 18
  }],
  'fileInfo|10': [{
    'filename': '@word',
    'version|1-10.1': 1,
    'size|1-50': 100,
    'time': '@datetime'
  }],
  'operateInfo|7': [{
    'id': '@id',
    'name': '@first',
    'time': '@datetime',
    'record': '@csentence'
  }],
  'memberInfo|7': [{
    'account': '@first',
    'name': '@cname',
    'email': '@email',
    'branch': '@cword',
    'addTime': '@datetime',
    'lastTime': '@datetime',
    'status|1-2': true
  }]
})

var data = res.userInfo
var fileData = res.fileInfo
var operateData = res.operateInfo
var memberData = res.memberInfo

/**
 * page1 table 数据
 */
// 返回用户数据
Mock.mock(/getUser/, function () {
  return data
})

// 删除单行数据
Mock.mock(/deleteUser/, function (options) {
  var id = parseInt(options.body.split(':')[1]) // 提取id值
  var index
  for (let i in data) {
    if (data[i].id === id) {
      index = i
      break
    }
  }
  data.splice(index, 1)
  return data
})

// 删除多行数据
Mock.mock(/removeUsers/, function (options) {
  var ids = options.body.split(':')[1].split('}')[0].slice(1, -1).split(',') // 提取id数组
  for (let i in ids) {
    for (let j in data) {
      if (data[j].id === parseInt(ids[i])) {
        data.splice(j, 1)
      }
    }
  }
  return data
})

// 修改数据
Mock.mock(/updateUser/, options => {
  var id = parseInt(options.body.split(':')[1].slice(0, 1))
  var infos = options.body.slice(16, -2).split(',')
  var username = infos[0].slice(12, -1)
  var email = infos[1].slice(9, -1)
  var age = parseInt(infos[2].slice(6))
  for (let i in data) {
    if (data[i].id === id) {
      data[i].username = username
      data[i].email = email
      data[i].age = age
    }
  }
  return data
})

// 创建用户
Mock.mock(/createUser/, options => {
  var infos = options.body.slice(9, -2).split(',')
  var username = infos[0].slice(12, -1)
  var email = infos[1].slice(9, -1)
  var age = parseInt(infos[2].slice(6))
  var id = data[data.length - 1].id + 1
  var newUser = {'id': id, 'age': age, 'username': username, 'email': email}
  data.push(newUser)
  return data
})

/**
 * Page2 数据
 */
Mock.mock(/getDatabase/, () => {
  return fileData
})

Mock.mock(/getOperate/, () => {
  return operateData
})

Mock.mock(/getMember/, () => {
  return memberData
})
