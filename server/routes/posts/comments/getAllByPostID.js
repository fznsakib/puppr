const db = require(`${process.env.PWD}/database/db`)

module.exports = (req, res) => {
  const { postID } = req.params

  db.comments.findAllBy('postID', postID)
    .then((comments) => {
      if (!comments) return res.status(404).send('comments/getAll: no comment found')
      return res.status(200).send(comments)
    })
    .catch((err) => res.status(500).send('comments/getAll: ' + err))
}
