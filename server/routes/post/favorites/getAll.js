const db = require(`${process.env.PWD}/database/db`)

module.exports = (req, res) => {
  const { postID } = req.params

  db.comments.findAllBy('postID', postID)
    .then((favorites) => {
      if (!favorites) return res.status(404).send('posts/favorites/getAll: no comment found')
      return res.status(200).send(favorites)
    })
    .catch((err) => res.status(500).send('postS/favorites/getAll: ' + err))
}
