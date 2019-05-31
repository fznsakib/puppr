// prefix: /user/:username/favorites
const UserFavoritesRouter = require('express').Router({ mergeParams: true })

UserFavoritesRouter.get('/', require('./getAll'))

export default UserFavoritesRouter
