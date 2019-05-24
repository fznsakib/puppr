class UserTable {
  constructor(DAO) {
    this.DAO = DAO
  }

  createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
      fullname          string,
      username          string PRIMARY KEY UNIQUE,
      email             string UNIQUE,
      password          string,
      bio               text,
      profilePictureUrl string)`
    return this.DAO.db.run(query)
  }
}

module.exports = UserTable
