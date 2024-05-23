const mongoose = require('mongoose')
const annonceSchema = new mongoose.Schema({
    expediteur:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    titre: {
        type: String,
        required: true
    },
    lieu_depart: {
        type: String,
        required: true
    },
    lieu_arrive: {
        type: String,
        required: true
    },
    heure_depart: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum : ["Co-Voiturage",'Livraison',"Taxi"],
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Annonce", annonce_schema)