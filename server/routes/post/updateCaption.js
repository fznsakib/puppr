const db = require(`${process.env.PWD}/database/db`)

module.exports = (req, res) => {
  const { postID } = req.params
  const { newCaption } = req.body

  db.posts.update(postID, 'caption', newCaption)
    .then(() => res.status(200).send('posts/updateCaption: success'))
    .catch((err) => res.status(500).send('posts/updateCaption: ' + err))
}
