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
    if (token) {
      apiClient.defaults.headers.common.Authorization = token
    } else {
      apiClient.defaults.headers.common.Authorization = null
    }
  },
  removeAuthToken: () => {
    apiClient.defaults.headers.common.Authorization = null
  },

  login: (user) => apiClient.post('/login', user),
  register: (user) => apiClient.post('/register', user),

  /* POSTS */
  // GET    /posts             => show all posts (index)
  // GET    /posts/{id}        => show ONE post (show)
  // GET    /posts/new         => show FORM to create new post (new)
  // POST   /posts             => create one new post & redirect (create)
  // GET    /posts/{id}/edit   => show edit form for one post (edit)
  // PATCH  /posts/{id}        => update one post & redirect (update)
  // DELETE /posts/{id}/delete => delete one post & redirect

  // gets all posts
  postsIndex: () => {
    return apiClient.get('/posts')
      .then((res) => res)
      .catch((err) => console.log(err))
  },
  // get one post
  postsShow: (postId) => {
    return apiClient.get(`/posts/${postId}`)
      .then((res) => res)
      .catch((err) => console.log(err))
  },
  // create a new post
  postsCreate: ({ image, caption, username }) => {
    const timeString = new Date().getTime()
    const imageName = `post-${timeString}jpg`

    // upload image to Firebase, with key postImageName
    let formData = new FormData()
    formData.append('file', image, imageName)
    return axios.post('https://us-central1-puppr-8727d.cloudfunctions.net/uploadPost', formData, axiosConfig)
      .then((res) => {
        apiClient.post('/posts', { imageName, caption, username })
      })
      .catch((err) => console.log(err))
  },
  // TODO
  postsUpdate: ({ newCaption, postId }) => {
    return apiClient.patch(`/posts/${postId}`)
      .then((res) => {

      })
      .catch((err) => {
        console.log(err)
      })
  },
  // TODO
  postsDestroy: (postId) => {
    return apiClient.delete(`/posts/${postId}/delete`)
      .then((res) => {

      })
      .catch((err) => {
        console.log(err)
      })
  },

  /* COMMENTS */
  // GET    /posts/{id}/comments/       => show ALL comments           (index)
  // GET    /posts/{id}/comments/{id}   => show ONE comment            (show)
  // GET    /posts/{id}/comments/new    => show FORM for new comment   (new)
  // POST   /posts/{id}/comments/       => create ONE comment & redir  (create)
  // GET    /posts/{id}/comments/edit   => show EDIT FORM for ONE comm (edit)
  // PATCH  /posts/{id}/comments/       => update ONE post & redir     (update)
  // DELETE /posts/{id}/comments/delete => delete ONE post & redir     (delete)
  // TODO
  commentsIndex: (postId) => {
    return apiClient.get(`/posts/${postId}/comments/`)
      .then((res) => {})
      .catch((err) => console.log(err))
  },
  // TODO
  commentsShow: (postId, commentId) => {
    return apiClient.get(`/posts/${postId}/comments/${commentId}`)
      .then((res) => {})
      .catch((err) => console.log(err))
  },
  // TODO
  commentsCreate: (postId) => {
    return apiClient.post(`/posts/${postId}/comments`)
      .then((res) => {})
      .catch((err) => console.log(err))
  },
  // TODO
  commentsUpdate: (postId) => {
    return apiClient.patch(`/posts/${postId}/comments`)
      .then((res) => {})
      .catch((err) => console.log(err))
  },
  // TODO
  commentsDelete: (postId) => {
    return apiClient.delete(`/posts/${postId}/comments/delete`)
      .then((res) => {})
      .catch((err) => console.log(err))
  }
}
