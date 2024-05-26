const {getLocation, getLocations, postLocation}  = require( "../controllers/location.controller.js");
const express  = require( "express");

const router = express.Router()
router.get('/locations', (req, res) => getLocations(req, res))

router.get('/', (req, res) => getLocation(req, res))

router.post('/', (req, res) => postLocation(req, res))

module.exports = router