const mongoose = require('mongoose');

const slotmanageschema = mongoose.Schema({
    stationid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'stations',
        required:true   
    },
    slots:{
        type:Number,
        required:true,
        min:5
    },
    status:{
        type:String,
        enum: ['VACANT','OCCUPIED','UNDER_MAINTENANCE'],
        default:'VACANT'
    },
    createdAt:{
        type:Date,
        default:Date.now    
    }   

},{
    timestamps:true
})
const SlotManage = mongoose.model('slotsmanage',slotmanageschema);

module.exports = SlotManage;