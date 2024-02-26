import {IUser, User} from "../models/user.model";
import {db} from "../databases/loopz.database";
import { Request, Response } from "express";
import {IEvent} from "../models/event.model";

export const getAllUsers = (req: Request, res: Response):void => {
    db.query('select * FROM users', (err: Error, results: IUser[] | undefined) => {
        if (err) {
            console.log(err)
            throw err
        }

        if (!results) {
            return console.log("results is empty")
        }

        // For now this is overkill but leaving for later.
        const users: IUser[] = results.map(user =>
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
    }
)}

export const getUser = (req: Request, res: Response) => {
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
}

export const postUser = (req: Request, res: Response) => {
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


    // language=SQL format=false
const query = `
        INSERT INTO users(
            username,
            password,
            name,
            surname,
            phone_number,
            email_address
        )
        VALUES(?, ?, ?, ?, ?, ?)
    `

    const values = [username, password, name, surname, phone_number, email_address]

    db.query(query, values,(err: Error, result: IUser) => {
        if (err){
            return res.status(400).json({ error: `Internal Error: ${err}` })
        }

        res.status(200).json({ result})
    })
}


