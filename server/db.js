'use strict'
const sqlite3 = require('sqlite3').verbose()

class Db {
  constructor (file) {
    this.db = new sqlite3.Database(file)
    this.createTable()
  }

  createTable () {
    const createUser = `
      CREATE TABLE IF NOT EXISTS user (
        username text PRIMARY KEY UNIQUE,
        firstname text,
        lastname text,
        email text UNIQUE,
        password text,
        bio text,
        ppUrl text,
        question text,
        answer text
      )`
    const createPost = `
      CREATE TABLE IF NOT EXISTS post (
        id integer PRIMARY KEY AUTOINCREMENT,
        username text,
        date text,
        postUrl text,
        caption text,
        likes integer,
        dislikes integer,
        favourites integer,
        CONSTRAINT fk_users FOREIGN KEY (username) REFERENCES user(username)
      )`
    const createComment = `
      CREATE TABLE IF NOT EXISTS comment (
        id integer PRIMARY KEY AUTOINCREMENT,
        username text,
        post_id integer,
        body text,
        date text,
        CONSTRAINT fk_users FOREIGN KEY (username) REFERENCES user(username),
        CONSTRAINT fk_posts FOREIGN KEY (post_id) REFERENCES post(id)
      )`
    const createFavourite = `
      CREATE TABLE IF NOT EXISTS favourite (
        id integer PRIMARY KEY AUTOINCREMENT,
        username text,
        post_id integer,
        CONSTRAINT fk_users FOREIGN KEY (username) REFERENCES user(username),
        CONSTRAINT fk_posts FOREIGN KEY (post_id) REFERENCES post(id)
      )`
    const createLike = `
      CREATE TABLE IF NOT EXISTS like (
        id integer PRIMARY KEY AUTOINCREMENT,
        username text,
        post_id integer,
        CONSTRAINT fk_users FOREIGN KEY (username) REFERENCES user(username),
        CONSTRAINT fk_posts FOREIGN KEY (post_id) REFERENCES post(id)
      )`
    const createDislike = `
      CREATE TABLE IF NOT EXISTS dislike (
        id integer PRIMARY KEY AUTOINCREMENT,
        username text,
        post_id integer,
        CONSTRAINT fk_users FOREIGN KEY (username) REFERENCES user(username),
        CONSTRAINT fk_posts FOREIGN KEY (post_id) REFERENCES post(id)
      )`
    this.db.run(createUser)
    this.db.run(createPost)
    this.db.run(createComment)
    this.db.run(createFavourite)
    this.db.run(createLike)
    return this.db.run(createDislike)
  }

  selectUserByEmail (email, callback) {
    return this.db.get(
      `SELECT * FROM user WHERE email = ?`, [email], function (err, row) {
        callback(err, row)
      })
  }

  selectAll (callback) {
    return this.db.all(`SELECT * FROM user`, function (err, rows) {
      callback(err, rows)
    })
  }

  insertUser (user, callback) {
    console.log(`Insert user: ${user}`)
    return this.db.run(
      'INSERT INTO user (username,firstname,lastname,email,password) VALUES (?,?,?,?,?)',
      user, (err) => {
        callback(err)
      })
  }

  insertPost (username, caption, callback) {
    console.log('Inserting post...')
    const initCount = 0
    return this.db.run(
      'INSERT INTO post (username,date,caption,likes,dislikes,favourites) VALUES (?,datetime("now"),?,?,?,?)',
      username, caption, initCount, initCount, initCount, (err) => {
        callback(err)
      })
  }

  getLatestPostID (callback) {
    return this.db.get(
      `SELECT id from post ORDER BY id DESC limit 1`, function (err, postID) {
        callback(err, postID)
      })
  }

  updatePostPicture (postID, imageURL, callback) {
    console.log('DB Update: post picture...')
    return this.db.run(
      'UPDATE post SET postUrl = ? WHERE id = ?',
      imageURL, postID, (err) => {
        callback(err)
      })
  }

  updateProfilePicture (username, imageURL, callback) {
    console.log('DB Update: profile picture...')
    return this.db.run(
      'UPDATE user SET ppUrl = ? WHERE username = ?',
      imageURL, username, (err) => {
        callback(err)
      })
  }

  uploadComment (postID, comment, username, callback) {
    console.log('DB Update: comment...')
    return this.db.run(
      'INSERT INTO comment (username, post_id, body, date) VALUES (?,?,?,datetime("now"))',
      username, postID, comment, (err) => {
        callback(err)
      })
  }

  insertFavourite (postID, username, callback) {
    console.log('DB Update: Inserting favourited post...')
    return this.db.run(
      'INSERT INTO favourite (username, post_id) VALUES (?,?)',
      username, postID, (err) => {
        callback(err)
      })
  }

  deleteFavourite (postID, username, callback) {
    console.log('DB Update: Deleting favourited post...')
    return this.db.run(
      'DELETE FROM favorite WHERE username = ? AND post_id = ?',
      username, postID, (err) => {
        callback(err)
      })
  }

  insertLike (postID, username, callback) {
    console.log('DB Update: Inserting like...')
    return this.db.run(
      'INSERT INTO like (username, post_id) VALUES (?,?)',
      username, postID, (err) => {
        callback(err)
      })
  }

  deleteLike (postID, username, callback) {
    console.log('DB Update: Deleting like...')
    return this.db.run(
      'DELETE FROM like WHERE username = ? AND post_id = ?',
      username, postID, (err) => {
        callback(err)
      })
  }

  addLike (postID, callback) {
    console.log('DB Update: Adding post like...')
    return this.db.run(
      'UPDATE post SET likes = likes + 1 WHERE id = ?',
      postID, (err) => {
        callback(err)
      })
  }

  removeLike (postID, callback) {
    console.log('DB Update: Removing post like...')
    return this.db.run(
      'UPDATE post SET likes = likes - 1 WHERE id = ?',
      postID, (err) => {
        callback(err)
      })
  }

  insertDislike (postID, username, callback) {
    console.log('DB Update: Inserting dislike...')
    return this.db.run(
      'INSERT INTO dislike (username, post_id) VALUES (?,?)',
      username, postID, (err) => {
        callback(err)
      })
  }

  deleteDislike (postID, username, callback) {
    console.log('DB Update: Deleting dislike...')
    return this.db.run(
      'DELETE FROM dislike WHERE username = ? AND post_id = ?',
      username, postID, (err) => {
        callback(err)
      })
  }

  addDislike (postID, callback) {
    console.log('DB Update: Adding post dislike...')
    return this.db.run(
      'UPDATE post SET dislikes = dislikes + 1 WHERE id = ?',
      postID, (err) => {
        callback(err)
      })
  }

  removeDislike (postID, callback) {
    console.log('DB Update: Removing post dislike...')
    return this.db.run(
      'UPDATE post SET dislikes = dislikes - 1 WHERE id = ?',
      postID, (err) => {
        callback(err)
      })
  }


}

module.exports = Db
