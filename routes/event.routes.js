import {getEvent, getEvents, postEvent} from "../controllers/event.controller.js";
import express from "express";

const router = express.Router();
router.get('/events', (req, res) => getEvents(req,res))
router.get('/',(req, res) => getEvent(req, res))
router.post('/', (req, res) => postEvent(req, res))

export default router;
