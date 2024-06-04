const eventRoutes = require("./event.routes.js")
const userRoutes = require("./user.routes.js")
const locationRoutes = require("./location.routes.js")
const watcherRoutes = require("./watcher.routes.js")
const express = require("express")

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({message:"loopz api entry point"})
})

// router.use("/event",eventRoutes)
// router.use("/user",userRoutes)
// router.use("/location", locationRoutes)
// router.use("/watcher", watcherRoutes)

module.exports = router
