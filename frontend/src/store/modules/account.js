import ApiService from '@/services/ApiService'

export const namespaced = true

export const state = {
  isLoggingIn: false,
  isLoggedIn: false,
  isRegistering: false,
  isUploadingImg: false,
  isUpdatingPost: false,
  isFavouritingPost: false,
  isCommenting: false,
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
  UPLOAD_POST_SUCCESS: (state) => {
    state.isUploadingImg = false
  },
  UPLOAD_POST_FAILURE: (state) => {
    state.isUploadingImg = false
  },

  UPDATE_POST_REQUEST: (state) => {
    state.isUpdatingPost = true
  },
  UPDATE_POST_SUCCESS: (state) => {
    state.isUpdatingPost = false
  },
  UPDATE_POST_FAILURE: (state) => {
    state.isUpdatingPost = false
  },

  UPLOAD_COMMENT_REQUEST: (state) => {
    state.isCommenting = true
  },
  UPLOAD_COMMENT_SUCCESS: (state) => {
    state.isCommenting = false
  },
  UPLOAD_COMMENT_FAILURE: (state) => {
    state.isCommenting = false
  },

  FAVOURITE_POST_REQUEST: (state) => {
    state.isFavouritingPost = true
  },
  FAVOURITE_POST_SUCCESS: (state) => {
    state.isFavouritingPost = false
  },
  FAVOURITE_POST_FAILURE: (state) => {
    state.isFavouritingPost = false
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

  updateProfilePicture ({ commit, state }, image) {
    const session = this._vm.$session
    commit('UPLOAD_PP_REQUEST')
    const user = session.get('user')

    ApiService.updateProfilePicture(user.username, image)
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
        commit('UPLOAD_POST_SUCCESS')
        session.set('user', state.user)
      })
      .catch(() => {
        commit('UPLOAD_POST_FAILURE')
      })
  },

  uploadComment ({ commit, state }, postID, comment) {
    const session = this._vm.$session
    commit('UPLOAD_COMMENT_REQUEST')
    const user = session.get('user')

    ApiService.uploadComment(postID, comment, user.username)
      .then((res) => {
        commit('UPLOAD_COMMENT_SUCCESS')
        session.set('user', state.user)
      })
      .catch(() => {
        commit('UPLOAD_COMMENT_FAILURE')
      })
  },

  updateBio ({ commit, state }, bio) {
    const session = this._vm.$session
    const user = session.get('user')

    ApiService.updateBio(bio, user.username)
      .then((res) => {
        session.set('user', state.user)
      })
      .catch(() => {
      })
  },

  addFavourite ({ commit, state }, postID) {
    const session = this._vm.$session
    commit('FAVOURITE_POST_REQUEST')
    const user = session.get('user')

    ApiService.addFavourite(postID, user.username)
      .then((res) => {
        commit('FAVOURITE_POST_SUCCESS')
        session.set('user', state.user)
      })
      .catch(() => {
        commit('FAVOURITE_POST_FAILURE')
      })
  },

  removeFavourite ({ commit, state }, postID) {
    const session = this._vm.$session
    commit('FAVOURITE_POST_REQUEST')
    const user = session.get('user')

    ApiService.removeFavourite(postID, user.username)
      .then((res) => {
        commit('FAVOURITE_POST_SUCCESS')
        session.set('user', state.user)
      })
      .catch(() => {
        commit('FAVOURITE_POST_FAILURE')
      })
  },

  addLike ({ commit, state }, postID) {
    const session = this._vm.$session
    commit('UPDATE_POST_REQUEST')
    const user = session.get('user')

    ApiService.addLike(postID, user.username)
      .then((res) => {
        commit('UPDATE_POST_SUCCESS')
        session.set('user', state.user)
      })
      .catch(() => {
        commit('UPLOAD_POST_FAILURE')
      })
  },

  removeLike ({ commit, state }, postID) {
    const session = this._vm.$session
    commit('UPDATE_POST_REQUEST')
    const user = session.get('user')

    ApiService.removeLike(postID, user.username)
      .then((res) => {
        commit('UPDATE_POST_SUCCESS')
        session.set('user', state.user)
      })
      .catch(() => {
        commit('UPLOAD_POST_FAILURE')
      })
  },

  addDislike ({ commit, state }, postID) {
    const session = this._vm.$session
    commit('UPDATE_POST_REQUEST')
    const user = session.get('user')

    ApiService.addDislike(postID, user.username)
      .then((res) => {
        commit('UPDATE_POST_SUCCESS')
        session.set('user', state.user)
      })
      .catch(() => {
        commit('UPLOAD_POST_FAILURE')
      })
  },

  removeDislike ({ commit, state }, postID) {
    const session = this._vm.$session
    commit('UPDATE_POST_REQUEST')
    const user = session.get('user')

    ApiService.removeDislike(postID, user.username)
      .then((res) => {
        commit('UPDATE_POST_SUCCESS')
        session.set('user', state.user)
      })
      .catch(() => {
        commit('UPLOAD_POST_FAILURE')
      })
  }
}

export const getters = {
  getLoggingInStatus: state => state.isLoggingIn,
  getLoggedInStatus: state => state.isLoggedIn,
  getRegisterStatus: state => state.isRegistering,
  getUploadingStatus: state => state.isUploadingImg,
  getUser: state => state.user
}
