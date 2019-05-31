const db = require(`${process.env.PWD}/database/db`)

module.exports = (req, res) => {
  const { commentID } = req.params

  db.comments.destroy(commentID)
    .then(() => res.status(200).send('posts/comments/delete: success'))
    .catch((err) => res.status(500).send('posts/comments/delete: ' + err))
}
