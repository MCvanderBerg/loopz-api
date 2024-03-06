import { User } from "../models/user.model.js";
import {db} from "../databases/loopz.database.js";
import fs from "fs";
import path from "path";
import { __dirname } from "../base_utils.js";

export const getWatchers = (req, res) => {
    try {
        const query = fs.readFileSync(path.join(__dirname, "./queries/getWatchers.query.sql")).toString()

        db.query(query, (err, result) => {
            if (err) {
                console.error(err)
                return res.status(400).json({ error: `Internal Server Error with query: ${err}` })
            }

            if (!result) {
                return res.status(500).json({ error: 'result was empty' })
            }

            res.status(200).json(result)
        })
    }
    catch (err) {
        console.error(err)
        return res.status(400).json({ error: `Having trouble reading the sql file. ${err}` })
    }}

export const getWatcher = (req, res) => {
    try {
        const { user_id, event_id } = req.query
        let query = ""
        let values = []

        if (!user_id && !event_id) {
            return res.status(400).json({ error: 'user_id and event_id parameter is required' })
        }

        if (user_id && !event_id || !user_id && event_id) {
            return res.status(400).json({ error: 'user_id and event_id are both required' })
        }

        if (user_id && event_id) {
            query = fs.readFileSync(path.join(__dirname, "./queries/getWatchWithIds.query.sql")).toString()
            values = [user_id, event_id]
        }

        db.query(query, values, (err, result) => {
            if (err) {
                console.error(err)
                res.status(400).json({ error: `Internal Server Error: ${err}` })
            }
            console.log(result)
            if (!result) {
                console.log('result was passed')
                res.status(500).json({ error: 'result was passed' })
            }

            res.status(200).json(result)
        })
    } catch (err) {
        console.error(err)
        res.status(400).json({ error: `Having trouble reading the sql file. ${err}` })
    }
}

export const getUserWatchers = (req, res) => {
    try {
        const { user_id: id } = req.query
        const query = fs.readFileSync(path.join(__dirname, "./queries/getUserWatchers.query.sql")).toString()

        db.query(query, [id], (err, result) => {
            if (err) {
                console.error(err)
                return res.status(400).json({ error: `Internal Server Error with query: ${err}` })
            }

            if (!result) {
                return res.status(500).json({ error: 'result was empty' })
            }

            res.status(200).json(result)
        })
    } catch (err) {
        console.error(err)
        return res.status(400).json({ error: `Having trouble reading the sql file. ${err}` })
    }
}

export const getEventWatchers = (req, res) => {
    try {
        const { event_id: id } = req.query
        const query = fs.readFileSync(path.join(__dirname, "./queries/getEventWatchers.query.sql")).toString()

        db.query(query, [id], (err, result) => {
            if (err) {
                console.error(err)
                return res.status(400).json({ error: `Internal Server Error with query: ${err}` })
            }

            if (!result) {
                return res.status(500).json({ error: 'result was empty' })
            }

            res.status(200).json(result)
        })
    } catch (err) {
        console.error(err)
        return res.status(400).json({ error: `Having trouble reading the sql file. ${err}` })
    }
}


export const postWatch = (req, res) => {

}

