const userModel = require('../models/user.model');
const SlotManage = require('../models/slotmanage.model');
const stationmodel = require ("../models/station.model")

async function createslots(req,res){
    const {id} = req.user
    const {slots,status} = req.body
    const {stationid} = req.params
    console.log(stationid)
    try {
        const user = await userModel.findById(id)
        if(user.role !== "Admin"){
            return res.status(404).json({
                message:"only admin can create slots"
            })  
        }

        const station = await stationmodel.findById(stationid)
        if(!station){
            return res.status(403).json({
                message: "station not availabel..."
            })
        }
          const result = await SlotManage.create({slots,status,stationid,adminId:id})
            return res.status(200).json({
                message:"slots created successfully",
                data:result
            })
            
    } catch (error) {
        return res.status(500).json({
            message:"internal server error",
            error:error.message
        })
        
    }


}
async function updateslots(req,res){
    const {id} = req.user
    const slotId = req.params.id
    const {slots,status} = req.body
    try {
        const user = await userModel.findById(id)
        if(user.role !== "Admin"){
            return res.status(404).json({
                message:"only admin can update slots"
            })  
        }
            const result = await SlotManage.findByIdAndUpdate(slotId,  
                {$set:{slots:slots,status:status}},
                {new:true})
            return res.status(200).json({
                message:"slots updated successfully",
                data:result
            })
    } catch (error) {
        return res.status(500).json({
            message:"internal server error",
            error:error.message
        })

    }
}
async function deleteslot(req,res){
    const {id} = req.user
    const slotid = req.params.id
    try {
        const user = await userModel.findById(id)
        if(user.role !== "Admin"){
            return res.status(404).json({
                message: "Only admin can delete slots"
            })
        }
        await SlotManage.findByIdAndDelete(slotid)
        return res.status(200).json({
            message: "Slot deleted successfully"
        })  
    } catch (error) {
        console.log(error)
    }
    
}
async function getslots(req,res){
    const {id} = req.user
    const stationid = req.params.stationid
    try {
        const user = await userModel.findById(id)
        if(user.role !== "Admin"){
            return res.status(404).json({
                message: "Only admin can view slots"
            })
        }
        const slots = await SlotManage.find({stationid:stationid})
        return res.status(200).json({
            message: "Slots fetched successfully",
            data:slots
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createslots,
    updateslots,
    deleteslot,
    getslots,

};