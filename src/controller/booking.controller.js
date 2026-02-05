const bookingmodel = require("../models/booking.model")
const stationmodel = require("../models/station.model")
const usermodel = require("../models/user.model")

async function createbooking(req, res) {
  try {
    const userId = req.user.id;
    const { stationId, startTime, endTime } = req.body;

    if (!stationId || !startTime || !endTime) {
      return res.status(400).json({
        message: "stationId, startTime and endTime are required"
      });
    }
    const station = await stationmodel.findById(stationId);
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    const existingBookings = await bookingmodel.countDocuments({
      stationId,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime }
    });
    if (existingBookings >= station.totalslots) {
      return res.status(400).json({
        message: "No slots available for this time"
      });
    }

    
    const booking = await bookingmodel.create({
      userId,
      stationId,
      startTime,
      endTime
    });

    station.availableslots = station.availableslots -1
    await station.save()

    res.status(201).json({
      message: "Booking confirmed",
      booking,
      updateslots:station.availableslots
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function cancelbooking(req, res) {
    const {id} = req.user
    const bookingId = req.params.id
        try {
            const user = await usermodel.findById(id)
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                })
            }
            const booking = await bookingmodel.findById(bookingId)
            if (!booking) {
                return res.status(404).json({
                    message: "Booking not found"
                })
            }
            await bookingmodel.findByIdAndDelete(bookingId)
            res.status(200).json({
                message: "Booking cancelled successfully"
            })
        } catch (error) {
            console.log(error)
        }

}  
async function getallbookings(req, res) {
    
  try {
    const bookings = await bookingmodel
      .find({ userId: req.user.id }) 
      .populate({
        path: "stationId",
        select: "name address location status totalslots availableslots"
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      bookings
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
        
} 

module.exports = {
    createbooking,
    cancelbooking,
    getallbookings,
}

