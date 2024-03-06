import { User } from "../models/user.model.js";
import {db} from "../databases/loopz.database.js";
import fs from "fs";
import path from "path";
import {__dirname} from "../base_utils.js";
import { handleProfilePictureUpload } from "../databases/azure.database.js";


export const getUsers = (req, res) => {
    const query = fs.readFileSync(path.join(__dirname,"./queries/getUsers.query.sql")).toString()

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

export const getUser = (req, res) => {
    const { id, username } = req.query
    let query = ""
    let values = []

    if (!id && !username) {
        return res.status(400).json({ error: 'username or id parameter is required' })
    }

    if (username) {
        query = fs.readFileSync(path.join(__dirname,"./queries/getUserWithUsername.query.sql")).toString()
        values = [username]
    }

    if (id) {
        query = fs.readFileSync(path.join(__dirname,"./queries/getUserWithId.query.sql")).toString()
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

export const postUser = async (req, res) => {
    const query = fs.readFileSync(path.join(__dirname, "./queries/postUser.query.sql")).toString()

    const [isValid, prop] = User.validateAsUser(req.body)

    if(!isValid){
        return res.status(500).json({ error: `missing fields ${prop}` })
    }

    const {
        username,
        password,
        name,
        surname,
        phone_number,
        email_address
    } = req.body
    let imageUrl
    try {
        imageUrl = await handleProfilePictureUpload(req, res)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Struggeling to upload profile picture" })
    }

    const values = [username, password, name, surname, phone_number, email_address, imageUrl]

    db.query(query, values,(err, result) => {
        if (err){
            console.error(err)
            return res.status(400).json({ error: `Internal Error: ${err}` })
        }

        res.status(200).json(result)
    })
}

const postProfilePicture = async (req, res) => {

    const url = await handleProfilePictureUpload(req, res)

    const query = fs.readFileSync(path.join(__dirname,"./queries/getUsers.query.sql")).toString()



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



