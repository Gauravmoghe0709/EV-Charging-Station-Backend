const express = require('express');
const authmiddleware = require("../middleware/auth.middleware");
const slotcontroller = require('../controller/slotmanage.controller');

const router = express.Router();

router.post("/station/slotmanage/create/:stationid",authmiddleware,slotcontroller.createslots)
router.put("/station/slotmanage/updateslot/:id",authmiddleware,slotcontroller.updateslots)
router.delete("/station/slotmanage/deleteslot/:id",authmiddleware,slotcontroller.deleteslot)
router.get("/station/slotmanage/getslots/:stationid",authmiddleware,slotcontroller.getslots)





module.exports = router; 
