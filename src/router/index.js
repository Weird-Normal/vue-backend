import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/Index'
import Page1 from '@/page/Page1'
import Page2 from '@/page/Page2'
import Page3 from '@/page/Page3'
import Table from '@/page/Page1/table'
import Role from '@/page/Page2/role'
import Branch from '@/page/Page2/branch'
import Member from '@/page/Page2/member'
import Operate from '@/page/Page2/operate'
import Database from '@/page/Page2/database'
import Auth from '@/page/Page2/auth'
import AddMember from '@/page/Page2/addMember'
import Main from '@/page/Main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/main',
      // redirect: '/page1', // 重定向到page1
      children: [
        {
          path: '/main',
          name: 'Main',
          component: Main
        },
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
          redirect: '/page2/role',
          children: [
            {
              path: '/page2/role',
              name: 'Role',
              component: Role
            },
            {
              path: '/page2/branch',
              name: 'Branch',
              component: Branch
            },
            {
              path: '/page2/member',
              name: 'Member',
              component: Member
            },
            {
              path: '/page2/operate',
              name: 'Operate',
              component: Operate
            },
            {
              path: '/page2/database',
              name: 'Database',
              component: Database
            },
            {
              path: '/page2/auth',
              name: 'Auth',
              component: Auth
            },
            {
              path: '/page2/addMember',
              name: 'AddMember',
              component: AddMember
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
