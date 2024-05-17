const mongoose = require('mongoose');

const reclamation_schema = mongoose.Schema({
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
        default: "",
        type: String
    },
    type: {
        type: String,
        enum : ["Paiement",'Retard',"PanneApplication"],
        required: true
    }

}, { timestamps: true });


module.exports = mongoose.model('Reclamation', reclamation_schema);