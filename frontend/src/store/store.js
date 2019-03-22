import Vue from 'vue';
import Vuex from 'vuex';
import * as account from '@/store/modules/account';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account,
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
});
