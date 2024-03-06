import path from 'path';
import fs from "fs";
import {db} from "./databases/loopz.database.js";

export const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const getAll = (req, res, sqlFilePath) => {
    try {
        const query = fs.readFileSync(path.join(__dirname, sqlFilePath)).toString()

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
    }
}

export const getOne = (req, res, sqlName, sqlId) => {

}

