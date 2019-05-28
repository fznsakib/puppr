/**
 *  Creates an instance of an SQLite3 DAO
 *  (Data Access Object)
 */

const sqlite3 = require('sqlite3')

class AppDAO {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log(`Could not connect to database: ${err}`)
      }
    })
  }

  run(query, params = []) {
    return new Promise((resolve, reject) => {
      // function instead of arrow to resolve 'this' scope
      this.db.run(query, params, function(err) {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  get(query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(query, params, (err, row) => {
        if (err) {
          console.log(`Couldn't run query: ${query}`)
          console.log(`GET Error: ${err}`)
          reject(err)
        } else {
          resolve(row)
        }
      })
    })
  }

  all(query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(query, params, (err, rows) => {
        if (err) {
          console.log(`Couldn't run query: ${query}`)
          console.log(`ALL Error: ${err}`)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }
}

module.exports = AppDAO
