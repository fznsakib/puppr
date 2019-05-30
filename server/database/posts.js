class PostRepo {
  constructor(DAO) {
    this.DAO = DAO
  }

  createTable() {
    const q = `
    CREATE TABLE IF NOT EXISTS posts (
      id         integer PRIMARY KEY AUTOINCREMENT,
      caption    text,
      date       datetime,
      favorites  integer,
      imageURL   string,
      username   string,
      CONSTRAINT users_fk FOREIGN KEY (username) REFERENCES users(username))`
    return this.DAO.run(q)
  }

  all() {
    return this.DAO.all(`SELECT * FROM posts`)
  }

  findOneBy(f, v) {
    return this.DAO.get(`SELECT * FROM posts WHERE ${f} = ${v}`)
  }

  findAllBy(f, v) {
    return this.DAO.all(`SELECT * FROM posts WHERE ${f} = ${v}`)
  }

  create([ caption, imageURL, username ]) {
    return this.DAO.run(
      `INSERT INTO posts (caption, date, favorites, imageURL, username)
       VALUES (${caption}, ${Date.now()}, 0, ${imageURL}, ${username} )`
    )
  }

  update(id, f, nv) {
    return this.db.run(`UPDATE posts SET ${f} = ${nv} WHERE id = ${id}`)
  }

  destroy(id) {
    return this.db.run(`DELETE FROM posts WHERE id = ${id}`)
  }
}

module.exports = PostRepo
