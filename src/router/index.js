import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/page/Index'
import Page1 from '@/page/Page1'
import Page2 from '@/page/Page2'
import Page3 from '@/page/Page3'
import Table from '@/page/Page1/table'
import Role from '@/page/Page2/role'
import Test from '@/page/Page2/test'
Vue.use(Router)

export default new Router({
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
          component: Page2,
          children: [
            {
              path: '/page2/role',
              name: 'Role',
              component: Role
            },
            {
              path: '/page2/test',
              name: 'Test',
              component: Test
            }
          ]
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
})
