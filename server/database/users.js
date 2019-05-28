class UserRepo {
  constructor(DAO) {
    this.DAO = DAO
  }

  createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
      fullname          string,
      username          string PRIMARY KEY UNIQUE,
      email             string UNIQUE,
      password          text,
      bio               text,
      profilePictureURL string)`
    return this.DAO.run(query)
  }

  create(fullname, username, email, hashedPassword) {
    let profilePictureURL = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-dog-sticking-out-tongue-against-blue-royalty-free-image-888244458-1548966956.jpg'
    const query = `INSERT INTO users (fullname, username, email, password, profilePictureURL) VALUES (?,?,?,?,?)`
    return this.DAO.run(query, [fullname, username, email, hashedPassword, profilePictureURL])
  }

  updateBio(newBio, username) {
    const query = 'UPDATE users SET bio = ? WHERE username = ?'
    return this.DAO.run(query, [newBio, username])
  }

  updateProfilePictureURL(newURL, username) {
    const query = 'UPDATE users SET profilePictureURL = ? WHERE username = ?'
    return this.DAO.run(query, [newURL, username])
  }

  destroy(username) {
    const query = 'DELETE FROM users WHERE username = ?'
    return this.DAO.run(query, [username])
  }

  getByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ?'
    return this.DAO.get(query, username)
  }

  getPosts(username) {
    const query = 'SELECT * FROM posts WHERE username = ?'
    return this.DAO.all(query, [username])
  }

  // SELECT ... FROM favorites WHERE ...
  getFavorites(username) {
    const query = ''
    return this.DAO.all(query)
  }

  // SELECT ... FROM comments WHERE ...
  getComments(username) {
    const query = 'SELECT * FROM comments WHERE username = ?'
    return this.DAO.all(query, [username])
  }
}

module.exports = UserRepo
