class UserRepo {
  constructor(DAO) {
    this.DAO = DAO
  }

  createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
      username        string PRIMARY KEY UNIQUE,
      bio             text,
      date            datetime,
      email           string UNIQUE,
      fullname        string,
      password        text,
      profileImageURL text)`
    return this.DAO.run(query)
  }

  all() {
    let q = `SELECT * FROM users`
    return this.DAO.all(q)
  }

  findOneBy(f, v) {
    let q = `SELECT * FROM users WHERE ${f} = ?`
    return this.DAO.get(q, [v])
  }

  findAllBy(f, v) {
    let q = `SELECT * FROM users WHERE ${f} = ?`
    return this.DAO.all(q, [v])
  }

  create(username, email, fullname, password) {
    let q = `INSERT INTO users (username, date, email, fullname, password)
             VALUES(?, ${Date.now()}, ?, ?, ?)`
    return this.DAO.run(q, [username, email, fullname, password])
  }

  update(un, f, nv) {
    let q = `UPDATE users SET ${f} = ? WHERE username = ?`
    return this.DAO.run(q, [nv, un])
  }

  destroy(un) {
    let q = `DELETE FROM users WHERE username = ?`
    return this.DAO.run(q, [un])
  }
}

module.exports = UserRepo
