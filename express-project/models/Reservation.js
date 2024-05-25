const mongoose = require('mongoose')
const reservation_schema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'User'
    },
    message : {
        type : String , 
        //required : true
    },
    nb_places:  { type: Number, min: 0 },
    status:  {
        type: String,
        enum : ["acceptée", "refusé", "en attente"],
        default : "en attente"
        //required: true
    },
    offre:{
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'Offre'
    }
    
}, { timestamps: true })

module.exports = mongoose.model("Reservation", reservation_schema)