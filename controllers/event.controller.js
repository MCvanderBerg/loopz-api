import {db} from "../databases/loopz.database.js";
import {Event} from "../models/event.model.js";
import {__dirname} from "../base_utils.js";

import fs from "fs";
import path from "path";


export const getEvents = (req, res) => {
    try {
        const query = fs.readFileSync(path.join(__dirname,"./queries/getEvents.query.sql"),).toString()

        db.query(query,(err,result) => {
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

export const getEvent = (req , res) => {
    try {
        const { id, name } = req.query
        let query = ""
        let values = []

        if (!id && !name) {
            return res.status(400).json({ error: 'name or id parameter is required' })
        }

        if (name) {
            query = fs.readFileSync(path.join(__dirname,"./queries/getEventWithName.query.sql")).toString()
            values = [name]
        }

        if (id) {
            query = fs.readFileSync(path.join(__dirname,"./queries/getEventWithId.query.sql")).toString()
            values = [id]
        }

        db.query(query,values, (err, result) => {
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

 export const postEvent = (req, res) => {
    try {
        const {
            name,
            description,
            date,
            created_at,
            location_id,
            phone_number,
            email_address,
            creator_id
        } = req.body

        const query = fs.readFileSync(path.join(__dirname,"./queries/postEvent.query.sql")).toString()
        const values = [ name, description, date, location_id, created_at, phone_number, email_address, creator_id]

        db.query(query, values,(err, result) => {
            if (err){
                return res.status(500).json({ error: "Internal Server Error" })
            }

            if (!result) {
                return res.status(500).json({ error: "Result form query was empty" })
            }

            res.status(200).json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: `Having trouble posting using sql file. ${err}` })
    }

 }
