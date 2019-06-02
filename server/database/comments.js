class CommentRepo {
  constructor(DAO) {
    this.DAO = DAO
  }

  createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS comments (
      id         integer PRIMARY KEY AUTOINCREMENT,
      body       text,
      date       datetime,
      postID     integer,
      username   string,
      CONSTRAINT posts_fk FOREIGN KEY (postID)   REFERENCES posts(id),
      CONSTRAINT users_fk FOREIGN KEY (username) REFERENCES users(username))`
    return this.DAO.run(query)
  }

  all() {
    let q = `SELECT * FROM comments`
    return this.DAO.all(q)
  }

  findOneBy(f, v) {
    let q = `SELECT * FROM comments WHERE ${f} = ?`
    return this.DAO.get(q, [v])
  }

  findAllBy(f, v) {
    let q = `SELECT * FROM comments WHERE ${f} = ?`
    return this.DAO.all(q, [v])
  }

  create(body, postID, username) {
    let q = `INSERT INTO comments (body, date, postID, username
             VALUES (?, ${Date.now()}, ?, ?`
    return this.DAO.run(q, [body, postID, username])
  }

  update(id, f, nv) {
    let q = `UPDATE comments SET ${f} = ? WHERE id = ?`
    return this.DAO.run(q, [nv, id])
  }

  destroy(id) {
    let q = `DELETE FROM comments WHERE id = ?`
    return this.DAO.run(q, [id])
  }
}

module.exports = CommentRepo
