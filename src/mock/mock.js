import Mock from 'mockjs'

// 获取Random对象
const Rondom = Mock.Random

// var data = Mock.mock({
//   'list|1-10': [{
//       'id|+1': 1
//   }]
// });

var data = Mock.mock({
  'userInfo|20': [{
    'id|+1': 1,
    'username': () => Rondom.name(),
    'email': () => Rondom.email(),
    'age|1-100': 18
  }]
})

Mock.mock(/getUser/, function () {
  return data
})

// Mock.mock(/getUser/, {
//   'userInfo|20': [{
//     'id|+1': 1,
//     'username': () => Rondom.name(),
//     'email': () => Rondom.email(),
//     'age|1-100': 18
//   }]
//   // 'total': 50
// })

// console.log(JSON.stringify(data, null, 4))
