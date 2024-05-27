const mongoose = require('mongoose');

const reclamationSchema = new mongoose.Schema({
    expediteur:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    titre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        enum : ["Paiement",'Retard',"PanneApplication"],
        required: true
    },
    etat: {
        type: String,
        enum : ["En attente","Traiter"],
        default:"En attente",
    }

}, { timestamps: true });


module.exports = mongoose.model('Reclamation', reclamationSchema);