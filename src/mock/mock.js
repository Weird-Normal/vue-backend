import Mock from 'mockjs'

// 获取Random对象
const Rondom = Mock.Random

Mock.mock(/getUser/, {
  'userInfo|50': [{
    'id|+1': 1,
    'username': () => Rondom.cname(),
    'email': () => Rondom.email(),
    'age|1-100': 18
  }]
})

// console.log(JSON.stringify(data, null, 4))
