import eventRoutes from "./event.routes.js"
import userRoutes from "./user.routes.js";
import locationRoutes from "./location.routes.js"
import watcherRoutes from "./watcher.routes.js"
import express from "express"
import {handleImageUpload} from "../databases/azure.database.js";

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({message:"Hello line!!!, love you"})
})

router.use("/event",eventRoutes)
router.use("/user",userRoutes)
router.use("/location", locationRoutes)
router.use("/watcher", watcherRoutes)

router.post("/image", async (req, res) => await handleImageUpload(req, res))

export default router
