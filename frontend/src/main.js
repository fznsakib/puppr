import Vue from 'vue';
import VueSession from 'vue-session';
import router from './router';
import store from './store/store';
import App from './App.vue';

Vue.use(VueSession, { persist: true });
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
