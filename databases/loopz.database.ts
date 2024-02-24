import setupConfig from "../config/app.conf";
const mysql = require('mysql');

const Config = setupConfig()

export const db = mysql.createConnection({
    host:  Config.db_host,
    user: Config.db_user,
    password: Config.db_password,
    database: Config.db_database,
})

db.connect((err: Error) => {
    if (err) {
        console.log(err)
        throw err;
    }
    console.log('Connected to MySQL database')
})