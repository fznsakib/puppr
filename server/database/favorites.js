class FavoriteRepo {
  constructor(DAO) {
    this.DAO = DAO
  }

  createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS favorites (
      id         integer PRIMARY KEY AUTOINCREMENT,
      postID     integer,
      username   string,
      date       datetime,
      CONSTRAINT posts_fk FOREIGN KEY (postID)   REFERENCES posts(id),
      CONSTRAINT users_fk FOREIGN KEY (username) REFERENCES users(username))`
    return this.DAO.run(query)
  }

  all() {
    let q = `SELECT * FROM favorites`
    return this.DAO.all(q)
  }

  findOneBy(f, v) {
    let q = `SELECT * FROM favorites WHERE ${f} = ?`
    return this.DAO.get(q, [v])
  }

  findAllBy(f, v) {
    let q = `SELECT * FROM favorites WHERE ${f} = ?`
    return this.DAO.all(q, [v])
  }

  create(postID, username) {
    let q = `INSERT INTO favorites (postID, username, date)
             VALUES (?, ?, ${Date.now()})`
    return this.DAO.run(q, [postID, username])
  }

  update(id, f, nv) {
    let q = `UPDATE favorites SET ${f} = ? WHERE id = ?`
    return this.DAO.run(q, [nv, id])
  }

  destroy(id) {
    let q = `DELETE FROM favorites WHERE id = ?`
    return this.DAO.run(q, [id])
  }
}

module.exports = FavoriteRepo
