module.exports = (app) => {
  app.use('/', require('./auth'))
  app.use('/posts', require('./posts'))
  app.use('/users', require('./users'))
}
