import {IConfig} from "./types";

const express = require('express');
const mysql = require('mysql');
import { Request, Response } from 'express'

import {IUser, User} from "./models/user.model";
import {IEvent, Event} from "./models/event.model";


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

        if (!results) {
            return console.log("results is empty")
        }


        // For now this is overkill but leaving for later.
        const users:IUser[] = results.map(user =>
            new User(
                user.id,
                user.username,
                user.password,
                user.name,
                user.surname,
                user.phone_number,
                user.email_address
            )
        )
        res.json(users)
    })
})


app.get('/events', (req: Request, res: Response) => {
    db.query('SELECT * FROM events',(err: Error,result: IEvent[] | undefined) => {
        if (err){
            console.log(err)
            return res.status(500).json({ error: "Internal Server Error" })
        }

        if (!result) {
            return  res.status(500).json({ error: "Result from query was empty"})
        }
        const events = result.map(event =>
            new Event(
                event.id,
                event.name,
                event.description,
                event.date,
                event.location_id,
                event.created_at,
                event.phone_number,
                event.email_address,
                event.creator_id
            )
        )

        res.status(200).json(events)
    })
})

app.get('/event',(req: Request, res: Response) => {
    const eventId = req.query.eventId

    if (!eventId) {
        return res.status(400).json({ error: 'eventId parameter is required' })
    }

    db.query(`SELECT * FROM events where id = ?`,[eventId], (err: Error, result: IEvent) => {
        if (err){
            return res.status(500).json({ error: "Internal Server Error" })
        }

        if (!result) {
            return res.status(500).json({ error: "Result form query was empty" })
        }
        const {
            id,
            name,
            description,
            date,
            location_id,
            created_at,
            phone_number,
            email_address,
            creator_id
        } = result

        const event = new Event(
            id,
            name,
            description,
            date,
            location_id,
            created_at,
            phone_number,
            email_address,
            creator_id
        )

        res.status(200).json(result)
    })
})


app.get('/user', (req: Request, res: Response) => {
    const userId = req.query.userId
    const client = req.headers.client

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


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});