const mongoose = require ("mongoose")

const userschema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require:true
    },
    password:{
        type: String,
    },
    role:{
        type: String,
        enum:["User","Admin"],
        default: "User"
    }

})

const usermodel = mongoose.model("evconnection users",userschema)

module.exports = usermodel