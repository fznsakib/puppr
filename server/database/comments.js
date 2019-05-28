class CommentRepo {
  constructor(DAO) {
    this.DAO = DAO
  }

  createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS comments (
      id         integer PRIMARY KEY AUTOINCREMENT,
      body       text,
      postID     integer,
      username   string,
      date       datetime,
      CONSTRAINT posts_fk FOREIGN KEY (postID)   REFERENCES posts(id),
      CONSTRAINT users_fk FOREIGN KEY (username) REFERENCES users(username))`
    return this.DAO.run(query)
  }

  create(body, postID, username) {
    let dateAdded = Date.now()
    const query = `INSERT INTO comments (body, postID, username, date)
                   VALUES (?,?,?,${dateAdded})`
    return this.DAO.run(query, [body, postID, username])
  }

  update(newBody, id) {
    const query = 'UPDATE comments SET body = ? WHERE id = ?'
    return this.DAO.run(query, [newBody, id])
  }

  destroy(id) {
    const query = 'DELETE FROM comments WHERE id = ?'
    return this.DAO.run(query, [id])
  }
}

module.exports = CommentRepo
