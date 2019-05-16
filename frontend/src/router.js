import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import HomeNotAuth from './views/HomeNotAuth.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/',
      name: 'homenotauth',
      component: HomeNotAuth,
      meta: {
        guest: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'), //eslint-disable-line
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

const checkAuthenticated = (to, from, next) => {
  if (router.app.$session.get('accessToken')) {
    next()
    return
  }
}


export default router;
