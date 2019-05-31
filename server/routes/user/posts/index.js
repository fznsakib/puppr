// prefix: /user/:username/posts
const UserPostsRouter = require('express').Router({ mergeParams: true })

UserPostsRouter.get('/', require('./getAll'))

export default UserPostsRouter
