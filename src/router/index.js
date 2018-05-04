import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/util/store'
// import HelloWorld from '@/components/HelloWorld'
// import Login from '@/page/Login'
import Index from '@/page/Index'
import Page1 from '@/page/Page1'
import Page2 from '@/page/Page2'
import Page3 from '@/page/Page3'
import Table from '@/page/Page1/table'
Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'Index',
//     component: Index,
//     redirect: '/page1', // 重定向到page1
//     children: [
//       {
//         path: '/page1',
//         name: 'Page1',
//         component: Page1,
//         children: [
//           {
//             path: '/page1/table',
//             name: 'Table',
//             component: Table
//           }
//         ]
//       },
//       {
//         path: '/page2',
//         name: 'Page2',
//         component: Page2
//       },
//       {
//         path: '/page3',
//         name: 'Page3',
//         component: Page3
//       }
//     ]
//   }
// ]

export default new VueRouter({
  // routes: [
  //   {
  //     path: '/Login',
  //     name: 'Login',
  //     component: Login
  //   }
  // ],
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/page1', // 重定向到page1
      children: [
        {
          path: '/page1',
          name: 'Page1',
          component: Page1,
          children: [
            {
              path: '/page1/table',
              name: 'Table',
              component: Table
            }
          ]
        },
        {
          path: '/page2',
          name: 'Page2',
          component: Page2
        },
        {
          path: '/page3',
          name: 'Page3',
          component: Page3
        }
      ]
    }
  ],
  mode: 'history' // 干掉地址栏里边的#号键
}).beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) { // 这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/Login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})
