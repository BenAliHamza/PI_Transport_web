const mongoose = require('mongoose');

const vehiculeSchema = mongoose.Schema({
    proprietaire: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    marque: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    places:
        { type: Number, min: 1 }
}, { timestamps: true });


module.exports = mongoose.model('Vehicule', vehiculeSchema);