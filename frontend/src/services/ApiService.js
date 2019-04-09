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

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
};

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
  uploadProfilePicture(image) {
    // Upload image to firebase as form data
    const fd = new FormData();
    fd.append('file', image, image.name);

    axios.post('https://us-central1-puppr-8727d.cloudfunctions.net/uploadImage', fd, axiosConfig)
      .then((res) => {
        console.log(res);
        res.status(200).send({});
      })
      .catch((res) => {
        res.status(500).send({});
      });

    // Add imageURL to database
    return apiClient.post('/uploadProfilePicture', image);
  },
};
