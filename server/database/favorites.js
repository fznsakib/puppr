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
    return this.DAO.all(`SELECT * FROM favorites`)
  }

  findOneBy(f, v) {
    return this.DAO.get(`SELECT * FROM favorites WHERE ${f} = ${v}`)
  }

  findAllBy(f, v) {
    return this.DAO.all(`SELECT * FROM favorites WHERE ${f} = ${v}`)
  }

  create(postID, username) {
    return this.DAO.run(
      `INSERT INTO favorites (postID, username, date)
       VALUES (${postID}, ${username}, ${Date.now()})`
    )
  }

  update(id, f, nv) {
    return this.db.run(`UPDATE favorites SET ${f} = ${nv} WHERE id = ${id}`)
  }

  destroy(id) {
    return this.db.run(`DELETE FROM favorites WHERE id = ${id}`)
  }
}

module.exports = FavoriteRepo
