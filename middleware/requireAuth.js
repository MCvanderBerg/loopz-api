const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const { SECRET } = require('../config/app.conf')
const db = require('../databases/loopz.database')

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, SECRET)
        const query = `SELECT * FROM users WHERE id=?`

        db.query(query,[id], (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).json({ error: `Internal Server Error: ${err}` })
            }
    
            if (!result) {
                return console.log("result is empty")
            }
    
            res.user = result
            next()
        })

    } catch (err) {
        console.log(err)
        res.status(401).json({ error: 'Request is not authorized' })
    }


}

module.exports = requireAuth