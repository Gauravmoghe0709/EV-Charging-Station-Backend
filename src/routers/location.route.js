const express = require("express")
const addressToCoords  =  require("../controller/location.controller")

const router = express.Router();

router.get("/coords", addressToCoords);

module.exports= router;
