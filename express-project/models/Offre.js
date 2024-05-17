const mongoose = require('mongoose')
const offre_schema = new mongoose.Schema({
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
    },
    Vehicule:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Vehicule'
    },
}, { timestamps: true })

module.exports = mongoose.model("Offre", offre_schema)