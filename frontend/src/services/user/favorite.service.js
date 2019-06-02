import apiClient from '@/services/api.service'

const UserFavoriteService = {
  // get
  getAll: (username) =>
    apiClient.get(`/user/${username}/favorites`)
}

export default UserFavoriteService
