// prefix: /user/:username/favorites
const UserFavoriteRouter = require('express').Router({ mergeParams: true })

UserFavoriteRouter.get('/', require('./getAll'))

module.exports = UserFavoriteRouter
