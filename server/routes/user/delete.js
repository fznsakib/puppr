const db = require(`${process.env.PWD}/database/db`)

module.exports = (req, res) => {
  const { username } = req.params

  db.users.destroy(username)
    .then(() => res.status(200).send('user/delete: success'))
    .catch((err) => res.status(500).send('user/delete: ' + err))
}
