// prefix: /:postID/favorites
const FavoriteRouter = require('express').Router({ mergeParams: true })

/* Route Handlers */
FavoriteRouter.post('/', require('./create'))

FavoriteRouter.get('/', require('./getAllByPostID'))

FavoriteRouter.delete('/:favoriteID/delete', require('./delete'))

module.exports = FavoriteRouter
