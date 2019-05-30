const db = require(`${process.env.PWD}/database/db`)

module.exports = (req, res) => {
  const { username } = req.params

  db.users.findOneBy('username', username)
    .then((user) => {
      if (!user) return res.status(404).send('users/getOne: no user found')
      return res.status(200).send(user)
    })
    .catch((err) => res.status(500).send('users/getOne: ' + err))
}
