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
    let q = `SELECT * FROM posts`
    return this.DAO.all(q)
  }

  findOneBy(f, v) {
    let q = `SELECT * FROM posts WHERE ${f} = ?`
    return this.DAO.get(q, [v])
  }

  findAllBy(f, v) {
    let q = `SELECT * FROM post WHERE ${f} = ?`
    return this.DAO.all(q, [v])
  }

  create([ caption, imageURL, username ]) {
    let date = Date.now()
    let q = `INSERT INTO posts (caption, date, favorites, imageURL, username)
             VALUES (?, ?, ?, ?, ?)`
    return this.DAO.run(q, [caption, date, 0, imageURL, username])
  }

  update(id, f, nv) {
    let q = `UPDATE posts SET ${f} = ? WHERE id = ?`
    return this.DAO.run(q, [nv, id])
  }

  destroy(id) {
    let q = `DELETE FROM posts WHERE id = ?`
    return this.DAO.run(q, [id])
  }
}

module.exports = PostRepo
