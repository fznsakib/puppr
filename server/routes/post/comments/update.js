const db = require(`${process.env.PWD}/database/db`)

module.exports = (req, res) => {
  const { commentID } = req.params
  const { newBody } = req.body

  db.comments.update(commentID, 'body', newBody)
    .then(() => res.status(200).send('posts/comments/update: success'))
    .catch((err) => res.status(500).send('posts/comments/update: ' + err))
}
