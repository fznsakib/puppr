import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/landing',
      name: 'landing',
      props: false,
      component: () => import(/* webpackChunkName: "landing" */ '@/views/Landing.vue')
    }
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'), //eslint-disable-line
    //   meta: {
    //     guest: true
    //   }
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import( webpackChunkName: "login"  './views/Login.vue'), //eslint-disable-line
    //   meta: {
    //     guest: true
    //   }
    // },
    // {
    //   path: '/profile',
    //   name: 'profile',
    //   component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue'),
    //   meta: {
    //     requiresAuth: true
    //   }
    // }
  ]
})

// const checkAuthenticated = (to, from, next) => {
//   if (router.app.$session.get('accessToken')) {
//     next()
//   } else {
//     next('/login')
//   }
// }

router.beforeEach((to, from, next) => {
  const isUserLoggedIn = router.app.$session.get('accessToken')

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isUserLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
