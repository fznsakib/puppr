'use strict'

console.log(`Starting server...`)

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const firebase = require('firebase')
const firebaseAdmin = require('firebase-admin')

console.log(`Loaded dependencies.`)

// configure express
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

console.log(`Configured express.`)

app.use('/posts', require('./routes/posts'))
app.use('/posts/:postID/comments', require('./routes/comments'))
app.use('/user/:username', require('./routes/users'))
app.use(require('./routes/favorites'))
app.use(require('./routes/auth'))

console.log(`Loaded routes.`)

// configure firebase
const firebaseConfig = {
  apiKey: 'AIzaSyC5SnkTNBFjGvnBa7YhWVEilOvcS5oA99Q',
  authDomain: 'puppr-8727d.firebaseapp.com',
  databaseURL: 'https://puppr-8727d.firebaseio.com',
  projectID: 'puppr-8727d',
  storageBucket: 'gs://puppr-8727d.appspot.com',
  messagingSenderID: '764093981772'
}

firebase.initializeApp(firebaseConfig)

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert('functions/puppr-8727d-firebase-adminsdk-kfdzh-6324893b05.json'),
  storageBucket: 'puppr-8727d.appspot.com'
})

console.log(`Configured Firebase.`)

// eslint-disable-next-line
let server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server online.')
})
