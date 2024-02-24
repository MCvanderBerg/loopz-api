const express = require('express');
const mysql = require('mysql');
import { Request, Response } from 'express'
import * as path from "path"
import * as dotenv from "dotenv"
dotenv.config();


function getConfig() {
    const args = process.argv.slice(2);
    if (args.length !== 1) {
        console.error("Usage: node app.js <environment>");
        process.exit(1);
    }

    const environment = args[0];
    const config = loadConfig(environment);

}

function loadConfig(environment: String) : {
    database_host: string | undefined,
    database_user: string | undefined,
    database_password: string | undefined,
    database: string | undefined
} {
    const envFile = `.env.${environment}`;
    require('dotenv').config({ path: envFile });
    return {
        database_host: process.env.DB_HOST,
        database_user: process.env.DB_USER,
        database_password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    };
}

getConfig()




interface User {
    id: number;
    username: string;
    password: string;
    name: string;
    surname: string;
    phone_number: string;
    email_address: string;
}

const app = express()
const port = 3000;

const db = mysql.createConnection({
    host:  "Michiels-MacBook-Air.local",
    user: "root",
    password: "Noeline101#",
    database: "loopz",
})
console.log('Config:', process.env.CONFIG);


db.connect((err: Error) => {
    if (err) {
        console.log(err)
        throw err;
    }
    console.log('Connected to MySQL database')
})

app.get('/users', (req: Request, res: Response) => {
    db.query('select * FROM users',(err: Error, results: User[] | undefined) => {
        if (err) {
            console.log(err)
            throw  err
        }
        res.json(results)
    })
})

app.get('/user', (req: Request, res: Response) => {
    const userId = req.query.userId
    const client = req.headers.client
    console.log(client)

    if (!userId) {
        return res.status(400).json({error: 'userId parameter is required'})
    }

    db.query(`select * FROM users where id = ?`,[userId], (err: Error, result: User | undefined) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error: 'Internal Server Error'})
        }
        res.status(200).json(result)
    })
})

// app.post('/', (req, res) => {
//     // Handle POST request
//     // You can access request body using req.body
//     res.send('POST request received');
// });


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});