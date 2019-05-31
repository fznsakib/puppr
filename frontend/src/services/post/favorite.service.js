import { apiClient } from '../api.service'

const PostFavoriteService = {
  // post
  create: (postID, favorite) =>
    apiClient.post(`/post/${postID}/favorites`, favorite),

  // get
  getAll: (postID) =>
    apiClient.get(`/post/${postID}/favorites`),

  // delete
  delete: (postID, favoriteID) =>
    apiClient.delete(`/post/${postID}/favorites/${favoriteID}/delete`)
}

export default PostFavoriteService
