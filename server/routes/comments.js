/**
 * Controller for comments routes.
 * Prefix: /posts/:postID/comments/
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

console.log(`Connected COMMENTS to Database.`)

/* ROUTES */

// create
router.post('/', (req, res) => {
  const { postID } = req.params
  const { body, username } = req.body

  db.comments.create(body, postID, username)
    .then(() => res.status(200).send('[/posts/:postID/comments]: Successfully created comment'))
    .catch((err) => res.status(500).send(`[/posts/:postID/comments]: Error creating comment: ${err}`))
})

// update
router.patch('/:commentID', (req, res) => {
  const { commentID } = req.params
  const { newCommentBody } = req.body

  db.comments.update(newCommentBody, commentID)
    .then(() => res.status(200).send(`[/posts/:postID/comments/:commentID]: Successfully updated comment`))
    .catch((err) => res.status(500).send(`[/posts/:postID/comments/:commentID]: Error updating comment: ${err}`))
})

// delete
router.delete('/:commentID/delete', (req, res) => {
  const { commentID } = req.params

  db.comments.destroy(commentID)
    .then(() => res.status(200).send(`[/posts/:postID/comments/:commentID/delete]: Successfully deleted comment`))
    .catch((err) => res.status(500).send(`[/posts/:postID/comments/:commentID/delete]: Error deleting comment: ${err}`))
})

module.exports = router
