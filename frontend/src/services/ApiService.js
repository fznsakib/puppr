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
  setAuthToken(token) {
    if (token) {
      apiClient.defaults.headers.common.Authorization = token;
    } else {
      apiClient.defaults.headers.common.Authorization = null;
    }
  },
  removeAuthToken() {
    apiClient.defaults.headers.common.Authorization = null;
  },


  registerUser(userData) {
    return apiClient.post('/register', userData);
  },
  login(userData) {
    return apiClient.post('/login', userData);
  },
};
