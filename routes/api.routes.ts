import {Request, response, Response} from "express";
import {getAllUsers, getUser, postUser} from "../controllers/user.controller";
import {getEvents, getEvent, getBriefEvents} from "../controllers/event.controller"
const express = require("express")


const router = express.Router()
router.get('/users', (req: Request, res: Response) => getAllUsers(req,res))

router.get('/events', (req: Request, res: Response) => getEvents(req,res))

router.get('/events/brief/',(req: Request, res: Response) => getBriefEvents(req, res))

router.get('/event',(req: Request, res: Response) => getEvent(req, res))

router.get('/user', (req: Request, res: Response) => getUser(req, res))

router.post('/user', (req: Request, res: Response) => postUser(req, res))


export default router