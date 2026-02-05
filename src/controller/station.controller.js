const stationmodel = require("../models/station.model")
const usermodel = require("../models/user.model")
const { getCoordinatesFromOSM } =  require("../utils/geocodeOSM.js")

async function createstation(req, res) {

    const { id } = req.user

    const { name, address, latitude, longitude, totalslots,status } = req.body



    try {

        const user = await usermodel.findById(id)
        if (user.role !== "Admin") {
            return res.status(403).json({
                message: "only Admin can create Station" 
            })
        }

        const station = await stationmodel.findOne({ name: name })
        if (station) {
            return res.status(400).json({
                message: "Station Already Exist..."
            })
        }
        const newstation = await stationmodel.create({
            name,
            address,
            location: {
                type: "Point",
                coordinates:[longitude,latitude]
            },
            totalslots,
            status:status || "ACTIVE",
            adminid: id
        })

        return res.status(201).json({
            message: "Station Created Successfully",
            station: newstation
        })

    } catch (error) {
        console.log(error)

    }

}
async function updatestation(req, res) {
    try {
    const { name, address, totalslots, status } = req.body;
    const coordinates = await getCoordinatesFromOSM(address);

    const updatedStation = await stationmodel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        address,
        coordinates,
        totalslots,
        status,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Station updated successfully",
      data: updatedStation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
async function deletestation(req, res) {
    const userid = req.user._id
    const id = req.params.id

    try {
        const user = await usermodel.findById(userid)
        if (user.role !== "Admin") {
            return res.status(400).json({
                message: "Only Admin Can Delete Station"
            })
        }

        await stationmodel.findByIdAndDelete(id)
        res.status(200).json({
            message: "Station deleted...",
            
        })

    }
    catch (error) {
        console.log(error)
    }
}
async function getallstation(req, res) {
    const id = req.user._id

    try {

        const user = await usermodel.findById(id)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        if (user.role !== "Admin") {
            return res.status(400).json({
                message: "Only Admin Can View Station"
            })
        }
        const stations = await stationmodel.find({ adminid: id })
        res.status(200).json({
            message: "Stations fetched successfully",
            stations
        })
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    createstation,
    updatestation,
    deletestation,
    getallstation


}