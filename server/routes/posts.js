/**
 * Controller for post routes.
 * Prefix: /posts
 *
 * Routes available:
 * POST   /                       -> creates one new post
 * GET    /:postID                -> gets one post
 * GET    /                       -> gets all posts
 * GET    /:postID/favorites      -> gets number of favorites for one post
 * GET    /:postID/comments       -> gets comments for one post
 * PATCH  /:postID/caption/update -> updates one post's caption
 * PATCH  /:postID/image/update   -> updates one post's image
 * DELETE /delete                 -> deletes one post
 */

const express = require('express')
const router = express.Router({ mergeParams: true })
const Database = require(`${__dirname}/../database/db`)
const db = new Database(`${__dirname}/../database/database`)
const { Storage } = require('@google-cloud/storage')

console.log(`Connected POSTS to Database.`)

// init middleware
router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

const storage = new Storage({
  projectID: 'puppr-8727d',
  keyFilename: 'functions/puppr-8727d-firebase-adminsdk-kfdzh-6324893b05.json'
})

const bucket = storage.bucket('puppr-8727d.appspot.com')

// create
router.post('/', (req, res) => {
  const { imageName, caption, username } = req.body
  const image = bucket.file(imageName)

  image.getSignedUrl({ action: 'read', expires: '12-12-2500' })
    .then(([imageURL]) => {
      db.posts.create([imageURL, caption, username, 0])
        .then(() => res.status(200).send('[/posts]: Successfully created post'))
        .catch((err) => res.status(500).send(`[/posts]: Error creating post: ${err}`))
    })
    .catch((err) => res.status(500).send(`[/posts]: Error getting imageURL: ${err}`))
})

// show
router.get('/:postID', (req, res) => {
  const { postID } = req.params

  db.posts.getByID(postID)
    .then((post) => {
      if (!post) return res.status(404).send(`[/posts/:postID]: No post found`)
      else res.status(200).send(post)
    })
    .catch((err) => res.status(500).send(`[/posts/:postID]: Error getting post: ${err}`))
})

// index
router.get('/', (req, res) => {
  db.posts.getAll()
    .then((posts) => {
      if (!posts) res.status(404).send(`[/posts]: No posts found.`)
      else res.status(200).send(posts)
    })
    .catch((err) => res.status(500).send(`[/posts]: Error getting posts: ${err}`))
})

// favorites
router.get('/:postID/favorites', (req, res) => {
  const { postID } = req.params

  db.posts.getNumFavorites(postID)
    .then((numFavorites) => res.status(200).send(numFavorites))
    .catch((err) => res.status(500).send(`[/posts/:postID/favorites]: Error getting favorites: ${err}`))
})

// comments
router.get('/:postID/comments', (req, res) => {
  const { postID } = req.params

  db.posts.getComments(postID)
    .then((comments) => {
      if (!comments) res.status(404).send(`[/posts/:postID/comments]: No comments found.`)
      else res.status(200).send(comments)
    })
    .catch((err) => res.status(500).send(`[/posts/:postID/comments]: Error getting comments: ${err}`))
})

// update (caption)
router.patch('/:postID/caption/update', (req, res) => {
  const { postID } = req.params
  const { newCaption } = req.body

  db.posts.updateCaption(postID, newCaption)
    .then(() => res.status(200).send(`[/posts/:postID/caption/update]: Successfully updated caption`))
    .catch((err) => res.status(500).send(`[/posts/:postID/caption/update]: Error updating caption: ${err}`))
})

// update (image)
router.patch('/:postID/image/update', (req, res) => {
  const { postID } = req.params
  const { newURL } = req.body

  db.post.updateImage(postID, newURL)
    .then(() => res.status(200).send(`[/posts/:postID/image/update]: Successfully updated image`))
    .catch((err) => res.status(500).send(`[/posts/:postID/image/update]: Error updating image: ${err}`))
})

// delete
router.delete('/:postID/delete', (req, res) => {
  const { postID } = req.params

  db.posts.destroy(postID)
    .then(() => res.status(200).send(`[/posts/:postID/delete]: Successfully deleted post`))
    .catch((err) => res.status(500).send(`[/posts/:postID/delete]: Error deleting post: ${err}`))
})

module.exports = router
