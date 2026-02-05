const stationmodel = require ("../models/station.model")
const usermodel = require ("../models/user.model")

async function viewslots(req,res){
    const {id} = req.user
    const {stationid} = req.params

    try {
        const user = await usermodel.findById(id) 
        if(!user){
            return res.status(404).send({message:"User not found"})
        }
        const station = await stationmodel.findById(stationid)
        if(!station){
            return res.status(404).send({message:"Station not found"})
        }      
        return res.status(200).send({
            message:"Available slots fetched successfully",
            station,
            totalslots:station.totalslots,
            availableslots:station.availableslots
        })
    } catch (error) {
        return res.status(500).send({message:"Internal server error",error:error.message})       
    }
}



module.exports = viewslots