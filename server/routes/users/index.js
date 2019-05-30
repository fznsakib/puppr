// prefix: /users
const UserRouter = require('express').Router()

/* Subroute Handlers */
// UserRouter.use('/subroute', require('./subroute'))

/* Route Handlers */
UserRouter.get('/:username', require('./getOne'))
UserRouter.get('/:username/posts', require('./getAllPosts'))
UserRouter.get('/:username/favorites', require('./getAllFavorites'))

UserRouter.patch('/:username/bio', require('./updateBio'))
UserRouter.patch('/:username/image', require('./updateImage'))

UserRouter.delete('/:username/delete', require('./delete'))

module.exports = UserRouter
