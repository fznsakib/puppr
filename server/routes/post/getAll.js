const db = require(`${process.env.PWD}/database/db`)

module.exports = (req, res) => {
  db.posts.all()
    .then((posts) => {
      if (!posts) return res.status(404).send('posts/getAll: no posts found')
      return res.status(200).send(posts)
    })
    .catch((err) => res.status(500).send('posts/getAll: ' + err))
}
