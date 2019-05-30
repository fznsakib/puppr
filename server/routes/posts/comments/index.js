// prefix: /:postID/comments
const CommentRouter = require('express').Router({ mergeParams: true })

/* Route Handlers */
CommentRouter.post('/', require('./create'))

CommentRouter.get('/:commentID', require('./getOne'))
CommentRouter.get('/', require('./getAllByPostID'))

CommentRouter.patch('/:commentID', require('./update'))

CommentRouter.delete('/:commentID/delete', require('./delete'))

module.exports = CommentRouter
