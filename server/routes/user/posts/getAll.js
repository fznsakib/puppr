const db = require(`${process.env.PWD}/database/db`)

module.exports = (req, res) => {
  const { username } = req.params

  db.posts.findAllBy('username', username)
    .then((posts) => {
      if (!posts) return res.status(404).send('users/posts/getAll: no posts found')
      return res.status(200).send(posts)
    })
    .catch((err) => res.status(500).send('users/posts/getAll: ' + err))
}
