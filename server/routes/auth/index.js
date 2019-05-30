const AuthRouter = require('express').Router()

/* Route Handlers */
AuthRouter.post('/register', require('./register'))
AuthRouter.post('/login', require('./login'))

module.exports = AuthRouter
