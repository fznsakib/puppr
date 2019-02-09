import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    }
  ]
});

/*
  Method allows for lazy-loading of components.

  {
    path: "/route",
    name: "componentToLoad",
    component: () =>
       import(/* webpackChunkName: "componentToLoad"  "./views/ComponentToLoad.vue")
  }
*/
