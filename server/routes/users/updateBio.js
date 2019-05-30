const db = require(`${process.env.PWD}/database/db`)

module.exports = (req, res) => {
  const { username } = req.params
  const { newBio } = req.body

  db.users.update(username, 'bio', newBio)
    .then(() => res.status(200).send('users/updateBio: success'))
    .catch((err) => res.status(500).send('users/updateBio: ' + err))
}
