const DAO = require('./dao')
const UserRepo = require('./users')
const PostRepo = require('./posts')
const CommentRepo = require('./comments')
const FavoriteRepo = require('./favorites')

class Database {
  constructor(dbFilePath) {
    this.DAO = new DAO(dbFilePath)

    this.users = new UserRepo(this.DAO)
    this.users.createTable()

    this.posts = new PostRepo(this.DAO)
    this.posts.createTable()

    this.comments = new CommentRepo(this.DAO)
    this.comments.createTable()

    this.favorites = new FavoriteRepo(this.DAO)
    this.favorites.createTable()

    console.log(`Database initialized...`)
  }
}

module.exports = new Database(`${__dirname}/database`)
