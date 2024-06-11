const User  = require( "../models/user.model.js");
const db = require("../databases/loopz.database.js");
const fs  = require("fs");
const path  = require("path");
const {__project_dirname}  = require("../base_utils.js");
const { handleProfilePictureUpload }  = require("../databases/azure.database.js");
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/app.conf.js');
const { error } = require("console");

const createToken = (id) => {
    return jwt.sign({id},SECRET , {expiresIn: '3d'})
}

const getUsers = (req, res) => {
    const query = fs.readFileSync(path.join(__project_dirname,"./queries/getUsers.query.sql")).toString()

    db.query(query, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: `Internal Server Error: ${err}` })
            throw err
        }

        if (!result) {
            return console.log("result is empty")
        }

        res.status(200).json(result)
    }
)}

const getUser = (req, res) => {
    const { id, username } = req.query
    let query = ""
    let values = []

    if (!id && !username) {
        return res.status(400).json({ error: 'username or id parameter is required' })
    }

    if (username) {
        query = fs.readFileSync(path.join(__dirname,"../queries/getUserWithUsername.query.sql")).toString()
        values = [username]
    }

    if (id) {
        query = fs.readFileSync(path.join(__dirname,"../queries/getUserWithId.query.sql")).toString()
        values = [id]
    }

    db.query(query,values, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error: 'Internal Server Error'})
        }
        res.status(200).json(result)
    })
}

const patchUser = async (req, res) => {
    // const { username, password, name, surname, phone_number, email_address, id } = req.body
    const { name, id } = req.body

    if (!name) {
        res.status(400).json({ error: "no name provided" })
    }

    if (!id) {
        res.status(400).json({ error: "no id provided" })
    }

    try{
        const query = fs.readFileSync(path.join(__project_dirname,"./queries/postUser.query.sql")).toString()
        values = [name, id]
        db.query(query,values, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({error: 'Internal Server Error'})
            }
            res.status(200).json(result)
        })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

const signup = async (req, res) => {
    const { username, password, name, surname, phone_number, email_address } = req.body

    try{
        const user = await User.signup(username, password, name, surname, phone_number, email_address)
        const token = createToken(user.id)

        console.log('user: ', user)
        console.log('token: ', token)

        res.status(200).json({ user, token })
    } catch(err){
        res.status(400).json({ error: err.message})
    }
}

const login = async (req, res) => {
    const  { email_address, password } = req.body

    console.log(email_address, password)
    try {
        const user = await User.login(email_address, password)
        const token = createToken(user.id)

        res.status(200).json({ user, token })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

const postProfilePicture = async (req, res) => {

    const url = await handleProfilePictureUpload(req, res)

    const query = fs.readFileSync(path.join(__project_dirname,"./queries/getUsers.query.sql")).toString()

    db.query(query,[url],(err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: `Internal Server Error: ${err}` })
            throw err
        }

        if (!result) {
            return console.log("result is empty")
        }

        res.status(200).json(result)
    })
}


module.exports = { getUsers, getUser, signup, login, postProfilePicture, patchUser }



