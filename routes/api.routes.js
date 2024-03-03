import {getUsers, getUser, postUser} from "../controllers/user.controller.js";
import {getLocation, getLocations, postLocation} from "../controllers/location.controller.js";
import eventRoutes from "./event.routes.js"
import userRoutes from "./user.routes.js";
import locationRoutes from "./location.routes.js"
import express from "express"

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({message:"Hello line!!!, love you"})
})

router.use("/event",eventRoutes)
router.use("/user",userRoutes)
router.use("/location", locationRoutes)
export default router
