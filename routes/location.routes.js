import {getLocation, getLocations, postLocation} from "../controllers/location.controller.js";
import express from "express";

const router = express.Router()
router.get('/locations', (req, res) => getLocations(req, res))

router.get('/', (req, res) => getLocation(req, res))

router.post('/', (req, res) => postLocation(req, res))

export default router