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

  // GETTERS //
  getPostsByUser: (username) => {
    return apiClient.get(`/posts?username=${username}`)
      .then((res) => {
        console.log(`Successfully retrieved user's posts`)
        return res.data.posts
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getFavouritesByUser: (username) => {
    return apiClient.get(`/favourites?username=${username}`)
      .then((res) => {
        console.log(`Successfully retrieved user's favourited posts`)
        return res.data.posts
      })
      .catch((err) => {
        console.log(err)
      })
  },

  // CREATE //
  createPost: (username, image, caption) => {
    // Upload image to firebase as form data
    const fd = new FormData()
    let postID

    // Create post in database and update postID
    return apiClient.post('/posts/create', { username, caption })
      .then((res) => {
        postID = res.data.postID.id

        // Produce name for image specific to post
        const imageName = `post-${postID}.jpg`
        fd.append('file', image, imageName)

        // console.log(postID)

        // Upload image to Firebase
        axios.post('https://us-central1-puppr-8727d.cloudfunctions.net/uploadPost', fd, axiosConfig)

        // Update post entry with image URL
        return apiClient.post(`/posts/${postID}/picture/create`, { username })
      })
      .catch((err) => {
        console.log('post/create error' + err)
      })
  },
  createComment: (username, postID, comment) => apiClient.post(`/posts/${postID}/comment/create`, { comment, username }),
  createFavourite: (username, postID) => apiClient.post(`/favourites/create?username=${username}&postID=${postID}`),
  createLike: (username, postID) => apiClient.post(`/likes/create?username=${username}&postID=${postID}`),
  createDislike: (username, postID) => apiClient.post(`/dislikes/create?username=${username}&postID=${postID}`),

  // UPDATE //
  updateProfilePicture: (username, image) => {
    // Upload image to firebase as form data
    const fd = new FormData()

    // Produce name for image specific to user
    const imageName = `pp-${username}.jpg`
    fd.append('file', image, imageName)

    // Upload image to Firebase
    axios.post('https://us-central1-puppr-8727d.cloudfunctions.net/uploadProfilePicture', fd, axiosConfig)

    // Add imageURL to user on database
    return apiClient.post(`/users/${username}/picture/update`)
  },
  updateBio: (username, bio) => apiClient.post(`/users/${username}/bio/update`, { bio }),
  updatePostCaption: (postID, caption) => apiClient.post(`/posts/${postID}/caption/update`, { caption }),

  // REMOVE //
  removePost: (postID) => apiClient.post(`/posts/${postID}/remove`),
  removeFavourite: (username, postID) => apiClient.post(`/favourites/remove?username=${username}&postID=${postID}`),
  removeLike: (username, postID) => apiClient.post(`/likes/remove?username=${username}&postID=${postID}`),
  removeDislike: (username, postID) => apiClient.post(`/dislikes/remove?username=${username}&postID=${postID}`),

  // VERIFICATION //
  verifyPost: (image) => {
    console.log(image)

    // Convert image to binary
    let reader = new FileReader()

    // reader.readAsBinaryString(image)
    reader.readAsDataURL(image)

    reader.onload = function () {
      let binaryImage = reader.result

      // Send binary image to backend
      return apiClient.post(`/posts/verify`, { binaryImage })
    }
  }

}
