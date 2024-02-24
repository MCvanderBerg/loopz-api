import {IUser, User} from "../models/user.model";
import {db} from "../databases/loopz.database";
import { Request, Response } from "express";

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
