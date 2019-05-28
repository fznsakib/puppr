/**
 * Controller for profile routes.
 * Prefix:
 *
 * Routes available:
 * POST   /register                    -> creates on user
 * POST   /login                       -> logs in one user
 * GET    /user/:username/             -> gets one user's profile
 * GET    /user/:username/post         -> gets one user's posts
 * GET    /user/:username/favorites    -> gets one user's favorited posts
 * PATCH  /user/:username/bio/update   -> updates one user's bio
 * PATCH  /user/:username/image/update -> updates one user's profile picture
 * DELETE /user/:username/delete       -> deletes one user's profile
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

console.log(`Connected USERS to Database.`)

/* ROUTES */

// show (profile)
router.get('/', (req, res) => {
  const { username } = req.params

  db.users.getByUsername(username)
    .then((user) => {
      if (!user) return res.status(404).send(`[/user/:username]: No user found`)
      return res.status(200).send(user)
    })
    .catch((err) => res.status(500).send(`[/user/:username]: Error getting user: ${err}`))
})

// show (posts)
router.get('/posts', (req, res) => {
  const { username } = req.params

  db.users.getPosts(username)
    .then((posts) => {
      if (!posts) return res.status(404).send(`[/user/:username/posts]: No posts found`)
      return res.status(200).send(posts)
    })
    .catch((err) => res.status(500).send(`[/user/:username/posts]: Error getting posts: ${err}`))
})

// show (favorites)
router.get('/favorites', (req, res) => {
  const { username } = req.params

  db.users.getFavorites(username)
    .then((favorites) => {
      if (!favorites) return res.status(404).send(`[/user/:username/favorites]: No favorites found`)
      return res.status(500).send(favorites)
    })
    .catch((err) => res.status(500).send(`[/user/:username/favorites]: Error getting favorites: ${err}`))
})

// update (bio)
router.patch('/bio/update', (req, res) => {
  const { username } = req.params
  const { newBio } = req.body

  db.users.updateBio(newBio, username)
    .then(() => res.status(200).send('[/user/:username/bio/update]: Successfully updated bio'))
    .catch((err) => res.status(500).send(`[/user/:username/bio/update]: Error updating bio: ${err}`))
})

// update (profile picture)
router.patch('/image/update', (req, res) => {
  const { username } = req.params
  const { newURL } = req.body

  db.users.updateProfilePictureURL(newURL, username)
    .then(() => res.status(200).send('[/user/:username/image/update] Successfully updated profilePictureURL'))
    .catch((err) => res.status(500).send(`[/user/:username/image/update]: Error updating profilePictureURL: ${err}`))
})

// delete
router.delete('/delete', (req, res) => {
  const { username } = req.params

  db.users.destroy(username)
    .then(() => res.status(200).send(`[/user/:username/delete]: Successfully deleted user: ${username}`))
    .catch((err) => res.status(500).send(`[/user/:username/delete]: Error deleting user: ${err}`))
})

module.exports = router
