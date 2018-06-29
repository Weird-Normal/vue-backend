import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/util/store'
import Login from '@/page/Login'
import Index from '@/page/Index'
import DataMenu from '@/page/DataMenu'
import SysMenu from '@/page/SysMenu'
import P1 from '@/page/DataMenu/p1'
import P2 from '@/page/DataMenu/p2'
import S1 from '@/page/SysMenu/s1'
import Role from '@/page/SysMenu/AuthMenu/role'
import Branch from '@/page/SysMenu/AuthMenu/branch'
import Member from '@/page/SysMenu/AuthMenu/member'
import Operate from '@/page/SysMenu/AuthMenu/operate'
import Database from '@/page/SysMenu/AuthMenu/database'
import Auth from '@/page/SysMenu/AuthMenu/auth'
import AddMember from '@/page/SysMenu/AuthMenu/addMember'
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
          component: Main,
          meta: {requireAuth: true}
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
            },
            {
              path: '/sysMenu/authMenu/role',
              name: 'Role',
              component: Role,
              meta: {requireAuth: true}
            },
            {
              path: '/sysMenu/authMenu/branch',
              name: 'Branch',
              component: Branch,
              meta: {requireAuth: true}
            },
            {
              path: '/sysMenu/authMenu/member',
              name: 'Member',
              component: Member,
              meta: {requireAuth: true}
            },
            {
              path: '/sysMenu/authMenu/operate',
              name: 'Operate',
              component: Operate,
              meta: {requireAuth: true}
            },
            {
              path: '/sysMenu/authMenu/database',
              name: 'Database',
              component: Database,
              meta: {requireAuth: true}
            },
            {
              path: '/sysMenu/authMenu/auth',
              name: 'Auth',
              component: Auth,
              meta: {requireAuth: true}
            },
            {
              path: '/sysMenu/authMenu/addMember',
              name: 'AddMember',
              component: AddMember,
              meta: {requireAuth: true}
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

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/Login',
        name: 'Login',
        component: Login,
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router
