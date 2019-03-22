import Vue from 'vue';
import Router from 'vue-router';
// import store from './store/store';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
      meta: {
        guest: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
      meta: {
        guest: true,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isUserLoggedIn = router.app.$session.get('accessToken');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isUserLoggedIn) {
      console.log('User logged in && needs auth');
      next();
      return;
    }
    console.log('Needs auth but not logged in.');
    next('/login');
  } else {
    console.log('else');
    next();
  }
});

export default router;
