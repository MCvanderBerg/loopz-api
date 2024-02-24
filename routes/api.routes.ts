import {Request, response, Response} from "express";
import {getAllUsers, getUser} from "../controllers/user.controller";
import {getAllEvent, getEvent} from "../controllers/event.controller"
const express = require("express")


const router = express.Router()
router.get('/users', (req: Request, res: Response) => getAllUsers(req,res))

router.get('/events', (req: Request, res: Response) => getAllEvent(req,res))

router.get('/event',(req: Request, res: Response) => getEvent(req, res))

router.get('/user', (req: Request, res: Response) => getUser(req, res))

export default router