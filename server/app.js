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
// const serviceAccount = require('/functions/puppr-8727d-firebase-adminsdk-kfdzh-6324893b05.json')

const db = new DB('database')
const app = express()
const router = express.Router()

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

// Initialize Firebase
var firebaseConfig = {
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

// var bucket = admin.storage().bucket()

// CORS middleware
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
}

app.use(allowCrossDomain)

const axiosConfig = {
  headers: {
    'Content-Type': 'application/jsoncharset=UTF-8',
    'Access-Control-Allow-Origin': '*'
  }
}

router.post('/register', function (req, res) {
  db.insertUser([
    req.body.username,
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    bcrypt.hashSync(req.body.password, 8)
  ],
  function (err) {
    if (err) {
      return res.status(500).send('There was a problem registering the user.')
    }
    db.selectUserByEmail(req.body.email, (err, user) => {
      if (err) {
        return res.status(500).send('There was a problem getting user')
      }
      let accessToken = jwt.sign({ id: user.id }, config.secret, { expiresIn: 600 }) // expires in 24 hours
      res.status(200).send({ auth: true, accessToken, user })
    })
  })
})

router.post('/login', (req, res) => {
  db.selectUserByEmail(req.body.email, (err, user) => {
    if (err) return res.status(500).send('Error on the server.')
    if (!user) return res.status(404).send('No user found.')
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordIsValid) return res.status(401).send({ auth: false, accessToken: null })
    let accessToken = jwt.sign({ id: user.id }, config.secret, { expiresIn: 600 }) // expires in 24 hours
    res.status(200).send({ auth: true, accessToken, user })
  })
})

router.post('/profile/picture/edit', (req, res) => {

  // Specify image to look at
  const imageName = `pp-${req.body.username}.jpg`
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

router.post('/post/create', (req, res) => {
  db.insertPost( req.body.username, req.body.caption, (err) => {
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

router.post('/post/success', (req, res) => {
  return res.status(200)
})

router.post('/postpicture/create', (req, res) => {

  // Specify image to look at
  const imageName = `post-${req.body.postID}.jpg`
  const image = bucket.file(imageName)

  // Get image URL
  return image.getSignedUrl({
    action: 'read',
    expires: '03-09-2491'
  }).then(signedUrls => {
    const imageURL = signedUrls[0]

    // Update database with image URL
    db.updatePostPicture(req.body.postID, imageURL, (err) => {
      if (err) return res.status(500).send('Error updating post picture URL on database')
    })

    res.status(200).send()
  })
})

router.post('/uploadComment', (req, res) => {
  // Insert user's comment into database
  db.uploadComment(req.body.postID, req.body.comment, req.body.username, (err) => {
    if (err) return res.status(500).send('Error uploading comment')
  })
  res.status(200).send()
})

router.post('/updateBio', (req, res) => {
  // Update user's bio in database
  db.updateBio(req.body.bio, req.body.username, (err) => {
    if (err) return res.status(500).send('Error updating user bio')
  })
  res.status(200).send()
})

router.post('/addFavourite', (req, res) => {
  // Insert user's favourited post into database
  db.insertFavourite(req.body.postID, req.body.username, (err) => {
    if (err) return res.status(500).send('Error inserting favourited post')
  })
  res.status(200).send()
})

router.post('/removeFavourite', (req, res) => {
  // Delete user's favourited post from database
  db.deleteFavourite(req.body.postID, req.body.username, (err) => {
    if (err) return res.status(500).send('Error deleting favourited post')
  })
  res.status(200).send()
})


router.post('/addLike', (req, res) => {
  // Insert like
  db.insertLike(req.body.postID, req.body.username, (err) => {
    if (err) return res.status(500).send('Error inserting like')
  })
  // Update post stats
  db.addLike(req.body.postID, (err) => {
    if (err) return res.status(500).send('Error incrementing post likes')
  })
  res.status(200).send()
})

router.post('/removeLike', (req, res) => {
  // Delete like
  db.deleteLike(req.body.postID, req.body.username, (err) => {
    if (err) return res.status(500).send('Error deleting like')
  })
  // Update post stats
  db.removeLike(req.body.postID, (err) => {
    if (err) return res.status(500).send('Error decrementing post likes')
  })
  res.status(200).send()
})

router.post('/addDislike', (req, res) => {
  // Insert dislike
  db.insertDislike(req.body.postID, req.body.username, (err) => {
    if (err) return res.status(500).send('Error inserting dislike')
  })
  // Update post stats
  db.addDislike(req.body.postID, (err) => {
    if (err) return res.status(500).send('Error incrementing post dislikes')
  })
  res.status(200).send()
})

router.post('/removeDislike', (req, res) => {
  // Delete like
  db.deleteDislike(req.body.postID, req.body.username, (err) => {
    if (err) return res.status(500).send('Error deleting dislike')
  })
  // Update post stats
  db.removeDislike(req.body.postID, (err) => {
    if (err) return res.status(500).send('Error decrementing post dislikes')
  })
  res.status(200).send()
})


app.use(router)

let port = process.env.PORT || 3000

// eslint-disable-next-line
let server = app.listen(port, function () {
  console.log('Express server listening on port ' + port)
})
