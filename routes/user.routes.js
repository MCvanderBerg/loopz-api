const {getUser, getUsers, signup, login, postUpdateInfo }  = require( "../controllers/user.controller.js");
const express  = require( "express");
const requireAuth = require("../middleware/requireAuth.js");


const router = express.Router()



router.post('/signup', signup)

router.post('/login', login)

router.get('/users',getUsers)


// From here they need to be logged
router.use(requireAuth)

router.post('/updateInfo', postUpdateInfo)

router.get('/',getUser)


//TODO
// router.post('/ProfilePicture', (req, res) => uploadProfilePictur(req, res))

module.exports = router