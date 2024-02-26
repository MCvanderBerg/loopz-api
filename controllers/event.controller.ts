import {db} from "../databases/loopz.database";
import {Event, IEvent} from "../models/event.model";
import {query, Request, Response} from "express";
import * as fs from "fs";
import * as path from "path";


export const getEvents = (req: Request, res: Response) => {
    try {
        const query = fs.readFileSync(path.join(__dirname,"../queries/getEvents.query.sql"),).toString()

        db.query(query,(err: Error,result: IEvent[] | undefined) => {
            if (err){
                console.log(err)
                return res.status(500).json({ error: "Internal Server Error" })
            }

            if (!result) {
                return  res.status(500).json({ error: "Result from query was empty"})
            }

            res.status(200).json(result)
        })
    } catch (err) {
        console.error(err)
        res.status(400).json({ error:  `Having trouble reading the sql file. ${err}` })
    }
}

export const getEvent = (req: Request, res: Response) => {
    try {
        const { id, name } = req.query
        let query: string = ""
        let values: (typeof id | typeof name)[] = []

        if (!id && !name) {
            return res.status(400).json({ error: 'name or id parameter is required' })
        }

        if (name) {
            query = fs.readFileSync(path.join(__dirname,"../queries/getEventWithName.query.sql")).toString()
            values = [name]
        }

        if (id) {
            query = fs.readFileSync(path.join(__dirname,"../queries/getEventWithId.query.sql")).toString()
            values = [id]
        }

        db.query(query,values, (err: Error, result: IEvent) => {
            if (err){
                return res.status(500).json({ error: "Internal Server Error" })
            }

            if (!result) {
                return res.status(500).json({ error: "Result form query was empty" })
            }

            res.status(200).json(result)
        })
    } catch (err) {
        console.error(err)
        res.status(400).json({ error:  `Having trouble reading the sql file. ${err}` })
    }
}

export const postEvent = (req: Request, res: Response) => {}
