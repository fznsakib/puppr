'use strict'
console.log(`Starting server...`)

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const firebase = require('firebase')
const firebaseAdmin = require('firebase-admin')

console.log(`Loaded dependencies...`)

// configure express
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(cors())
console.log(`Configured Express...`)

// configure routes
require('./routes')(app)
console.log(`Loaded routes...`)

// configure firebase
firebase.initializeApp({
  apiKey: 'AIzaSyC5SnkTNBFjGvnBa7YhWVEilOvcS5oA99Q',
  authDomain: 'puppr-8727d.firebaseapp.com',
  databaseURL: 'https://puppr-8727d.firebaseio.com',
  projectID: 'puppr-8727d',
  storageBucket: 'gs://puppr-8727d.appspot.com',
  messagingSenderID: '764093981772'
})

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(`${process.env.PWD}/functions/puppr-8727d-firebase-adminsdk-kfdzh-6324893b05.json`),
  storageBucket: 'puppr-8727d.appspot.com'
})
console.log(`Configured Firebase...`)

// eslint-disable-next-line
let server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server online.`)
})
