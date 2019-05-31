const db = require(`${process.env.PWD}/database/db`)

module.exports = (req, res) => {
  const { postID } = req.params
  const { username } = req.body

  db.favorites.create(postID, username)
    .then(() => res.status(200).send('posts/favorites/create: success'))
    .catch((err) => res.status(500).send('posts/favorites/create: ' + err))
}
