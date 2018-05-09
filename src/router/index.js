import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/util/store'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/page/Login'
import Index from '@/page/Index'
import DataMenu from '@/page/DataMenu'
import SysMenu from '@/page/SysMenu'
import TaskMenu from '@/page/TaskMenu'
import Table from '@/page/Page1/table'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/dataMenu', // 重定向到page1
      children: [
        {
          path: '/dataMenu',
          name: 'DataMenu',
          component: DataMenu,
          children: [
            {
              path: '/page1/table',
              name: 'Table',
              component: Table,
              meta: {requireAuth: true}
            }
          ],
          meta: {requireAuth: true}
        },
        {
          path: '/sysMenu',
          name: 'SysMenu',
          component: SysMenu,
          meta: {requireAuth: true}
        },
        {
          path: '/taskMenu',
          name: 'TaskMenu',
          component: TaskMenu,
          meta: {requireAuth: true}
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
  mode: 'history' // 干掉地址栏里边的#号键
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) { // 这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
  // if (to.meta.requireAuth) {
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
