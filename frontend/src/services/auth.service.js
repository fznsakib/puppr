import apiClient from '@/services/api.service'

const AuthService = {
  // post
  login: (user) =>
    apiClient.post('/login', user),
  register: (user) =>
    apiClient.post('/register', user)
}

export default AuthService
