import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  withCredentials: false, // This is the default
  headers: {
    common: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: null,
    },
  },
  timeout: 10000,
});

export default {
  setAccessToken(token) {
    if (token) {
      apiClient.defaults.headers.common.Authorization = token;
    } else {
      apiClient.defaults.headers.common.Authorization = null;
    }
  },
  removeAccessToken() {
    apiClient.defaults.headers.common.Authorization = null;
  },
  checkTokenValid() {
    apiClient.interceptors.response.use(undefined, (err) => {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        return false;
      }
      throw err;
    });
  },


  registerUser(userData) {
    return apiClient.post('/register', userData);
  },
  login(userData) {
    return apiClient.post('/login', userData);
  },
};
