import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/util/store'
import Login from '@/page/Login'
import Index from '@/page/Index'
import DataMenu from '@/page/DataMenu'
import SysMenu from '@/page/SysMenu'
import TaskMenu from '@/page/TaskMenu'
import AuthMenu from '@/page/AuthMenu'
import P1 from '@/page/DataMenu/p1'
import P2 from '@/page/DataMenu/p2'
import P3 from '@/page/DataMenu/p3'
import P4 from '@/page/DataMenu/p4'
import S1 from '@/page/SysMenu/s1'
import Role from '@/page/AuthMenu/role'
import Branch from '@/page/AuthMenu/branch'
import Member from '@/page/AuthMenu/member'
import Operate from '@/page/AuthMenu/operate'
import Database from '@/page/AuthMenu/database'
import Auth from '@/page/AuthMenu/auth'
import AddMember from '@/page/AuthMenu/addMember'
import Main from '@/page/Main'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/main',
      // redirect: '/dataMenu', // 重定向到page1
      children: [
        {
          path: 'main',
          name: 'Main',
          component: Main
        },
        {
          path: '/dataMenu',
          name: 'DataMenu',
          component: DataMenu,
          children: [
            {
              path: '/dataMenu/p1',
              name: 'P1',
              component: P1,
              meta: {requireAuth: true}
            },
            {
              path: '/dataMenu/p2',
              name: 'P2',
              component: P2,
              meta: {requireAuth: true}
            },
            {
              path: '/dataMenu/p3',
              name: 'P3',
              component: P3,
              meta: {requireAuth: true}
            },
            {
              path: '/dataMenu/p4',
              name: 'P4',
              component: P4,
              meta: {requireAuth: true}
            }
          ],
          meta: {requireAuth: true}
        },
        {
          path: '/sysMenu',
          name: 'SysMenu',
          component: SysMenu,
          meta: {requireAuth: true},
          children: [
            {
              path: '/sysMenu/s1',
              name: 'S1',
              component: S1,
              meta: {requireAuth: true}
            }
          ]
        },
        {
          path: '/taskMenu',
          name: 'TaskMenu',
          component: TaskMenu,
          meta: {requireAuth: true}
        },
        {
          path: '/authMenu',
          name: 'AuthMenu',
          component: AuthMenu,
          redirect: '/authMenu/role',
          children: [
            {
              path: '/authMenu/role',
              name: 'Role',
              component: Role
            },
            {
              path: '/authMenu/branch',
              name: 'Branch',
              component: Branch
            },
            {
              path: '/authMenu/member',
              name: 'Member',
              component: Member
            },
            {
              path: '/authMenu/operate',
              name: 'Operate',
              component: Operate
            },
            {
              path: '/authMenu/database',
              name: 'Database',
              component: Database
            },
            {
              path: '/authMenu/auth',
              name: 'Auth',
              component: Auth
            },
            {
              path: '/authMenu/addMember',
              name: 'AddMember',
              component: AddMember
            }
          ]
        }
      ],
      meta: {requireAuth: true}
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ],
  mode: 'history' // 去除地址栏里边的#号键
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {
//     if (store.state.token) {
//       next()
//     } else {
//       next({
//         path: '/Login',
//         name: 'Login',
//         component: Login,
//         query: {redirect: to.fullPath}
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router
