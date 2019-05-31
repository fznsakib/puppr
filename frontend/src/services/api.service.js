import axios from 'axios'

const ApiService = {
  apiClient: axios.create({
    baseURL: 'http://127.0.0.1:3000',
    withCredentials: false, // This is the default
    headers: {
      common: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: null
      }
    },
    timeout: 10000 // 10s
  }),

  config: {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    }
  }
}

export default ApiService
