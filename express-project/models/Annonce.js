const mongoose = require('mongoose')

// Adresse { region , ville }

const annonce_schema = new mongoose.Schema({
    User :{
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'User'
    },
    titre: {
        type: String,
        //required: true
    },
    lieu_depart: {// Addresse
        type: String,
       // required: true
    },
    lieu_arrive: {// Addresse
        type: String,
        //required: true
    },
    heure_depart: {
        type: Date,
        //required: true
    },
    type: {
        type: String,
        enum : ["Co-Voiturage",'Livraison',"Taxi"],
        //required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Annonce", annonce_schema)