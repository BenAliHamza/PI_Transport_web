const mongoose = require('mongoose')
const reservationSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    offre:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Offre'
    },
    nb_places:  { type: Number, min: 0 },
}, { timestamps: true })

module.exports = mongoose.model("Reservation", reservation_schema)