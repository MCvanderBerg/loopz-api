const db = require("../databases/loopz.database.js");
const {Event}  = require( "../models/event.model.js");
const {__project_dirname}  = require( "../base_utils.js");
const fs = require( "fs");
const path = require( "path");


const getEvents = (req, res) => {
    try {
        const query = fs.readFileSync(path.join(__project_dirname,"./queries/getEvents.query.sql")).toString()

        db.query(query,(err,result) => {
            if (err){
                console.log(err)
                return res.status(500).json({ error: "Internal Server Error" })
            }

            if (!result) {
                return  res.status(500).json({ error: "Result  = require( query was empty"})
            }

            res.status(200).json(result)
        })
    } catch (err) {
        console.error(err)
        res.status(400).json({ error:  `Having trouble reading the sql file. ${err}` })
    }
}

const getEvent = (req , res) => {
    try {
        const { id, name } = req.query
        let query = ""
        let values = []

        if (!id && !name) {
            return res.status(400).json({ error: 'name or id parameter is required' })
        }

        if (name) {
            query = fs.readFileSync(path.join(__project_dirname,"./queries/getEventWithName.query.sql")).toString()
            values = [name]
        }

        if (id) {
            query = fs.readFileSync(path.join(__project_dirname,"./queries/getEventWithId.query.sql")).toString()
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

const postEvent = (req, res) => {
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

        const query = fs.readFileSync(path.join(__project_dirname,"./queries/postEvent.query.sql")).toString()
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


module.exports = { getEvents, getEvent, postEvent }
