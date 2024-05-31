const mongoose = require('mongoose')
const reservation_schema = new mongoose.Schema({

    message : {
        type : String ,
    },
    places:  { type: Number, min: 0 },
    status:  {
        type: String,
        enum : ["acceptée", "refusé", "en attente"],
        default : "en attente"
    },
    user:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
    offre:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Offre'
    }

}, { timestamps: true })

module.exports = mongoose.model("Reservation", reservation_schema)
