import {IConfig, IUser} from "./types";

const express = require('express');
const mysql = require('mysql');
import { Request, Response } from 'express'
import * as path from "path"
import * as dotenv from "dotenv"


const app = express()
const port = 3000;


const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error("Usage: node app.js <environment>");
    process.exit(1);
}

const envFile = `.env.${args[0]}`;
require('dotenv').config({ path: envFile });

const Config:IConfig = {
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_database: process.env.DB_DATABASE
};

const db = mysql.createConnection({
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

app.get('/users', (req: Request, res: Response) => {
    db.query('select * FROM users',(err: Error, results: IUser[] | undefined) => {
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

    db.query(`select * FROM users where id = ?`,[userId], (err: Error, result: IUser | undefined) => {
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