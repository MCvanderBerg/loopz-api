const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } =  require("../config/app.conf.js");
const mysql = require('mysql2')

const db = mysql.createConnection({
    host:  DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    // ssl: {
    //     ca: fs.readFileSync(path.join(__project_dirname,"../BaltimoreCyberTrustRoot.crt.pem")) // Specify the path to your CA certificate file
    // }
    })

db.connect((err) => {
    if (err) {
        console.log(err)
        throw err;
    }
    console.log('Connected to Azure database')
})


module.exports = db