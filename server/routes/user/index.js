// prefix: /user/:username
const UserRouter = require('express').Router({ mergeParams: true })

/* Subroute Handlers */
UserRouter.use('/posts', require('./posts'))
UserRouter.use('/favorites', require('./favorites'))

/* Route Handlers */
// get
UserRouter.get('/', require('./getOne'))

// patch
UserRouter.patch('/bio', require('./updateBio'))
UserRouter.patch('/image', require('./updateImage'))

// delete
UserRouter.delete('/delete', require('./delete'))

module.exports = UserRouter
