const db = require(`${process.env.PWD}/database/db`)

module.exports = (req, res) => {
  const { username } = req.params

  db.favorites.findAllBy('username', username)
    .then((favorites) => {
      if (!favorites) return res.status(404).send('users/favorites/getAll: no favorites found')
      console.log('DEBUG: Favorites looks like:')
      console.log(favorites)
      return res.status(200).send('favoritedPosts')
      // obtain all postIDs, then get all posts with those IDs
    })
    .catch((err) => res.status(500).send('users/favorites/getAll: ' + err))
}
