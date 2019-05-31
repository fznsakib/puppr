import { apiClient } from './api.service'
import UserFavoriteService from './user/favorite.service'
import UserPostService from './user/post.service'

const UserService = {
  // get
  getOne: (username) =>
    apiClient.get(`/user/${username}`),

  // patch
  updateBio: (username, newBio) =>
    apiClient.patch(`/user/${username}/bio`, newBio),
  updateImage: (username, newProfileImageURL) =>
    apiClient.patch(`/user/${username}/image`, newProfileImageURL),

  // delete
  delete: (username) =>
    apiClient.delete(`/user/${username}/delete`),

  // nested
  favorites: UserFavoriteService,
  posts: UserPostService
}

export default UserService
