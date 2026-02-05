const express = require("express")
const authcontroller = require("../controller/auth.controller")
const authmiddleware = require ("../middleware/auth.middleware")
const router = express.Router()


/*    Route : /api/auth*/
router.post("/register",authcontroller.registeruser)
router.post("/login",authcontroller.loginuser)
router.post("/logout",authcontroller.logout)
router.get("/aboutme",authmiddleware,authcontroller.aboutme)





module.exports = router