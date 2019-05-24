class PostTable {
  constructor(DAO) {
    this.DAO = DAO
  }

  createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS posts (
      id         integer PRIMARY KEY AUTOINCREMENT,
      imageUrl   string,
      caption    text,
      username   string,
      favorites  integer,
      date       datetime,
      CONSTRAINT users_fk FOREIGN KEY (username) REFERENCES user(username))`
    return this.DAO.db.run(query)
  }
}

module.exports = PostTable
