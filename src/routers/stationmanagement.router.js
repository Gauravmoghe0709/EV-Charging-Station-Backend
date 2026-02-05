const express = require("express")
const stationcontroller = require("../controller/station.controller")
const authmiddleware  = require ("../middleware/auth.middleware")
const router = express.Router()


// Sample route for creating a station

router.post("/station/create",authmiddleware,stationcontroller.createstation)
router.put("/station/update/:id",authmiddleware,stationcontroller.updatestation)
router.delete("/station/deletestation/:id",authmiddleware,stationcontroller.deletestation)
router.get("/station/get",authmiddleware,stationcontroller.getallstation)



module.exports = router