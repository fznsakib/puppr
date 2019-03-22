import ApiService from '@/services/ApiService';

export const namespaced = true;

export const state = {
  loggingIn: false,
  loginError: null,
  accessToken: localStorage.getItem('token') || '',
  user: {},
};


export const mutations = {
  LOGIN_START: (state) => {
    state.loggingIn = true;
  },
  LOGIN_STOP: (state, errorMessage) => {
    state.loggingIn = false;
    state.loginError = errorMessage;
  },
  UPDATE_ACCESS_TOKEN: (state, accessToken) => {
    state.accessToken = accessToken;
  },
  UPDATE_CURRENT_USER(state, user) {
    state.user = user;
  },
  CLEAR_CURRENT_USER(state) {
    state.accessToken = null;
    state.user = {};
  },
};


export const actions = {
  login({ commit }, userToLogin) {
    commit('LOGIN_START');
    ApiService.login(userToLogin)
      .then((res) => {
        const { accessToken, user } = res.data;
        localStorage.setItem('accessToken', accessToken);
        ApiService.setAccessToken(accessToken);
        commit('LOGIN_STOP', null);
        commit('UPDATE_CURRENT_USER', user);
        commit('UPDATE_ACCESS_TOKEN', accessToken);
      })
      .catch((err) => {
        commit('LOGIN_STOP', err);
        localStorage.removeItem('accessToken');
      });
  },
  register({ commit }, userToRegister) {
    commit('LOGIN_START');
    ApiService.registerUser(userToRegister)
      .then((res) => {
        const { accessToken, user } = res.data;
        localStorage.setItem('accessToken', accessToken);
        ApiService.setAccessToken(accessToken);
        commit('LOGIN_STOP', null);
        commit('UPDATE_CURRENT_USER', user);
        commit('UPDATE_ACCESS_TOKEN', accessToken);
      })
      .catch((err) => {
        commit('LOGIN_STOP', err);
        localStorage.removeItem('accessToken');
      });
  },
  logout({ commit }) {
    commit('CLEAR_CURRENT_USER');
    localStorage.removeItem('accessToken');
    ApiService.removeAccessToken();
  },
  fetchAccessToken({ commit }) {
    commit('UPDATE_ACCESS_TOKEN', localStorage.getItem('accessToken'));
  },
};


export const getters = {
  isLoggedIn: state => state.token,
  authStatus: state => state.status,
};
