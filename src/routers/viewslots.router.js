const express = require("express")
const authmiddleware = require("../middleware/auth.middleware")
const viewslotscontroller = require("../controller/viewslots.controller")
const router = express.Router()



router.get("/viewslots/:stationid",authmiddleware,viewslotscontroller)


module.exports = router