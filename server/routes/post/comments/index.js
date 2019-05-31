// prefix: /post/:postID/comments
const PostCommentRouter = require('express').Router({ mergeParams: true })

/* Route Handlers */
PostCommentRouter.post('/', require('./create'))
PostCommentRouter.get('/', require('./getAll'))
PostCommentRouter.patch('/:commentID', require('./update'))
PostCommentRouter.delete('/:commentID/delete', require('./delete'))

module.exports = PostCommentRouter
