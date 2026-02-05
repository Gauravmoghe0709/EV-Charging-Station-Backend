const stationmodel = require("../models/station.model");


async function findnearbystations(req, res) {
    try {
        const { latitude, longitude } = req.query;
        if (!latitude || !longitude) {
            return res.status(400).json({ message: "Please provide latitude and longitude" });
        }

        const stations = await stationmodel.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: 10000
                }
            }
        });
        if (stations.length == 0) { return res.status(404).json({ message: "Station not found.." })}

        res.status(200).json({ stations });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
async function findstationbyid(req, res) {
    const id = req.params.id;

    try {
        const station = await stationmodel.findById(id);
        if (!station) {
            return res.status(404).json({ message: "Station not found" });
        }
        res.status(200).json({
            message: "Station found",
            station
        })
    } catch (error) {
        console.log(error)
    }

}
async function findallstations(req, res) {
    try {
        const stations = await stationmodel.find();
        res.status(200).json({
            message: "All stations found",
            stations
        });
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    findnearbystations,
    findstationbyid,
    findallstations
};
