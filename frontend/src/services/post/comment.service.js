import { apiClient } from '../api.service'

const PostCommentService = {
  // post
  create: (postID, comment) =>
    apiClient.post(`/post/${postID}/comments`, comment),

  // get
  getAll: (postID) =>
    apiClient.get(`/post/${postID}/comments`),

  // patch
  update: (postID, commentID, newBody) =>
    apiClient.patch(`/post/${postID}/comments/${commentID}`, newBody),

  // delete
  delete: (postID, commentID) =>
    apiClient.delete(`/post/${postID}/comments/${commentID}/delete`)
}

export default PostCommentService
