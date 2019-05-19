import ApiService from '@/services/ApiService'

export const namespaced = true

export const state = {
  isLoggingIn: false,
  isLoggedIn: false,
  isRegistering: false,
  isUploadingImg: false,
  user: {}
}

export const mutations = {
  LOGIN_REQUEST: (state) => {
    state.isLoggingIn = true
  },
  LOGIN_SUCCESS: (state, user) => {
    state.isLoggedIn = true
    state.user = user
  },
  LOGIN_FAILURE: (state) => {
    state.isLoggingIn = false
    state.isLoggedIn = false
    state.user = {}
  },
  LOGOUT: (state) => {
    state.isLoggedIn = false
    state.user = {}
  },

  REGISTER_REQUEST: (state) => {
    state.isRegistering = true
  },
  REGISTER_SUCCESS: (state, user) => {
    state.isRegistering = false
    state.isLoggedIn = true
    state.user = user
  },
  REGISTER_FAILURE: (state) => {
    state.isRegistering = false
    state.user = {}
  },

  UPLOAD_PP_REQUEST: (state) => {
    state.isUploadingImg = true
  },
  UPLOAD_PP_SUCCESS: (state, imageURL) => {
    state.isUploadingImg = false
    state.user.ppUrl = imageURL
  },
  UPLOAD_PP_FAILURE: (state) => {
    state.isUploadingImg = false
  },

  UPLOAD_POST_REQUEST: (state) => {
    state.isUploadingImg = true
  },
  UPLOAD_POST_SUCCESS: (state, imageURL) => {
    state.isUploadingImg = false
    // state.user.ppUrl = imageURL
  },
  UPLOAD_POST_FAILURE: (state) => {
    state.isUploadingImg = false
  },

  VALID_SESSION: (state, user) => {
    state.isLoggedIn = true
    state.user = user
  },
  INVALID_SESSION: (state) => {
    state.isLoggedIn = false
    state.user = {}
  }
}

export const actions = {
  // NOTE: LOGIN
  login ({ commit }, userToLogin) {
    // get vue-session
    const session = this._vm.$session

    // init local login
    commit('LOGIN_REQUEST')

    // perform server login
    ApiService.login(userToLogin)
      .then((res) => {
        // obtain data from successful login
        const { accessToken, user } = res.data

        // start session and put data inside
        session.start()
        session.set('accessToken', accessToken)
        session.set('user', user)

        // store user's token in Api headers
        ApiService.setAuthToken(accessToken)

        // finalize local login
        commit('LOGIN_SUCCESS', user)
      })
      .catch(() => {
        // remove status
        commit('LOGIN_FAILURE')

        // remove any tokens if exist
        session.remove('accessToken')
      })
  },

  register ({ commit }, userToRegister) {
    // get vue-session
    const session = this._vm.$session

    // init local register
    commit('REGISTER_REQUEST')

    // perform server register
    ApiService.registerUser(userToRegister)
      .then((res) => {
        // get data
        const { accessToken, user } = res.data

        // start a session & populate, as no logged in user
        session.start()
        session.set('accessToken', accessToken)
        session.set('user', user)

        // store user's token in Api headers
        ApiService.setAuthToken(accessToken)

        // finalize local register
        commit('REGISTER_SUCCESS', user)
      })
      .catch(() => {
        commit('REGISTER_FAILURE')
        session.remove('accessToken')
      })
  },

  logout ({ commit }) {
    const session = this._vm.$session
    commit('LOGOUT')
    session.remove('accessToken')
    session.destroy()
    ApiService.removeAuthToken()
  },

  validateSession ({ commit }) {
    const user = this._vm.$session.get('user')
    if (user) {
      commit('VALID_SESSION', user)
    } else {
      commit('INVALID_SESSION')
    }
  },

  uploadProfilePicture ({ commit, state }, image) {
    const session = this._vm.$session
    commit('UPLOAD_PP_REQUEST')
    const user = session.get('user')

    ApiService.uploadProfilePicture(image, user.username)
      .then((res) => {
        commit('UPLOAD_PP_SUCCESS', res.data.imageURL)
        session.set('user', state.user)
      })
      .catch(() => {
        commit('UPLOAD_PP_FAILURE')
      })
  },

  uploadPost ({ commit, state }, image, caption) {
    const session = this._vm.$session
    commit('UPLOAD_POST_REQUEST')
    const user = session.get('user')

    ApiService.uploadPost(image, caption, user.username)
      .then((res) => {
        commit('UPLOAD_POST_SUCCESS', res.data.imageURL)
        session.set('user', state.user)
      })
      .catch(() => {
        commit('UPLOAD_POST_FAILURE')
      })
  },
}

export const getters = {
  getLoggingInStatus: state => state.isLoggingIn,
  getLoggedInStatus: state => state.isLoggedIn,
  getRegisterStatus: state => state.isRegistering,
  getUploadingStatus: state => state.isUploadingImg,
  getUser: state => state.user
}
