"use strict";
const sqlite3 = require('sqlite3').verbose();

class Db {
    constructor(file) {
        this.db = new sqlite3.Database(file);
        this.createTable()
    }

    createTable() {
        const createUser = `
            CREATE TABLE IF NOT EXISTS user (
                id integer PRIMARY KEY AUTOINCREMENT,
                name text,
                email text UNIQUE,
                username text UNIQUE,
                password text,
                question text,
                answer text)
            `
        const createPost = `
            CREATE TABLE IF NOT EXISTS post (
                id integer PRIMARY KEY AUTOINCREMENT,
                user_id integer,
                date text,
                likes integer,
                dislikes integer,
                CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES user(id)
            )`
        const createComment = `
            CREATE TABLE IF NOT EXISTS comment (
                id integer PRIMARY KEY AUTOINCREMENT,
                user_id integer,
                post_id interger,
                body text,
                date text,
                CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES user(id),
                CONSTRAINT fk_posts FOREIGN KEY (post_id) REFERENCES post(id)
            )`
        this.db.run(createUser);
        this.db.run(createPost);
        return this.db.run(createComment);
    }

    selectByEmail(email, callback) {
        return this.db.get(
            `SELECT * FROM user WHERE email = ?`,
            [email],function(err,row){
                callback(err,row)
            })
    }

    insertAdmin(user, callback) {
        return this.db.run(
            'INSERT INTO user (name,email,password) VALUES (?,?,?)',
            user, (err) => {
                callback(err)
            })
    }

    selectAll(callback) {
        return this.db.all(`SELECT * FROM user`, function(err,rows){
            callback(err,rows)
        })
    }

    insert(user, callback) {
        return this.db.run(
            'INSERT INTO user (name,email,password) VALUES (?,?,?)',
            user, (err) => {
                callback(err)
            })
    }
}

module.exports = Db
