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

  create(favoritedPostID, username) {
    const query = `INSERT INTO favorites (postID, username, date)
                   VALUES (?,?,datetime("now"))`
    return this.DAO.run(query, [favoritedPostID, username])
  }

  destroy(favoritedPostID, username) {
    const query = 'DELETE FROM favorites WHERE postID = ? AND username = ?'
    return this.DAO.run(query, [favoritedPostID, username])
  }
}

module.exports = FavoriteRepo
