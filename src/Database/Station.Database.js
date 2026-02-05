const mongoose = require ("mongoose")


async function connecttodb() {
    try {
        
        await mongoose.connect(process.env.MONGOODB_URI)
        console.log("connneted to Database...")
    } catch (error) {
        console.log(error)
    }
}


module.exports = connecttodb