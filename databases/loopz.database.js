const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } =  require("../config/app.conf.js");
const mysql = require('mysql2')
const fs = require("fs");
const path = require("path");
const { __project_dirname } = require("../base_utils.js");
const serverCa = [fs.readFileSync(path.join(__project_dirname, "./loopz-api/DigiCertGlobalRootG2.crt.pem"))]

const db = mysql.createConnection({
    host:  DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
        ca: serverCa
    }
    })

db.connect((err) => {
    if (err) {
        console.log(err)
        throw err;
    }
    console.log('Connected to Azure database')
})


module.exports = db