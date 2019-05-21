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

  // GETTERS //

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

  getLatestPostID (callback) {
    return this.db.get(
      `SELECT id from post ORDER BY id DESC limit 1`, (err, postID) => {
        callback(err, postID)
      })
  }

  // CREATE //

  createUser (user, callback) {
    console.log(`DB Update: Inserting user: ${user}`)
    return this.db.run(
      'INSERT INTO user (username,firstname,lastname,email,password) VALUES (?,?,?,?,?)',
      user, (err) => {
        callback(err)
      })
  }

  createPost (username, caption, callback) {
    console.log('DB Update: Inserting post')
    const initCount = 0
    return this.db.run(
      'INSERT INTO post (username,date,caption,likes,dislikes,favourites) VALUES (?,datetime("now"),?,?,?,?)',
      username, caption, initCount, initCount, initCount, (err) => {
        callback(err)
      })
  }

  createPostPicture (postID, imageURL, callback) {
    console.log('DB Update: Updating post with picture')
    return this.db.run(
      'UPDATE post SET postUrl = ? WHERE id = ?',
      imageURL, postID, (err) => {
        callback(err)
      })
  }

  createComment (username, postID, comment, callback) {
    console.log('DB Update: Uploading comment')
    return this.db.run(
      'INSERT INTO comment (username, post_id, body, date) VALUES (?,?,?,datetime("now"))',
      username, postID, comment, (err) => {
        callback(err)
      })
  }

  createFavourite (username, postID, callback) {
    console.log('DB Update: Inserting favourited post')
    return this.db.run(
      'INSERT INTO favourite (username, post_id) VALUES (?,?)',
      username, postID, (err) => {
        callback(err)
      })
  }

  createLike (username, postID, callback) {
    console.log('DB Update: Inserting like')
    return this.db.run(
      'INSERT INTO like (username, post_id) VALUES (?,?)',
      username, postID, (err) => {
        callback(err)
      })
  }

  createDislike (username, postID, callback) {
    console.log('DB Update: Inserting dislike')
    return this.db.run(
      'INSERT INTO dislike (username, post_id) VALUES (?,?)',
      username, postID, (err) => {
        callback(err)
      })
  }

  // UPDATE //

  updateProfilePicture (username, imageURL, callback) {
    console.log('DB Update: Updating profile picture')
    return this.db.run(
      'UPDATE user SET ppUrl = ? WHERE username = ?',
      imageURL, username, (err) => {
        callback(err)
      })
  }

  updateBio (username, bio, callback) {
    console.log('DB Update: Updating user bio')
    return this.db.run(
      'UPDATE user SET bio = ? WHERE username = ?',
      bio, username, (err) => {
        callback(err)
      })
  }

  updatePostCaption (postID, caption, callback) {
    console.log('DB Update: Updating post caption')
    return this.db.run(
      'UPDATE post SET caption = ? WHERE id = ?',
      caption, postID, (err) => {
        callback(err)
      })
  }

  // REMOVE //

  removePost (postID, callback) {
    console.log('DB Update: Deleting user post')
    return this.db.run(
      'DELETE FROM post WHERE id = ?',
      postID, (err) => {
        callback(err)
      })
  }

  removeFavourite (username, postID, callback) {
    console.log('DB Update: Deleting favourited post')
    return this.db.run(
      'DELETE FROM favorite WHERE username = ? AND post_id = ?',
      username, postID, (err) => {
        callback(err)
      })
  }

  removeLike (username, postID, callback) {
    console.log('DB Update: Deleting like')
    return this.db.run(
      'DELETE FROM like WHERE username = ? AND post_id = ?',
      username, postID, (err) => {
        callback(err)
      })
  }

  removeDislike (username, postID, callback) {
    console.log('DB Update: Deleting dislike')
    return this.db.run(
      'DELETE FROM dislike WHERE username = ? AND post_id = ?',
      username, postID, (err) => {
        callback(err)
      })
  }

  // IGNORE BELOW, D E P R E C A T E D
  // No of likes/dislikes don't need to be stored for each post as this can
  // be handled using SQL COUNT method. Keep here just to remind me that I
  // need to implement the get methods
  incrementLike (postID, callback) {
    console.log('DB Update: Adding post like')
    return this.db.run(
      'UPDATE post SET likes = likes + 1 WHERE id = ?',
      postID, (err) => {
        callback(err)
      })
  }

  decrementLike (postID, callback) {
    console.log('DB Update: Removing post like')
    return this.db.run(
      'UPDATE post SET likes = likes - 1 WHERE id = ?',
      postID, (err) => {
        callback(err)
      })
  }

  incrementDislike (postID, callback) {
    console.log('DB Update: Adding post dislike')
    return this.db.run(
      'UPDATE post SET dislikes = dislikes + 1 WHERE id = ?',
      postID, (err) => {
        callback(err)
      })
  }

  decrementDislike (postID, callback) {
    console.log('DB Update: Removing post dislike')
    return this.db.run(
      'UPDATE post SET dislikes = dislikes - 1 WHERE id = ?',
      postID, (err) => {
        callback(err)
      })
  }


}

module.exports = Db
