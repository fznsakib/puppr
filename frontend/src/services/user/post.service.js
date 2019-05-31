import { apiClient } from '../api.service'

const UserPostService = {
  // get
  getAll: (username) =>
    apiClient.get(`/user/${username}/posts`)
}

export default UserPostService
