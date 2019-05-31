// prefix: /post
const PostRouter = require('express').Router()

/* Subroute Handlers */
PostRouter.use('/:postID/comments', require('./comments'))
PostRouter.use('/:postID/favorites', require('./favorites'))

/* Route Handlers */
// post
PostRouter.post('/', require('./create'))

// get
PostRouter.get('/:postID', require('./getOne'))
PostRouter.get('/', require('./getAll'))

// patch
PostRouter.patch('/:postID/caption', require('./updateCaption'))
PostRouter.patch('/:postID/image', require('./updateImage'))

// delete
PostRouter.delete('/:postID/delete', require('./delete'))

module.exports = PostRouter
