class PostRepo {
  constructor(DAO) {
    this.DAO = DAO
  }

  createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS posts (
      id         integer PRIMARY KEY AUTOINCREMENT,
      imageURL   string,
      caption    text,
      username   string,
      favorites  integer,
      date       datetime,
      CONSTRAINT users_fk FOREIGN KEY (username) REFERENCES users(username))`
    return this.DAO.run(query)
  }

  create(post) {
    const query = `INSERT INTO posts (imageURL, caption, username, favorites, date)
                   VALUES (?,?,?,?,datetime("now"))`
    return this.DAO.run(query, post)
  }

  updateCaption(id, newCaption) {
    const query = 'UPDATE posts SET caption = ? WHERE id = ?'
    return this.db.run(query, [newCaption, id])
  }

  updateImage(id, newURL) {
    const query = 'UPDATE posts SET imageURL = ? WHERE id = ?'
    return this.db.run(query, [newURL, id])
  }

  destroy(id) {
    const query = 'DELETE FROM posts WHERE id = ?'
    return this.db.run(query, [id])
  }

  getAll() {
    const query = 'SELECT * FROM posts'
    return this.DAO.all(query)
  }

  getByID(id) {
    const query = 'SELECT * FROM posts WHERE id = ?'
    return this.DAO.get(query, [id])
  }

  // returns how many favorites a post has
  getNumFavorites(id) {
    const query = 'SELECT favorites FROM posts WHERE id = ?'
    return this.DAO.get(query, [id])
  }

  getComments(id) {
    const query = 'SELECT * FROM comments WHERE postID = ?'
    return this.DAO.all(query, [id])
  }
}

module.exports = PostRepo
