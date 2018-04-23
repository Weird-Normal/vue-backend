import Mock from 'mockjs'

// 获取Random对象
const Rondom = Mock.Random

// var data = Mock.mock({
//   'list|1-10': [{
//       'id|+1': 1
//   }]
// });

var res = Mock.mock({
  'userInfo|20': [{
    'id|+1': 1,
    'username': () => Rondom.name(),
    'email': () => Rondom.email(),
    'age|1-100': 18
  }]
})

var data = res.userInfo

// var data = [
//   {id: 1, age: 10, username: 'ddd', email: 'dddd@ddd.ev'},
//   {id: 2, age: 80, username: 'Timothy Moore', email: 'n.xguexqbst@oxurqlod.ev'},
//   {id: 3, age: 94, username: 'Margaret Robinson', email: 'd.rixbc@pgwpitn.om'},
//   {id: 4, age: 23, username: 'Robert Wilson', email: 'h.extjegfim@buwzumc.gn'},
//   {id: 5, age: 28, username: 'Paul Anderson', email: 't.gky@rlcjbzist.tg'},
//   {id: 6, age: 16, username: 'Barbara Rodriguez', email: 'i.bfrjms@pxxyun.ir'},
//   {id: 7, age: 94, username: 'John Martinez', email: 'l.sci@krhmwdti.nt'},
//   {id: 8, age: 91, username: 'Sharon Harris', email: 'q.ybkewhvmcv@vmtjouxh.dk'},
//   {id: 9, age: 4, username: 'Angela Jones', email: 'c.fuc@wqwfet.pf'},
//   {id: 10, age: 5, username: 'Steven Martinez', email: 'w.dgwn@mwb.mc'},
//   {id: 11, age: 56, username: 'Gary Harris', email: 'f.xmrbvpjiw@kucf.ae'},
//   {id: 12, age: 42, username: 'Deborah Taylor', email: 'x.vpigfe@orbopiyue.pt'},
//   {id: 13, age: 23, username: 'Sarah Martinez', email: 'n.pmimzgb@fbbhe.by'},
//   {id: 14, age: 30, username: 'Laura White', email: 'b.kjdg@wouum.sr'},
//   {id: 15, age: 76, username: 'Mark Gonzalez', email: 'k.wmgoxtu@khxxybgs.br'},
//   {id: 16, age: 47, username: 'Lisa Lee', email: 'u.dfbuo@ntkygdmvfi.jp'},
//   {id: 17, age: 80, username: 'Daniel White', email: 'f.vqtqwjhxo@bdtdttgj.mw'},
//   {id: 18, age: 97, username: 'Susan Johnson', email: 'u.lbho@nsqrykz.biz'},
//   {id: 19, age: 61, username: 'Frank White', email: 'i.rjptevhduk@nciwekoiy.ar'},
//   {id: 20, age: 73, username: 'Sandra Davis', email: 'u.bktpnn@ksnjqniwly.eh'}
// ]

// data.userInfo[0].username = '好'

Mock.mock(/getUser/, function () {
  return data
})

Mock.mock(/deleteUser/, function (options) {
  var id = parseInt(options.body.split(':')[1])
  var index
  for (var i in data) {
    if (data[i].id === id) {
      index = i
      break
    }
  }
  data.splice(index, 1)
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
