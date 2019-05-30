const db = require(`${process.env.PWD}/database/db`)

module.exports = (req, res) => {
  const { commentID } = req.params

  db.comments.findOneBy('id', commentID)
    .then((comment) => {
      if (!comment) return res.status(404).send('comments/getOne: no comment found')
      return res.status(200).send(comment)
    })
    .catch((err) => res.status(500).send('comments/getOne: ' + err))
}
