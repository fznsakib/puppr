import Vue from 'vue';
import Router from 'vue-router';
import Store from './store/store';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Profile from './views/Profile.vue';

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
      component: Login,
      meta: {
        guest: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        guest: true,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (Store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;

/*
  Method allows for lazy-loading of components.

  {
    path: "/route",
    name: "componentToLoad",
    component: () =>
       import(/* webpackChunkName: "componentToLoad"  "./views/ComponentToLoad.vue")
  }
*/
