'use strict'
const sqlite3 = require('sqlite3').verbose()

class Db {
  constructor(file) {
    this.db = new sqlite3.Database(file)
    this.createTables()
  }

  createTables() {
    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        fullname          string,
        username          string PRIMARY KEY UNIQUE,
        email             string UNIQUE,
        password          string,
        bio               text,
        profilePictureUrl string
      )`
    const createPostTableQuery = `
      CREATE TABLE IF NOT EXISTS posts (
        id         integer PRIMARY KEY AUTOINCREMENT,
        imageUrl   string,
        caption    text,
        username   string,
        favorites  integer,
        date       datetime,
        CONSTRAINT users_fk FOREIGN KEY (username) REFERENCES user(username)
      )`
    const createCommentTableQuery = `
      CREATE TABLE IF NOT EXISTS comments (
        id integer PRIMARY KEY AUTOINCREMENT,
        postId     integer,
        body       text,
        username   string,
        date       datetime,
        CONSTRAINT users_fk FOREIGN KEY (username) REFERENCES user(username),
        CONSTRAINT posts_fk FOREIGN KEY (postId)   REFERENCES post(id)
      )`
    const createFavoriteTableQuery = `
      CREATE TABLE IF NOT EXISTS favorites (
        id         integer PRIMARY KEY AUTOINCREMENT,
        postId     integer,
        username   string,
        CONSTRAINT users_fk FOREIGN KEY (username) REFERENCES user(username),
        CONSTRAINT posts_fk FOREIGN KEY (postId)   REFERENCES post(id)
      )`

    this.db.run(createUserTableQuery)
    this.db.run(createPostTableQuery)
    this.db.run(createCommentTableQuery)
    this.db.run(createFavoriteTableQuery)
  }

  /* ***** */
  /* USERS */

  getAllUsers(callback) {
    const query = 'SELECT * FROM users'
    return this.db.get(query, (err, users) => {
      callback(err, users)
    })
  }

  getUserByEmail(email, callback) {
    const query = 'SELECT * FROM users WHERE email = ?'
    return this.db.get(query, email, (err, user) => {
      callback(err, user)
    })
  }

  getUserByUsername(username, callback) {
    const query = 'SELECT * FROM users WHERE username = ?'
    return this.db.get(query, username, (err, user) => {
      callback(err, user)
    })
  }

  createUser(user, callback) {
    const query = 'INSERT INTO users (fullname, username, email, password, bio, profilePictureUrl) VALUES (?,?,?,?,?,?))'
    return this.db.run(query, user, (err) => {
      callback(err)
    })
  }

  /* ***** */
  /* POSTS */

  getAllPosts(callback) {
    const query = 'SELECT * FROM posts'
    return this.db.all(query, (err, posts) => {
      callback(err, posts)
    })
  }

  getPostById(id, callback) {
    const query = 'SELECT * FROM posts WHERE id = ?'
    return this.db.get(query, id, (err, post) => {
      callback(err, post)
    })
  }

  getPostsByUsername(username, callback) {
    const query = 'SELECT * FROM posts WHERE username = ?'
    return this.db.all(query, username, (err, post) => {
      callback(err, post)
    })
  }

  getLastPostId(callback) {
    const query = 'SELECT id FROM posts ORDER BY id DESC limit 1'
    return this.db.get(query, (err, postId) => {
      callback(err, postId)
    })
  }

  getPostFavorites(postId, callback) {
    // select all favorites with post Id
    // return this number
  }

  /* Creation methods */

  newPost(post, callback) {
    const { imageUrl, caption, username } = post
    const query = 'INSERT INTO posts (imageUrl, caption, username, favorites, date) VALUES (?,?,?,?,datetime("now"))'
    return this.db.run(query, imageUrl, caption, username, 0, (err) => {
      callback(err)
    })
  }

  newComment(comment, callback) {
    const { postId, body, username } = comment
    const query = 'INSERT INTO comments (postId, body, username, date) VALUES (?,?,?,datetime("now"))'
    return this.db.run(query, postId, body, username, (err) => {
      callback(err)
    })
  }

  newFavorite({ postId, username }, callback) {
    const query = 'INSERT INTO favorites (postId, username) VALUES (?,?)'
    return this.db.run(query, postId, username, (err) => {
      callback(err)
    })
  }

  /* Update methods */
  updateProfilePicture({ newProfilePictureUrl, username }, callback) {
    const query = 'UPDATE users SET profilePictureUrl = ? WHERE username = ?'
    return this.db.run(query, newProfilePictureUrl, username, (err) => {
      callback(err)
    })
  }

  updateBio({ bio, username }, callback) {
    const query = 'UPDATE users SET bio = ? WHERE username = ?'
    return this.db.run(query, bio, username, (err) => {
      callback(err)
    })
  }

/* // REMOVE //

  removeFavourite(username, postID, callback) {
    console.log('DB Update: Deleting favourited post')
    return this.db.run(
      'DELETE FROM favorite WHERE username = ? AND post_id = ?',
      username, postID, (err) => {
        callback(err)
      })
  }

  removeLike(username, postID, callback) {
    console.log('DB Update: Deleting like')
    return this.db.run(
      'DELETE FROM like WHERE username = ? AND post_id = ?',
      username, postID, (err) => {
        callback(err)
      })
  }

  removeDislike(username, postID, callback) {
    console.log('DB Update: Deleting dislike')
    return this.db.run(
      'DELETE FROM dislike WHERE username = ? AND post_id = ?',
      username, postID, (err) => {
        callback(err)
      })
  }

   IGNORE BELOW, D E P R E C A T E D
     No of likes/dislikes don't need to be stored for each post as this can
     be handled using SQL COUNT method. Keep here just to remind me that I
     need to implement the get methods
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
  } */
}

module.exports = Db
