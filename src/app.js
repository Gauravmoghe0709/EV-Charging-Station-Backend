const express = require ("express")
const cookieparser = require ("cookie-parser")
const cors = require("cors")
const path = require("path")
const authrouter = require ("../src/routers/auth.router")
const stationmanagement = require ("../src/routers/stationmanagement.router")
const findstationrouter = require ("../src/routers/findstation.router")
const slotmanagementrouter = require ("../src/routers/slotmanagement.router")
const viewslotrouter = require ("../src/routers/viewslots.router")
const bookingsrouter = require ("../src/routers/bookings.router")
const locationrouter = require ("../src/routers/location.route")
const analysisrouter = require("../src/routers/analysis.router")
const app = express()

app.use(express.json())

app.set("trust proxy", 1);
app.use(cors({
  origin: "https://ev-charging-station-t1c7.onrender.com",
  credentials: true
}));
app.use(cookieparser())

app.use("/EvStation",authrouter)
app.use("/EvStation/admin/", stationmanagement)
app.use("/EvStation/", findstationrouter)
app.use("/EvStation/admin/", slotmanagementrouter)
app.use("/EvStation",viewslotrouter)
app.use("/EvStation",bookingsrouter)
app.use("/EvStation/location",locationrouter)
app.use("/EvStation/admin",analysisrouter)

app.get("/", (req, res) => {
  res.send("EVConnect Backend is Live 🚀");
});

app.use(express.static(path.join(__dirname,"client/dist")))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"client/dist/index.html"))
})


module.exports = app



