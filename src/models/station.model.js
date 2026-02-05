const mongoose = require ("mongoose");

const stationSchema = new mongoose.Schema({

    adminid:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "evconnection users"
    },
    name:{
        type: String,
        required: true,
        trim: true,
    }, 
     address:{
        type:String,
        required:true,
     },
     location:{
      type:{
      type:String,
      enum:["Point"],
      required: true
      },
      coordinates:{
        type:[Number],
        required:true
      }
     },
     totalslots:{
        type: Number,
        required: true,
        min:1
     },
     availableslots:{
        type: Number,
       default: function (){
         return this.totalslots
       }
     },
     status:{
        type: String,
        enum:["ACTIVE","INACTIVE"],
        default: "ACTIVE",
        required:true
     }

},{
    timestamps:true
})

stationSchema.index({ location: "2dsphere" });


const stationmodel = mongoose.model("Stations",stationSchema)

module.exports = stationmodel