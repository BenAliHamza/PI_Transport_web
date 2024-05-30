const mongoose = require('mongoose')

// Adresse { region , ville }
const AddresseSchema = new mongoose.Schema({
    region:String,
    ville : String
})

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
        type: AddresseSchema,
       // required: true
    },
    lieu_arrive: {// Addresse
        type: AddresseSchema,
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
    },
    status: {
        type: String,
        enum: ["actif", "brouillant", "archivé"],
        default: "brouillant"
    }
}, { timestamps: true })

annonce_schema.index({ createdAt: 1 });
module.exports = mongoose.model("Annonce", annonce_schema)