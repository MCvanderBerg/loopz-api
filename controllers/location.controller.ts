import {Request, Response} from "express";
import {db} from "../databases/loopz.database";
import {ILocation} from "../models/location.model";
import * as path from "path";
import * as fs from "fs";

export  const getLocations = (req: Request, res: Response) => {
    try {
        const query = fs.readFileSync(path.join(__dirname,'../queries/getLocations.query.sql')).toString()

        db.query(query, (err: Error, result:ILocation[]) => {
            if (err) {
                console.error(err)
                return res.status(400).json({ error: `Internal Server Error: ${err}` })
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
    }

}

export const getLocation = (req: Request, res: Response) => {
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

        db.query(query, values, (err: Error, result: ILocation) => {
            if (err) {
                console.error(err)
                res.status(400).json({ error: `Internal Server Error: ${err}` })
            }

            if (!result) {
                console.log('result was passed')
                res.status(500).json({ error: 'result was passed' })
            }

            res.status(200).json(result)
        })
    } catch (err) {
        console.error(err)
        res.status(400).json({ error:  `Having trouble reading the sql file. ${err}` })
    }
}

export const postLocation = (req: Request, res: Response) => {
    try {
        const query = fs.readFileSync(path.join(__dirname,"../queries/postLocation.query.sql")).toString()
        const {
            latitude,
            longitude,
            name,
            address
        }: ILocation = req.body
        const values = [longitude,latitude, name, address]
        db.query(query,values, (err: Error, result: ILocation) => {
            if (err) {
                console.error(err)
                res.status(400).json({ error: `Internal Server Error: ${err}` })
            }

            if (!result) {
                console.log('result was passed')
                res.status(500).json({ error: 'result was passed' })
            }

            res.status(200).json(result)
        })
    } catch (err) {
        console.error(err)
        res.status(400).json({ error:  `Having trouble reading the sql file. ${err}` })
    }
}