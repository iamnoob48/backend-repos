import {DatabaseSync} from "node:sqlite"

//Creates a database to perform action
const db = new DatabaseSync(':memory:')

//To execute it use .exec method in strings
//This is for the user storage
db.exec(`
    CREATE TABLE user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )




`)
//This data is for todo
db.exec(`
    CREATE TABLE todo(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task TEXT,
        completed BOOLEAN DEFAULT 0,
        isDeleted BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES user(id)

    )





`)

export default db