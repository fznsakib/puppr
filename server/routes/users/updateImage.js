const db = require(`${process.env.PWD}/database/db`)

module.exports = (req, res) => {
  const { username } = req.params
  const { newProfileImageURL } = req.body

  db.users.update(username, 'profileImageURL', newProfileImageURL)
    .then(() => res.status(200).send('users/updateProfileImageURL: success'))
    .catch((err) => res.status(500).send('users/updateProfileImageURL: ' + err))
}
