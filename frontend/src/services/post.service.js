import { apiClient } from './api.service'
import PostCommentService from './post/comment.service'
import PostFavoriteService from './post/favorite.service'

const PostService = {
  // post
  create: (post) =>
    apiClient.post(`/post`, post),

  // get
  getOne: (postID) =>
    apiClient.get(`/post/${postID}`),
  getAll: () =>
    apiClient.get(`/post`),

  // patch
  updateCaption: (postID, newCaption) =>
    apiClient.patch(`/post/${postID}/caption`, newCaption),
  updateImage: (postID, newImageName) => {
    apiClient.patch(`/posts/${postID}/image`, newImageName)
  },

  // delete
  delete: (postID) =>
    apiClient.delete(`/posts/${postID}/delete`),

  // nested
  comments: PostCommentService,
  favorites: PostFavoriteService
}

export default PostService
