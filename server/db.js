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
        username integer,
        post_id integer,
        body text,
        date text,
        CONSTRAINT fk_users FOREIGN KEY (username) REFERENCES user(username),
        CONSTRAINT fk_posts FOREIGN KEY (post_id) REFERENCES post(id)
      )`
    this.db.run(createUser)
    this.db.run(createPost)
    return this.db.run(createComment)
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
    console.log('Updating post picture...')
    return this.db.run(
      'UPDATE post SET postUrl = ? WHERE id = ?',
      imageURL, postID, (err) => {
        callback(err)
      })
  }

  updateProfilePicture (username, imageURL, callback) {
    console.log('Updating database...')
    return this.db.run(
      'UPDATE user SET ppUrl = ? WHERE username = ?',
      imageURL, username, (err) => {
        callback(err)
      })
  }


}

module.exports = Db
