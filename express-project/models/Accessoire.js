const mongoose = require('mongoose');

const accessoire_schema = mongoose.Schema({
    expediteur:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description:{
        type: String,
        required: true,
        default: ""
    },
    titre: {
        type: String,
        required: true
    },
    prix: 
    { type: Number, min: 0 },
    etat: {
        type: string,
        enum : ["Vendue",'Disponible'],
        default: "Disponible"
    }
}, { timestamps: true });

module.exports = mongoose.model('Accessoire', accessoire_schema);