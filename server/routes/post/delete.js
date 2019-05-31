const db = require(`${process.env.PWD}/database/db`)

module.exports = (req, res) => {
  const { postID } = req.params

  db.posts.destroy(postID)
    .then(() => res.status(200).send('posts/delete: success'))
    .catch((err) => res.status(500).send('posts/delete: ' + err))
}
