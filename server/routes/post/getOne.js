const db = require(`${process.env.PWD}/database/db`)

module.exports = (req, res) => {
  const { postID } = req.params

  db.posts.findOneBy('id', postID)
    .then((post) => {
      if (!post) return res.status(404).send('posts/getOne: no post found')
      return res.status(200).send(post)
    })
    .catch((err) => res.status(500).send('posts/getOne: ' + err))
}
