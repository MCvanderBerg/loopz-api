import {db} from "../databases/loopz.database";
import {Event, IEvent} from "../models/event.model";
import {Request, Response} from "express";


export const getAllEvent = (req: Request, res: Response) => {
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
}

export const getEvent = (req: Request, res: Response) => {
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

}