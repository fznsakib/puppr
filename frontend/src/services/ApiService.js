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
  setAuthToken (token) {
    if (token) {
      apiClient.defaults.headers.common.Authorization = token
    } else {
      apiClient.defaults.headers.common.Authorization = null
    }
  },
  removeAuthToken: () => {
    apiClient.defaults.headers.common.Authorization = null
  },
  registerUser: (userData) => apiClient.post('/register', userData),
  login: (userData) => apiClient.post('/login', userData),
  uploadProfilePicture: (image, username) => {
    // Upload image to firebase as form data
    const fd = new FormData()

    // Produce name for image specific to user
    const imageName = `pp-${username}.jpg`
    fd.append('file', image, imageName)

    // Upload image to Firebase
    axios.post('https://us-central1-puppr-8727d.cloudfunctions.net/uploadProfilePicture', fd, axiosConfig)

    // Add imageURL to user on database
    return apiClient.post('/updateProfilePicture', { username })
  },
  uploadPost: (image, caption, username) => {
    // Upload image to firebase as form data
    const fd = new FormData()
    var postID = null

    // Create post in database and update postID
    apiClient.post('/insertPost', { caption, username })
      .then((res) => {
        postID = res.data.postID
      })

    // Produce name for image specific to post
    const imageName = `post-${postID}.jpg`
    fd.append('file', image, imageName)

    // Upload image to Firebase
    axios.post('https://us-central1-puppr-8727d.cloudfunctions.net/uploadPost', fd, axiosConfig)

    // Update post with imageURL on database
    return apiClient.post('/updatePostPicture', { postID, username })
  },

  uploadComment: (postID, comment, username) => apiClient.post('/uploadComment', { postID, comment, username }),
  updateBio: (bio, username) => apiClient.post('/updateBio', { bio, username }),
  addFavourite: (postID, username) => apiClient.post('/addFavourite', { postID, username }),
  removeFavourite: (postID, username) => apiClient.post('/removeFavourite', { postID, username }),
  addLike: (postID, username) => apiClient.post('/addLike', { postID, username }),
  removeLike: (postID, username) => apiClient.post('/removeLike', { postID, username }),
  addDislike: (postID, username) => apiClient.post('/addDislike', { postID, username }),
  removeDislike: (postID, username) => apiClient.post('/removeDislike', { postID, username })
}
