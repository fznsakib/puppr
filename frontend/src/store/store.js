import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/store/modules/auth'
import * as modal from '@/store/modules/modal'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    modal
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {}
})
