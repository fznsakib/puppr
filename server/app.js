"use strict";
const express = require('express');
const DB = require('./db');
const config = require('./config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const firebase = require('firebase');

const db = new DB("database")
const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Initialise Firebase
var config = {
  apiKey: "AIzaSyCZGF3FJ7noduTbOvpZ5Oq_tawuzai4_NU",
  authDomain: "puppr420.firebaseapp.com",
  storageBucket: "gs://puppr420.appspot.com",
};
firebase.initializeApp(config);

// CORS middleware
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.use(allowCrossDomain)

router.post('/register', function(req, res) {
    db.insertUser([
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.username,
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
            res.status(200).send({ auth: true, accessToken: accessToken, user: user });
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
        res.status(200).send({ auth: true, accessToken: accessToken, user: user });
    });
})



app.use(router)

let port = process.env.PORT || 3000;

let server = app.listen(port, function() {
    console.log('Express server listening on port ' + port)
});
