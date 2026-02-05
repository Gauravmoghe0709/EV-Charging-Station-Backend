const express = require("express")
const router = express.Router()
const authmiddleware = require("../middleware/auth.middleware")
const bookingcontroller = require("../controller/booking.controller")


router.post("/createbooking",authmiddleware,bookingcontroller.createbooking)
router.delete("/cancelbooking/:id",authmiddleware,bookingcontroller.cancelbooking)
router.get("/getallbookings",authmiddleware,bookingcontroller.getallbookings)




module.exports = router