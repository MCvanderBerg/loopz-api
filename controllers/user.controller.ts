import {IUser, User} from "../models/user.model";
import {db} from "../databases/loopz.database";
import { Request, Response } from "express";
import * as fs from "fs";
import {IEvent} from "../models/event.model";
import * as path from "path";

export const getUsers = (req: Request, res: Response) => {
    const query = fs.readFileSync(path.join(__dirname,"../queries/getUsers.query.sql")).toString()

    db.query(query, (err: Error, results: IUser[] | undefined) => {
        if (err) {
            console.log(err)
            throw err
        }

        if (!results) {
            return console.log("results is empty")
        }

        res.json(results)
    }
)}

export const getUser = (req: Request, res: Response) => {
    const { id, username } = req.query
    let query: string = ""
    let values: (typeof id | typeof username)[] = []

    if (!id && !username) {
        return res.status(400).json({ error: 'username or id parameter is required' })
    }

    if (username) {
        query = fs.readFileSync(path.join(__dirname,"../queries/getUserWithUsername.query.sql")).toString()
        values = [username]
    }

    if (id) {
        query = fs.readFileSync(path.join(__dirname,"../queries/getUserWithId.query.sql")).toString()
        values = [id]
    }

    db.query(query,values, (err: Error, result: IUser | undefined) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error: 'Internal Server Error'})
        }
        res.status(200).json(result)
    })
}

export const postUser = (req: Request, res: Response) => {
    const query = fs.readFileSync(path.join(__dirname, "../queries/postUser.query.sql")).toString()

    const [isValid, prop] = User.validateAsUser(req.body)

    if(!isValid){
        return res.status(500).json({ error: `missing fields ${prop}` })
    }

    const {
        username,
        password,
        name,
        surname,
        phone_number,
        email_address
    }: IUser = req.body

    const values = [username, password, name, surname, phone_number, email_address]

    db.query(query, values,(err: Error, result: IUser) => {
        if (err){
            console.error(err)
            return res.status(400).json({ error: `Internal Error: ${err}` })
        }

        res.status(200).json(result)
    })
}


