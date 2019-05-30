const db = require(`${process.env.PWD}/database/db`)

module.exports = (req, res) => {
  const { commentID } = req.params

  db.comments.destroy(commentID)
    .then(() => res.status(200).send('comments/delete: success'))
    .catch((err) => res.status(500).send('comments/delete: ' + err))
}
