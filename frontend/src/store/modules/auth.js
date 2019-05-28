import ApiService from '@/services/ApiService'

export const namespaced = true

export const state = {
  error: null,
  isLoggedIn: false,
  user: {}
}

export const mutations = {
  AUTH: (state, user) => {
    state.isLoggedIn = true
    state.user = user
  },
  UNAUTH: (state) => {
    state.isLoggedIn = false
    state.user = {}
  },
  ERROR: (state, err) => {
    state.err = err
  }
}

export const actions = {
  login({ commit }, userToLogin) {
    const session = this._vm.$session

    ApiService.login(userToLogin)
      .then((result) => {
        const { accessToken, user } = result.data
        ApiService.setAuthToken(accessToken)

        session.start()
        session.set('accessToken', accessToken)
        session.set('user', user)

        commit('AUTH', user)
      })
      .catch((err) => {
        commit('ERROR', err)
        commit('UNAUTH')
        session.remove('accessToken')
        session.destroy()
      })
  },

  register({ commit }, userToRegister) {
    const session = this._vm.$session

    ApiService.register(userToRegister)
      .then((result) => {
        const { accessToken, user } = result.data
        ApiService.setAuthToken(accessToken)

        session.start()
        session.set('accessToken', accessToken)
        session.set('user', user)

        commit('AUTH', user)
      })
      .catch((err) => {
        commit('ERROR', err)
        commit('UNAUTH')
        session.remove('accessToken')
        session.destroy()
      })
  },

  logout({ commit }) {
    commit('UNAUTH')

    const session = this._vm.$session
    ApiService.removeAuthToken()
    session.remove('accessToken')
    session.destroy()
  },

  validateSession({ commit }) {
    const user = this._vm.$session.get('user')
    if (user) {
      commit('AUTH', user)
    } else {
      commit('UNAUTH')
    }
  }

  // updateProfilePicture ({ commit, state }, image) {
  //   const session = this._vm.$session
  //   const user = session.get('user')

  //   ApiService.updateProfilePicture(user.username, image)
  //     .then((res) => {
  //       user.profilePictureUrl = res.data.profilePictureUrl
  //       session.set('user', state.user)
  //     })
  //     .catch(() => {

  //     })
  // }
  // uploadPost ({ commit, state }, image, caption) {
  //   const session = this._vm.$session
  //   commit('UPLOAD_POST_REQUEST')
  //   const user = session.get('user')

  //   ApiService.uploadPost(image, caption, user.username)
  //     .then((res) => {
  //       commit('UPLOAD_POST_SUCCESS')
  //       session.set('user', state.user)
  //     })
  //     .catch(() => {
  //       commit('UPLOAD_POST_FAILURE')
  //     })
  // },

  // uploadComment ({ commit, state }, postID, comment) {
  //   const session = this._vm.$session
  //   commit('UPLOAD_COMMENT_REQUEST')
  //   const user = session.get('user')

  //   ApiService.uploadComment(postID, comment, user.username)
  //     .then((res) => {
  //       commit('UPLOAD_COMMENT_SUCCESS')
  //       session.set('user', state.user)
  //     })
  //     .catch(() => {
  //       commit('UPLOAD_COMMENT_FAILURE')
  //     })
  // },

  // updateBio ({ commit, state }, bio) {
  //   const session = this._vm.$session
  //   const user = session.get('user')

  //   ApiService.updateBio(bio, user.username)
  //     .then((res) => {
  //       session.set('user', state.user)
  //     })
  //     .catch(() => {
  //     })
  // },

  // addFavourite ({ commit, state }, postID) {
  //   const session = this._vm.$session
  //   commit('FAVOURITE_POST_REQUEST')
  //   const user = session.get('user')

  //   ApiService.addFavourite(postID, user.username)
  //     .then((res) => {
  //       commit('FAVOURITE_POST_SUCCESS')
  //       session.set('user', state.user)
  //     })
  //     .catch(() => {
  //       commit('FAVOURITE_POST_FAILURE')
  //     })
  // },

  // removeFavourite ({ commit, state }, postID) {
  //   const session = this._vm.$session
  //   commit('FAVOURITE_POST_REQUEST')
  //   const user = session.get('user')

  //   ApiService.removeFavourite(postID, user.username)
  //     .then((res) => {
  //       commit('FAVOURITE_POST_SUCCESS')
  //       session.set('user', state.user)
  //     })
  //     .catch(() => {
  //       commit('FAVOURITE_POST_FAILURE')
  //     })
  // },

  // addLike ({ commit, state }, postID) {
  //   const session = this._vm.$session
  //   commit('UPDATE_POST_REQUEST')
  //   const user = session.get('user')

  //   ApiService.addLike(postID, user.username)
  //     .then((res) => {
  //       commit('UPDATE_POST_SUCCESS')
  //       session.set('user', state.user)
  //     })
  //     .catch(() => {
  //       commit('UPLOAD_POST_FAILURE')
  //     })
  // },

  // removeLike ({ commit, state }, postID) {
  //   const session = this._vm.$session
  //   commit('UPDATE_POST_REQUEST')
  //   const user = session.get('user')

  //   ApiService.removeLike(postID, user.username)
  //     .then((res) => {
  //       commit('UPDATE_POST_SUCCESS')
  //       session.set('user', state.user)
  //     })
  //     .catch(() => {
  //       commit('UPLOAD_POST_FAILURE')
  //     })
  // },

  // addDislike ({ commit, state }, postID) {
  //   const session = this._vm.$session
  //   commit('UPDATE_POST_REQUEST')
  //   const user = session.get('user')

  //   ApiService.addDislike(postID, user.username)
  //     .then((res) => {
  //       commit('UPDATE_POST_SUCCESS')
  //       session.set('user', state.user)
  //     })
  //     .catch(() => {
  //       commit('UPLOAD_POST_FAILURE')
  //     })
  // },

  // removeDislike ({ commit, state }, postID) {
  //   const session = this._vm.$session
  //   commit('UPDATE_POST_REQUEST')
  //   const user = session.get('user')

  //   ApiService.removeDislike(postID, user.username)
  //     .then((res) => {
  //       commit('UPDATE_POST_SUCCESS')
  //       session.set('user', state.user)
  //     })
  //     .catch(() => {
  //       commit('UPLOAD_POST_FAILURE')
  //     })
  // }
}

export const getters = {
  getLoggedInStatus: state => state.isLoggedIn,
  getUser: state => state.user
}
