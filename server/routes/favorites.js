/**
 * Controller for favorite routes.
 * Prefix: ???
 *
 * Routes available:
 * POST   /                  -> creates a new comment
 * PATCH  /:commentID        -> updates one comment
 * DELETE /:commentID/delete -> deletes one comment
 */

const express = require('express')
const router = express.Router({ mergeParams: true })

// middleware
router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

// db
const Database = require(`${__dirname}/../database/db`)
const db = new Database(`${__dirname}/../database/database`)

console.log(`Connected FAVORITES to Database.`)

/* ROUTES */

// create
router.post('/', (req, res) => {
  const { postID } = req.params
  const { username } = req.body

  db.favorites.create(postID, username)
    .then(() => res.status(200).send('[ROUTE]: Successfully created favorite'))
    .catch((err) => res.status(500).send(`[ROUTE]: Error creating comment: ${err}`))
})

// delete
router.delete('/:commentID/delete', (req, res) => {
  const { postID } = req.params
  const { username } = req.body

  db.favorites.destroy(postID, username)
    .then(() => res.status(200).send('[ROUTE]: Successfully deleted favorite'))
    .catch((err) => res.status(500).send(`[ROUTE]: Error deleting favorite: ${err}`))
})

module.exports = router
