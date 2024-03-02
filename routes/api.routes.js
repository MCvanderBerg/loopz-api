import {getUsers, getUser, postUser} from "../controllers/user.controller.js";
import {getEvent, getEvents, postEvent} from "../controllers/event.controller.js"
import {getLocation, getLocations, postLocation} from "../controllers/location.controller.js";
import express from "express"

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({message:"Hello line!!!, love you"})
})
router.get('/events', (req, res) => getEvents(req,res))
router.get('/event',(req, res) => getEvent(req, res))
router.post('/event', (req, res) => postEvent(req, res))


//////////////////////////////////////////////////////////////////
router.get('/users', (req, res) => getUsers(req,res))

router.get('/user', (req, res) => getUser(req, res))

router.post('/user', (req, res) => postUser(req, res))

//////////////////////////////////////////////////////////////////
router.get('/locations', (req, res) => getLocations(req, res))

router.get('/location', (req, res) => getLocation(req, res))

router.post('/location', (req, res) => postLocation(req, res))

export default router
