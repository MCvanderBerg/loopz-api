import setupConfig from "../config/app.conf";
import * as path from "path";
const mysql = require('mysql');
const fs = require("fs")

const Config = setupConfig()



export const db = mysql.createConnection({
    host:  Config.db_host,
    user: Config.db_user,
    password: Config.db_password,
    database: Config.db_database,
    // ssl: {
    //     ca: fs.readFileSync(path.join(__dirname,"../BaltimoreCyberTrustRoot.crt.pem")) // Specify the path to your CA certificate file
    // }
    })


    // /app/work/ca.pem


db.connect((err: Error) => {
    if (err) {
        console.log(err)
        throw err;
    }
    console.log('Connected to Azure database')
})