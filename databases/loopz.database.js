import setupConfig from "../config/app.conf.js";
import mysql from 'mysql'

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


db.connect((err) => {
    if (err) {
        console.log(err)
        throw err;
    }
    console.log('Connected to Azure database')
})