const stationmodel = require("../models/station.model");
const bookingmodel = require("../models/booking.model");
const usermodel = require("../models/user.model");

async function adminanalysis(req, res) {
    const { id } = req.user;

    try {

        const user = await usermodel.findById(id);
        if (!user || user.role !== "Admin") {
            return res.status(403).json({
                message: "Only Admin Can Access"
            });
        }

        const totalStations = await stationmodel.countDocuments();
        const totalBookings = await bookingmodel.countDocuments();
        const activeBookings = await bookingmodel.countDocuments({ status: "BOOKED" });

        const slotsdata = await stationmodel.aggregate([
            {
                $group: {
                    _id: null,
                    totalSlots: { $sum: "$totalslots" },
                }
            }

        ]);
        const totalslots = slotsdata.length > 0 ? slotsdata[0].totalSlots : 0;

        res.status(200).json({
            success: true,
            message: "Admin analysis data fetched successfully",
            data: {
                stations: {
                    totalStations
                },
                bookings: {
                    totalBookings,
                    activeBookings
                },
                slots: {
                    totalslots
                }
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = adminanalysis;
