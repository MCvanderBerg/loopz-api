const path  = require('path');
const fs  = require("fs");
const db = require("./databases/loopz.database.js");

const __project_dirname = path.dirname(__dirname);

const getAll = (req, res, sqlFilePath) => {
    try {
        const query = fs.readFileSync(path.join(__project_dirname, sqlFilePath)).toString()

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

const getOne = (req, res, sqlName, sqlId) => {

}


module.exports = { __project_dirname, getAll, getOne }
