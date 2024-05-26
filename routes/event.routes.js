const {getEvent, getEvents, postEvent}  = require("../controllers/event.controller.js");
const express  = require("express");

const router = express.Router();
router.get('/events', (req, res) => getEvents(req,res))
router.get('/',(req, res) => getEvent(req, res))
router.post('/', (req, res) => postEvent(req, res))

module.exports = router;
