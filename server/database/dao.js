const sqlite3 = require('sqlite3')

class AppDAO {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log(`Could not connected to database: ${err}`)
      } else {
        console.log('Database connection established.')
      }
    })
  }
}

module.exports = AppDAO
