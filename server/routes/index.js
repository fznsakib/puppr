module.exports = (app) => {
  app.use('/', require('./auth'))
  app.use('/post', require('./post'))
  app.use('/user/:username', require('./user'))
}
