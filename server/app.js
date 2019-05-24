'use strict'

const express = require('express')
const DB = require('./db')
const config = require('./config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const { Storage } = require('@google-cloud/storage')
const firebase = require('firebase')
const admin = require('firebase-admin')

const db = new DB('database')
const app = express()
const router = express.Router()

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

// init firebase
let firebaseConfig = {
  apiKey: 'AIzaSyC5SnkTNBFjGvnBa7YhWVEilOvcS5oA99Q',
  authDomain: 'puppr-8727d.firebaseapp.com',
  databaseURL: 'https://puppr-8727d.firebaseio.com',
  projectId: 'puppr-8727d',
  storageBucket: 'gs://puppr-8727d.appspot.com',
  messagingSenderId: '764093981772'
}

firebase.initializeApp(firebaseConfig)

const storage = new Storage({
  projectId: 'puppr-8727d',
  keyFilename: 'functions/puppr-8727d-firebase-adminsdk-kfdzh-6324893b05.json'
})

const bucket = storage.bucket('puppr-8727d.appspot.com')

admin.initializeApp({
  credential: admin.credential.cert('functions/puppr-8727d-firebase-adminsdk-kfdzh-6324893b05.json'),
  storageBucket: 'puppr-8727d.appspot.com'
})

const middleware = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
}

app.use(middleware)

const axiosConfig = {
  headers: {
    'Content-Type': 'application/jsoncharset=UTF-8',
    'Access-Control-Allow-Origin': '*'
  }
}

/* AUTH */
router.post('/register', (req, res) => {
  const { fullname, username, email, password } = req.body

  db.createUser([fullname, username, email, bcrypt.hashSync(password, 8)], (err) => {
    if (err) return res.status(500).send('error registering user')

    db.getUserByEmail(email, (err, user) => {
      if (err) return res.status(500).send('/register: error selecting user from email')
      const accessToken = jwt.sign({ id: user.id }, config.secret, { expiresIn: 600 })
      return res.status(200).send({ auth: true, user, accessToken })
    })
  })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body

  db.getUserByEmail(email, (err, user) => {
    if (err) return res.status(500).send('/login: error selecting user from email')
    // if (!user) return res.status(404).send('/login: user not found')
    const isPasswordIsValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordIsValid) return res.status(401).send({ auth: false, accessToken: null })
    const accessToken = jwt.sign({ id: user.id }, config.secret, { expiresIn: 600 }) // expires in 24 hours
    return res.status(200).send({ auth: true, user, accessToken })
  })
})

/* ***** */
/* POSTS */

// index -> get all posts
router.get('/posts', (req, res) => {
  db.getPosts((err, posts) => {
    if (err) return res.status(500).send('/posts: Server error')
    if (!posts) return res.status(404).send('/posts: No posts found')
    return res.status(200).send(posts)
  })
})

// show -> get ONE post
router.get('/posts/:postId', (req, res) => {
  const { postId } = req.params
  db.getPostById(postId, (err, post) => {
    if (err) return res.status(500).send('/posts/postId: Server error')
    if (!post) return res.status(404).send('/posts/postId: No post found')
    return res.status(200).send(post)
  })
})

// create -> create ONE post
router.post('/posts', (req, res) => {
  const { imageName, ...rest } = req.body
  const image = bucket.file(imageName)

  return image.getSignedUrl({ action: 'read', expires: '12-12-2500' })
    .then(signedUrls => {
      const [imageUrl] = signedUrls
      db.newPost({ imageUrl, ...rest }, (err) => {
        if (err) return res.status(500).send('/posts: Server error')
        return res.status(200).send('succesfully created post')
      })
    })
})

// TODO
// update -> update ONE post
router.patch('/posts/:postId', (req, res) => {})

// TODO
// delete ->  delete ONE post
router.delete('/posts/:postId/delete', (req, res) => {})

/* ******** */
/* COMMENTS */

// index -> get all comments
router.get('/posts/:postId/comments', (req, res) => {
  const { postId } = req.params
  db.getComments(postId, (err, comments) => {
    if (err) return res.status(500).send('comments[index]: Server error')
    if (!comments) return res.status(404).send('comments[index]: No comments found')
    return res.status(200).send(comments)
  })
})

// show -> get one comment
router.get('/posts/:postId/comments/:commentId', (req, res) => {
  const { postId, commentId } = req.params
  db.getComment(postId, commentId, (err, comment) => {
    if (err) return res.status(500).send('comments[show]: Server error')
    if (!comment) return res.status(404).send('comments[show]: No comment found')
    return res.status(200).send(comment)
  })
})

// create -> create one new comment
router.post('/posts/:postId/comments', (req, res) => {
  const { postId } = req.params
  const { body, username } = req.body
  db.newComment({ postId, body, username }, (err) => {
    if (err) return res.status(500).send('comments[create]: Server error')
    return res.status(200).send('Comment created successfully.')
  })
})

// update
router.patch('/posts/:postId/comments', (req, res) => {

})

// delete
router.delete('/posts/:postId/comments/delete', (req, res) => {

})



// CREATE //

/* router.post('/posts/create', (req, res) => {
  db.createPost( req.body.username, req.body.caption, (err) => {
    if (err) {
      return res.status(500).send('There was a problem creating the post.')
    }
    db.getLatestPostID((err, postID) => {
      if (err) {
        return res.status(500).send('There was a problem getting the latest post.')
      }
      if (!postID) {
        return res.status(500).send('No post found.')
      }
      res.status(200).send({ postID })
    })
  })
})

router.post('/posts/:postID/picture/create', (req, res) => {
  // Specify image to look at
  const imageName = `post-${req.params.postID}.jpg`
  const image = bucket.file(imageName)

  // Get image URL
  return image.getSignedUrl({
    action: 'read',
    expires: '03-09-2491'
  }).then(signedUrls => {
    const imageURL = signedUrls[0]

    // Update database with image URL
    db.createPostPicture(req.params.postID, imageURL, (err) => {
      if (err) return res.status(500).send('Error updating post picture URL on database')
    })

    res.status(200).send()
  })
})

router.post('/posts/:postID/comment/create', (req, res) => {
  // Insert user's comment into database
  db.createComment(req.body.username, req.params.postID, req.body.comment, (err) => {
    if (err) return res.status(500).send('Error uploading comment')
  })
  res.status(200).send()
})

router.post('/favourites/create', (req, res) => {
  // Insert user's favourited post into database
  db.createFavourite(req.query.username, req.query.postID, (err) => {
    if (err) return res.status(500).send('Error inserting favourited post')
  })
  res.status(200).send()
})

router.post('/likes/create', (req, res) => {
  // Insert like
  db.createLike(req.query.username, req.query.postID, (err) => {
    if (err) return res.status(500).send('Error inserting like')
  })
  // Update post stats
  db.incrementLike(req.body.postID, (err) => {
    if (err) return res.status(500).send('Error incrementing post likes')
  })
  res.status(200).send()
})

router.post('/dislikes/create', (req, res) => {
  // Insert dislike
  db.createDislike(req.query.postID, req.query.username, (err) => {
    if (err) return res.status(500).send('Error inserting dislike')
  })
  // Update post stats
  db.incrementDislike(req.query.postID, (err) => {
    if (err) return res.status(500).send('Error incrementing post dislikes')
  })
  res.status(200).send()
})

// UPDATE //

router.post('/users/:username/picture/update', (req, res) => {
  // Specify image to look at
  const imageName = `pp-${req.params.username}.jpg`
  const image = bucket.file(imageName)

  // Get image URL
  return image.getSignedUrl({
    action: 'read',
    expires: '03-09-2491'
  }).then(signedUrls => {
    const imageURL = signedUrls[0]

    // Update database with image URL
    db.updateProfilePicture(req.body.username, imageURL, (err) => {
      if (err) return res.status(500).send('Error updating profile picture URL on database')
    })
    res.status(200).send({ imageURL: imageURL })
  })
})

router.post('/users/:username/bio/update', (req, res) => {
  // Update user's bio in database
  db.updateBio(req.body.username, req.body.bio, (err) => {
    if (err) return res.status(500).send('Error updating user bio')
  })
  res.status(200).send()
}) */

app.use(router)

// eslint-disable-next-line
let server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server online.')
})
