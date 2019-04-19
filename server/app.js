"use strict";

const express = require('express');
const DB = require('./db');
const config = require('./config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const axios = require('axios');
const {Storage} = require('@google-cloud/storage');
const firebase = require('firebase');
const admin = require("firebase-admin");
// const serviceAccount = require("/functions/puppr-8727d-firebase-adminsdk-kfdzh-6324893b05.json");

const db = new DB("database")
const app = express();
const router = express.Router();


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));


// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyC5SnkTNBFjGvnBa7YhWVEilOvcS5oA99Q",
    authDomain: "puppr-8727d.firebaseapp.com",
    databaseURL: "https://puppr-8727d.firebaseio.com",
    projectId: "puppr-8727d",
    storageBucket: "gs://puppr-8727d.appspot.com",
    messagingSenderId: "764093981772"
    };

firebase.initializeApp(firebaseConfig);


const storage = new Storage({
  projectId: 'puppr-8727d',
  keyFilename: 'functions/puppr-8727d-firebase-adminsdk-kfdzh-6324893b05.json'
});

const bucket = storage.bucket('puppr-8727d.appspot.com')


admin.initializeApp({
    credential: admin.credential.cert("functions/puppr-8727d-firebase-adminsdk-kfdzh-6324893b05.json"),
    storageBucket: "puppr-8727d.appspot.com"
});

// var bucket = admin.storage().bucket();


// CORS middleware
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.use(allowCrossDomain)

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
};


router.post('/register', function(req, res) {
    db.insertUser([
        req.body.username,
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8)
    ],
    function (err) {
        if (err) {
            return res.status(500).send("There was a problem registering the user.")
        }
        db.selectUserByEmail(req.body.email, (err,user) => {
            if (err) {
                return res.status(500).send("There was a problem getting user")
            }
            let accessToken = jwt.sign({ id: user.id }, config.secret, { expiresIn: 600 }); // expires in 24 hours
            res.status(200).send({ auth: true, accessToken, user });
        });
    });
});

router.post('/login', (req, res) => {
    db.selectUserByEmail(req.body.email, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, accessToken: null });
        let accessToken = jwt.sign({ id: user.id }, config.secret, { expiresIn: 600 }); // expires in 24 hours
        res.status(200).send({ auth: true, accessToken, user });
    });
})

router.post('/updateProfilePicture', (req, res) => {
    console.log('at update route');

    // Specify image to look at
    const imageName = `pp-${req.body.username}.jpg`;
    const image = bucket.file(imageName);

    // Get image URL
    return image.getSignedUrl({
      action: 'read',
      expires: '03-09-2491'
    }).then(signedUrls => {
      const imageURL = signedUrls[0];

      // Update database with image URL
      db.updateProfilePicture(req.body.username, imageURL, (err) => {
        if (err) return res.status(500).send('Error retrieving profile picture URL');
      })
      res.status(200).send({ imageURL: imageURL });
    });
})




app.use(router)

let port = process.env.PORT || 3000;

let server = app.listen(port, function() {
    console.log('Express server listening on port ' + port)
});
