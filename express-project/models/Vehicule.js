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
    places: { 
        type: Number,
        required: true,
        min: 1 
    },
    image : {
        type : String,
        default : 'https://th.bing.com/th/id/OIP.YzUQX26CfWsEy6A0sfPmugAAAA?rs=1&pid=ImgDetMain'
    }
}, { timestamps: true });


module.exports = mongoose.model('Vehicule', vehiculeSchema);