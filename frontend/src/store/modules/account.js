import ApiService from '@/services/ApiService';

export const namespaced = true;

export const state = {
  status: {},
  user: {},
};

export const mutations = {
  LOGIN_REQUEST: (state) => {
    state.status = { isLoggingIn: true };
  },
  LOGIN_SUCCESS: (state, user) => {
    state.status = { isLoggedIn: true };
    state.user = user;
  },
  LOGIN_FAILURE: (state) => {
    state.status = { };
    state.user = null;
  },
  LOGOUT: (state) => {
    state.status = { };
    state.user = null;
  },

  REGISTER_REQUEST: (state) => {
    state.status = { isRegistering: true };
  },
  REGISTER_SUCCESS: (state) => {
    state.status = { };
  },
  REGISTER_FAILURE: (state) => {
    state.status = { };
  },

  UPLOAD_PP_REQUEST: (state) => {
    state.status = { isUploadingPP: true, isLoggedIn: true };
  },
  UPLOAD_PP_SUCCESS: (state, imageURL) => {
    state.status = { isUploadingPP: false, isLoggedIn: true };
    state.user.pp_url = imageURL;
  },
};


export const actions = {
  login({ commit }, userToLogin) {
    const session = this._vm.$session;
    commit('LOGIN_REQUEST');
    ApiService.login(userToLogin)
      .then((res) => {
        const { accessToken, user } = res.data;
        session.start();
        session.set('accessToken', accessToken);
        session.set('user', user);
        ApiService.setAuthToken(accessToken);
        commit('LOGIN_SUCCESS', user);
      })
      .catch(() => {
        commit('LOGIN_FAILURE');
        session.remove('accessToken');
      });
  },
  register({ commit }, userToRegister) {
    const session = this._vm.$session;
    commit('LOGIN_REQUEST');
    ApiService.registerUser(userToRegister)
      .then((res) => {
        const { accessToken, user } = res.data;
        session.start();
        session.set('accessToken', accessToken);
        session.set('user', user);
        ApiService.setAuthToken(accessToken);
        commit('LOGIN_SUCCESS', user);
      })
      .catch(() => {
        commit('LOGIN_FAILURE');
        session.remove('accessToken');
      });
  },
  logout({ commit }) {
    const session = this._vm.$session;
    commit('LOGOUT');
    session.remove('accessToken');
    session.destroy();
    ApiService.removeAuthToken();
  },
  checkActiveSession({ commit }) {
    const user = this._vm.$session.get('user');
    if (user) {
      commit('LOGIN_SUCCESS', user);
    } else {
      commit('LOGIN_FAILURE');
    }
  },
  uploadPictureToUser({ commit, state }, image) {
    // console.log('upload commit');
    const session = this._vm.$session;
    commit('UPLOAD_PP_REQUEST');

    const user = session.get('user');

    ApiService.uploadProfilePicture(image, user.username)
      .then((res) => {
        console.log('upload then');
        commit('UPLOAD_PP_SUCCESS', res.data.imageURL);
        session.set('user', state.user);
        console.log(session.get('user'));
      })
      .catch(() => {
        console.log('upload error');
        // console.log(session.getAll());
      });
  },
};


export const getters = {
  isLoggedIn: state => state.status.isLoggedIn,
  getUser: state => state.user,
};
