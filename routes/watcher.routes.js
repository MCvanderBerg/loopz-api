import express from "express";
import {getEventWatchers, getWatcher, getWatchers, getUserWatchers} from "../controllers/ticket.controller.js";

const router = express.Router()

router.get("/watchers", (req, res) => getWatchers(req, res))
router.get("/", (req, res) => getWatcher(req, res))

router.get("/forUser", (req, res) => getUserWatchers(req, res))

router.get("/forEvent",(req, res) => getEventWatchers(req, res))

router.post("/", (req, res) => {})

export default router