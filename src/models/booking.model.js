const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "evconnection users",
        required: true
    },
    stationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stations",
        required: true
    },
    startTime: Date,
    endTime: Date,
    status: {
        type: String,
        enum: ["BOOKED", "CANCELLED"],
        default: "BOOKED"
    }
}, { timestamps: true });
const bookingmodel = mongoose.model("Bookings", bookingSchema)

module.exports = bookingmodel