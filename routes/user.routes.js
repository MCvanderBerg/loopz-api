import {getUser, getUsers, postUser} from "../controllers/user.controller.js";
import express from "express";


const router = express.Router()

router.get('/users', (req, res) => getUsers(req,res))

router.get('/', (req, res) => getUser(req, res))

router.post('/', (req, res) => postUser(req, res))


//TODO
// router.post('/ProfilePicture', (req, res) => uploadProfilePictur(req, res))

export  default  router