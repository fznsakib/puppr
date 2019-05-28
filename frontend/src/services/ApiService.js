import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  withCredentials: false, // This is the default
  headers: {
    common: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: null
    }
  },
  timeout: 10000
})

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
  }
}

export default {
  setAuthToken: (token) => {
    if (token) apiClient.defaults.headers.common.Authorization = token
    else apiClient.defaults.headers.common.Authorization = null
  },

  removeAuthToken: () => {
    apiClient.defaults.headers.common.Authorization = null
  },

  login: (user) => apiClient.post('/login', user),
  register: (user) => apiClient.post('/register', user),

  // ////////
  // POSTS //
  // ////////

  createPost: ({ image, caption, username }) => {
    const timeString = new Date().getTime()
    const imageName = `post-${timeString}jpg`

    // upload image to Firebase
    let formData = new FormData()
    formData.append('file', image, imageName)
    return axios.post('https://us-central1-puppr-8727d.cloudfunctions.net/uploadPost', formData, axiosConfig)
      .then((res) => apiClient.post('/posts', { imageName, caption, username }))
      .catch((err) => console.log(`[createPost]: ${err}`))
  },

  getPost: (postID) =>
    apiClient.get(`/posts/${postID}`),

  getAllPosts: () =>
    apiClient.get('/posts'),

  getNumFavorites: (postID) =>
    apiClient.get(`/posts/${postID}/favorites`),

  getComments: (postID) =>
    apiClient.get(`/posts/${postID}/comments`),

  updateCaption: (postID, newCaption) =>
    apiClient.patch(`/posts/${postID}/caption/update`, newCaption),

  // TODO
  updateImage: (postID, newImage) => {
    // Do some stuff to create a new Image in firebase
    let newImageName

    return apiClient.patch(`/posts/${postID}/image/update`, newImageName)
  },

  deletePost: (postID) =>
    apiClient.delete(`/posts/${postID}/delete`),

  // ///////////
  // COMMENTS //
  // ///////////

  createComment: (postID, body, username) =>
    apiClient.post(`/posts/${postID}/comments`, { body, username }),

  updateComment: (postID, commentID, newBody) =>
    apiClient.patch(`/posts/${postID}/comments/${commentID}`, newBody),

  deleteComment: (postID, commentID) =>
    apiClient.delete(`/posts/${postID}/comments/${commentID}/delete`)
}
