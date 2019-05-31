import AuthService from '@/services/auth.service'
import TokenService from '@/services/token.service'

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

    AuthService.login(userToLogin)
      .then((result) => {
        const { user, accessToken } = result.data
        session.start()
        session.set('accessToken', accessToken)
        session.set('user', user)

        TokenService.setAuthToken(accessToken)

        commit('AUTH', user)
      })
      .catch((err) => {
        session.remove('accessToken')
        session.destroy()

        commit('ERROR', err)
        commit('UNAUTH')
      })
  },

  register({ commit }, userToRegister) {
    const session = this._vm.$session

    AuthService.register(userToRegister)
      .then((result) => {
        const { user, accessToken } = result.data
        session.start()
        session.set('accessToken', accessToken)
        session.set('user', user)

        TokenService.setAuthToken(accessToken)

        commit('AUTH', user)
      })
      .catch((err) => {
        session.remove('accessToken')
        session.destroy()

        commit('ERROR', err)
        commit('UNAUTH')
      })
  },

  logout({ commit }) {
    const session = this._vm.$session
    session.remove('accessToken')
    session.destroy()

    TokenService.removeAuthToken()

    commit('UNAUTH')
  },

  validateSession({ commit }) {
    const session = this._vm.$session
    const user = session.get('user')
    if (user) commit('AUTH', user)
    else commit('UNAUTH')
  }
}

export const getters = {
  getLoggedInStatus: state => state.isLoggedIn,
  getUser: state => state.user
}
