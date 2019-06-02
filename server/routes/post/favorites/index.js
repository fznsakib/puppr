// prefix: /post/:postID/favorites
const PostFavoriteRouter = require('express').Router({ mergeParams: true })

/* Route Handlers */
PostFavoriteRouter.post('/', require('./create'))
PostFavoriteRouter.get('/', require('./getAll'))
PostFavoriteRouter.delete('/:favoriteID/delete', require('./delete'))

module.exports = PostFavoriteRouter
