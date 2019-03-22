import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;

// const token = localStorage.getItem('token');

// console.log(`Login token: ${token}`);
// ApiService.setAuthTokenIfValid(token);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
