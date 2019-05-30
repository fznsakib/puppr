// prefix: /posts
const PostRouter = require('express').Router()

/* Subroute Handlers */
PostRouter.use('/:postID/comments', require('./comments'))
PostRouter.use('/:postID/favorites', require('./favorites'))

/* Route Handlers */
PostRouter.post('/', require('./create'))

PostRouter.get('/:postID', require('./getOne'))
PostRouter.get('/', require('./getAll'))

PostRouter.patch('/:postID/caption', require('./updateCaption'))
PostRouter.patch('/:postID/image', require('./updateImage'))

PostRouter.delete('/:postID/delete', require('./delete'))

module.exports = PostRouter
