/**
 * Controller for account creation routes.
 *
 * Routes available:
 * POST   /register -> registers a user
 * POST   /login    -> logs in a user
 */

const express = require('express')
const router = express.Router()


// middleware
router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

// db
const Database = require(`${__dirname}/../database/db`)
const db = new Database(`${__dirname}/../database/database`)

console.log(`Connected AUTH to Database.`)

/* ROUTES */

// register
router.post('/register', (req, res) => {
  const { fullname, username, email, password } = req.body
  const hashedPassword = bcrypt.hashSync(password, 8)

  db.users.create(fullname, username, email, hashedPassword)
    .then(() => {
      db.users.getByUsername(username)
        .then((user) => {
          if (!user) return res.status(404).send(`[/register]: User not found`)
          const accessToken = jwt.sign({ id: user.id }, 'tannousMarc', { expiresIn: 600 })
          return res.status(200).send({ user, accessToken })
        })
        .catch((err) => res.status(500).send(`[/register]: Error getting user: ${err}`))
    })
    .catch((err) => res.status(500).send(`[/register]: Error registering user: ${err}`))
})

// login
router.post('/login', (req, res) => {
  const { username, password } = req.body

  db.users.getByUsername(username)
    .then((user) => {
      if (!user) return res.status(404).send(`[/login]: User not found`)
      const isPasswordIsValid = bcrypt.compareSync(password, user.password)
      if (!isPasswordIsValid) return res.status(401).send({ auth: false, accessToken: null })
      const accessToken = jwt.sign({ id: user.id }, 'tannousMarc', { expiresIn: 600 })
      return res.status(200).send({ user, accessToken })
    })
    .catch((err) => res.status(500).send(`[/login]: Error getting user: ${err}`))
})

module.exports = router
