const bcrypt = require('bcrypt')
const db = require(`${process.env.PWD}/database/db`)
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
  const { username, email, fullname, password } = req.body
  const hashedPassword = bcrypt.hashSync(password, 8)

  db.users.create(username, email, fullname, hashedPassword)
    .then(() => {
      db.users.findOneBy('username', username)
        .then((user) => {
          if (!user) return res.status(404).send('auth/register: no user found')
          let accessToken = jwt.sign({ id: user.id }, 'tannousMarc', { expiresIn: 600 })
          return res.status(200).send({ user, accessToken })
        })
    })
    .catch((err) => res.status(500).send('auth/register: ' + err))
}
