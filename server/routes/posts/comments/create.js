const db = require(`${process.env.PWD}/database/db`)

module.exports = (req, res) => {
  const { postID } = req.params
  const { body, username } = req.body

  db.comments.create(body, postID, username)
    .then(() => res.status(200).send('comments/create: success'))
    .catch((err) => res.status(500).send('comments/create: ' + err))
}
