const bcrypt = require('bcrypt')
const db = require(`${process.env.PWD}/database/db`)
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
  const { username, password } = req.body

  db.users.findOneBy('username', username)
    .then((user) => {
      if (!user) return res.status(404).send('auth/login: no user found')
      let isPasswordValid = bcrypt.compareSync(password, user.password)
      if (!isPasswordValid) return res.status(401).send('auth/login: invalid password')
      let accessToken = jwt.sign({ id: user.id }, 'tannousMarc', { expiresIn: 600 })
      return res.status(200).send({ user, accessToken })
    })
    .catch((err) => res.status(400).send('auth/login: ' + err))
}
