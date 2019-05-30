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
    return this.DAO.all(`SELECT * FROM comments`)
  }

  findOneBy(f, v) {
    return this.DAO.get(`SELECT * FROM comments WHERE ${f} = ${v}`)
  }

  findAllBy(f, v) {
    return this.DAO.all(`SELECT * FROM comments WHERE ${f} = ${v}`)
  }

  create(body, postID, username) {
    return this.DAO.run(
      `INSERT INTO comments (body, date, postID, username)
       VALUES (${body}, ${Date.now()}, ${postID}, ${username})`
    )
  }

  update(id, f, nv) {
    return this.db.run(`UPDATE comments SET ${f} = ${nv} WHERE id = ${id}`)
  }

  destroy(id) {
    return this.db.run(`DELETE FROM comments WHERE id = ${id}`)
  }
}

module.exports = CommentRepo
