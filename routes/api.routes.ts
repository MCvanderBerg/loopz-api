import {Request, Response} from "express";
import {getUsers, getUser, postUser} from "../controllers/user.controller";
import {getEvent, getEvents, postEvent} from "../controllers/event.controller"
import {getLocation, getLocations, postLocation} from "../controllers/location.controller";
import * as express from "express"


const router = express.Router()
router.get('/events', (req: Request, res: Response) => getEvents(req,res))
router.get('/event',(req: Request, res: Response) => getEvent(req, res))
router.post('/event', (req: Request, res: Response) => postEvent(req, res))


//////////////////////////////////////////////////////////////////
router.get('/users', (req: Request, res: Response) => getUsers(req,res))

router.get('/user', (req: Request, res: Response) => getUser(req, res))

router.post('/user', (req: Request, res: Response) => postUser(req, res))

//////////////////////////////////////////////////////////////////
router.get('/locations', (req:Request, res: Response) => getLocations(req, res))

router.get('/location', (req: Request, res: Response) => getLocation(req, res))

router.post('/location', (req: Request, res: Response) => postLocation(req, res))


export default router