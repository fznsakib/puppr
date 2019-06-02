// prefix: /user/:username/posts
const UserPostRouter = require('express').Router({ mergeParams: true })

UserPostRouter.get('/', require('./getAll'))

module.exports = UserPostRouter
