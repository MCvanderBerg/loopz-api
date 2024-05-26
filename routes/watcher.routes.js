const express  = require( "express");
const {getEventWatchers, getWatcher, getWatchers, getUserWatchers}  = require( "../controllers/watcher.controller.js");

const router = express.Router()

router.get("/watchers", (req, res) => getWatchers(req, res))
router.get("/", (req, res) => getWatcher(req, res))

router.get("/forUser", (req, res) => getUserWatchers(req, res))

router.get("/forEvent",(req, res) => getEventWatchers(req, res))

router.post("/", (req, res) => {})

module.exports = router