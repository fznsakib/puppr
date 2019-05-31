// prefix: /post/:postID/favorites
const FavoriteRouter = require('express').Router({ mergeParams: true })

/* Route Handlers */
FavoriteRouter.post('/', require('./create'))
FavoriteRouter.get('/', require('./getAll'))
FavoriteRouter.delete('/:favoriteID/delete', require('./delete'))

module.exports = FavoriteRouter
