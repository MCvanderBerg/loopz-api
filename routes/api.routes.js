import eventRoutes from "./event.routes.js"
import userRoutes from "./user.routes.js";
import locationRoutes from "./location.routes.js"
import watcherRoutes from "./watcher.routes.js"
import express from "express"

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({message:"Hello line!!!, love you"})
})

router.use("/event",eventRoutes)
router.use("/user",userRoutes)
router.use("/location", locationRoutes)
router.use("/watcher", watcherRoutes)

export default router
