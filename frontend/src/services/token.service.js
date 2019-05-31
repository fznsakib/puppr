import { apiClient } from './api.service'

const TokenService = {
  setAuthToken: (token) => {
    apiClient.defaults.headers.common.Authorization = token
  },
  removeAuthToken: () => {
    apiClient.defaults.headers.common.Authorization = null
  }
}

export default TokenService
