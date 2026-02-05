const express = require('express');
const router = express.Router();
const findstationsController = require('../controller/findstations.controller');
const authmiddleware = require('../middleware/auth.middleware');

router.get("/station/findnearby",authmiddleware,findstationsController.findnearbystations)
router.get("/station/allstations",authmiddleware,findstationsController.findallstations)
router.get ("/station/:id",authmiddleware,findstationsController.findstationbyid)

module.exports = router;
