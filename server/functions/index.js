const functions = require('firebase-functions');
const os = require('os')
const path = require('path')
const cors = require('cors')({ origin: true })
const Busboy = require('busboy')
const fs = require('fs')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.uploadImage = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    return res.status(500).json({
      message: 'Error 500: POST method required'
    });
  }
  res.status(200).json({
    message: 'It worked!'
  })
});
