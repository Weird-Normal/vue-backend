import Mock from 'mockjs'

// 获取Random对象
const Rondom = Mock.Random

// Mock数据
var res = Mock.mock({
  // 登陆信息
  'loginInfo': [{
    'token': '@guid'
  }],
  // 一级菜单信息
  'menuLevelInfo1A': [
    {
      'path': '/main',
      'name': '系统首页'
    },
    {
      'path': '/dataMenu',
      'name': '数据管理'
    },
    {
      'path': '/sysMenu',
      'name': '系统管理'
    }
  ],
  'menuLevelInfo1B': [
    {
      'path': '/main',
      'name': '系统首页'
    },
    {
      'path': '/dataMenu',
      'name': '数据管理'
    }
  ],
  // 按钮权限
  'permitInfoA': [
    {
      'path': '/dataMenu/p1',
      'permission': 'add,update,delete'
    }
  ],
  'permitInfoB': [
    {
      'path': '/dataMenu/p1',
      'permission': 'add,update'
    }
  ],
  // 用户信息
  'userInfo|77': [{
    'id|+1': 1,
    'username': () => Rondom.name(),
    'email': () => Rondom.email(),
    'age|1-100': 18
  }],
  // 数据库备份文件信息
  'fileInfo|22': [{
    'filename': '@word',
    'version|1-10.1': 1,
    'size|1-50': 100,
    'time': '@datetime'
  }],
  // 操作记录信息
  'operateInfo|50': [{
    'id': '@id',
    'name': '@first',
    'time': '@datetime',
    'record': '@csentence'
  }],
  // 成员信息
  'memberInfo|50': [{
    'account': '@first',
    'name': '@cname',
    'email': '@email',
    'branch': '@cword',
    'addTime': '@datetime',
    'lastTime': '@datetime',
    'status|1-2': true
  }]
})

// 二级菜单数据
var childMenu = Mock.mock({
  'dataMenu': [
    {
      'nav': '导航一',
      'group': [
        {
          'name': '分类一',
          'menu': [
            {
              'path': '/dataMenu/p1',
              'name': 'p1'
            },
            {
              'path': '/dataMenu/p2',
              'name': 'p2'
            },
            {
              'path': '/dataMenu/p3/',
              'name': 'p3'
            }
          ]
        }
      ]
    }
  ],
  'sysMenu': [
    {
      'nav': '导航一',
      'group': [
        {
          'name': '分类一',
          'menu': [
            {
              'path': '/sysMenu/s1',
              'name': '测试一'
            }
          ]
        }
      ]
    },
    {
      'nav': '权限管理',
      'group': [
        {
          'name': '',
          'menu': [
            {
              'path': '/sysMenu/authMenu/role',
              'name': '角色管理'
            },
            {
              'path': '/sysMenu/authMenu/branch',
              'name': '部门管理'
            },
            {
              'path': '/sysMenu/authMenu/member',
              'name': '成员管理'
            },
            {
              'path': '/sysMenu/authMenu/operate',
              'name': '操作日志'
            },
            {
              'path': '/sysMenu/authMenu/database',
              'name': '数据库管理'
            }
          ]
        }
      ]
    }
  ]
})

var userData = res.userInfo
var fileData = res.fileInfo
var operateData = res.operateInfo
var memberData = res.memberInfo
var loginData = res.loginInfo
var menuLevel1A = res.menuLevelInfo1A
var menuLevel1B = res.menuLevelInfo1B
var permitA = res.permitInfoA
var permitB = res.permitInfoB

/**
 * 登录
 */
Mock.mock(/login/, options => {
  let temp = options.body.split('&')
  let username = temp[0].split('=')[1]
  let password = temp[1].split('=')[1]
  if (username === 'a' && password === '123456') {
    return loginData
  } else if (username === 'b' && password === '123456') {
    return loginData
  } else {
    console.log('err-----')
  }
})

/**
 * 按钮权限
 */
Mock.mock(/getPermit/, options => {
  let username = options.body.split('=')[1]
  if (username === 'a') {
    return permitA
  } else if (username === 'b') {
    return permitB
  }
})

/**
 * 一级菜单
 */
Mock.mock(/getMenuLevel1/, options => {
  let username = options.body.slice(9)
  if (username === 'a') {
    return menuLevel1A
  } else if (username === 'b') {
    return menuLevel1B
  } else {
    console.log(`can't get leve1 menu`)
  }
})

/**
 * 二级菜单
 */
Mock.mock(/getChildMenu/, options => {
  let temp = options.body.split('&')
  // let username = temp[0].split('=')[1]
  let path = unescape(temp[1].split('=')[1])
  switch (path) {
    case '/dataMenu/':
      return childMenu.dataMenu
    case '/sysMenu/':
      return childMenu.sysMenu
    case '/authMenu/':
      console.log(path)
      break
    default:
      console.log('xxxxx')
  }
})

/**
 * page1 table 数据
 */
// 返回用户数据
Mock.mock(/getUser/, options => {
  let temp = options.body.split('&')
  let start = parseInt(temp[0].split('=')[1])
  let rows = parseInt(temp[1].split('=')[1])
  let end = start + rows
  console.log('start:' + start + ' rows:' + rows + ' end:' + end)
  let pageData = {
    'total': userData.length,
    'data': userData.slice(start, end)
  }
  return pageData
  // return userData
})

// 删除单行数据
Mock.mock(/deleteUser/, function (options) {
  var id = parseInt(options.body.split(':')[1]) // 提取id值
  var index
  for (let i in userData) {
    if (userData[i].id === id) {
      index = i
      break
    }
  }
  userData.splice(index, 1)
  return userData
})

// 删除多行数据
Mock.mock(/removeUsers/, function (options) {
  var ids = options.body.split(':')[1].split('}')[0].slice(1, -1).split(',') // 提取id数组
  for (let i in ids) {
    for (let j in userData) {
      if (userData[j].id === parseInt(ids[i])) {
        userData.splice(j, 1)
      }
    }
  }
  return userData
})

// 修改数据
Mock.mock(/updateUser/, options => {
  var id = parseInt(options.body.split(':')[1].slice(0, 1))
  var infos = options.body.slice(16, -2).split(',')
  var username = infos[0].slice(12, -1)
  var email = infos[1].slice(9, -1)
  var age = parseInt(infos[2].slice(6))
  for (let i in userData) {
    if (userData[i].id === id) {
      userData[i].username = username
      userData[i].email = email
      userData[i].age = age
    }
  }
  return userData
})

// 创建用户
Mock.mock(/createUser/, options => {
  var infos = options.body.slice(9, -2).split(',')
  var username = infos[0].slice(12, -1)
  var email = infos[1].slice(9, -1)
  var age = parseInt(infos[2].slice(6))
  var id = userData[userData.length - 1].id + 1
  var newUser = {'id': id, 'age': age, 'username': username, 'email': email}
  userData.push(newUser)
  return userData
})

/**
 * Page2 数据
 */
Mock.mock(/getDatabase/, options => {
  let temp = options.body.split('&')
  let start = parseInt(temp[0].split('=')[1])
  let rows = parseInt(temp[1].split('=')[1])
  let end = start + rows
  let pageData = {
    'total': fileData.length,
    'data': fileData.slice(start, end)
  }
  return pageData
})

Mock.mock(/getOperate/, options => {
  let temp = options.body.split('&')
  let start = parseInt(temp[0].split('=')[1])
  let rows = parseInt(temp[1].split('=')[1])
  let end = start + rows
  let pageData = {
    'total': operateData.length,
    'data': operateData.slice(start, end)
  }
  return pageData
})

Mock.mock(/getMember/, options => {
  let temp = options.body.split('&')
  let start = parseInt(temp[0].split('=')[1])
  let rows = parseInt(temp[1].split('=')[1])
  let end = start + rows
  let pageData = {
    'total': memberData.length,
    'data': memberData.slice(start, end)
  }
  return pageData
})
