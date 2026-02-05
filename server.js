require ("dotenv").config()
const app = require("./src/app")
const connecttodb = require ("./src/Database/Station.Database")


connecttodb()
app.listen(3000,()=>{
    console.log("Station  server running on port 3000")
})