const express = require("express")
const authmiddleware = require("../middleware/auth.middleware")
const adminanalysis = require("../controller/Analysis.controller")
const router = express.Router()


router.get("/Analysis",authmiddleware,adminanalysis)





module.exports = router