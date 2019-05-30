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
    return this.DAO.all(`SELECT * FROM users`)
  }

  findOneBy(f, v) {
    return this.DAO.get(`SELECT * FROM users WHERE ${f} = ${v}`)
  }

  findAllBy(f, v) {
    return this.DAO.all(`SELECT * FROM users WHERE ${f} = ${v}`)
  }

  create(username, email, fullname, password) {
    return this.DAO.run(
      `INSERT INTO users (username, date, email, fullname, password)
       VALUES (${username}, ${Date.now()}, ${email}, ${fullname}, ${password})`
    )
  }

  update(un, f, nv) {
    return this.db.run(`UPDATE users SET ${f} = ${nv} WHERE username = ${un}`)
  }

  destroy(un) {
    return this.db.run(`DELETE FROM users WHERE username = ${un}`)
  }
}

module.exports = UserRepo
