const AppDAO = require('./dao')
const UserRepo = require('./users')
const PostRepo = require('./posts')
const CommentRepo = require('./comments')
const FavoriteRepo = require('./favorites')

class Database {
  constructor(dbFilePath) {
    this.DAO = new AppDAO(dbFilePath)

    this.users = new UserRepo(this.DAO)
    this.users.createTable()

    this.posts = new PostRepo(this.DAO)
    this.posts.createTable()

    this.comments = new CommentRepo(this.DAO)
    this.comments.createTable()

    this.favorites = new FavoriteRepo(this.DAO)
    this.favorites.createTable()
  }
}

module.exports = Database
