const mongoose = require('mongoose');
const { Schema } = mongoose;

const offre_schema = new Schema({
    expediteur: {
        type: Schema.Types.ObjectId,
        required: [true, 'Expediteur is required'],
        ref: 'User',
        validate: {
            validator: function(v) {
                return mongoose.Types.ObjectId.isValid(v);
            },
            message: props => `${props.value} is not a valid ObjectId`
        }
    },
    titre: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Title must be at least 3 characters long']
    },
    lieu_depart: {
        type: String,
        required: [true, 'Departure location is required']
    },
    lieu_arrive: {
        type: String,
        required: [true, 'Arrival location is required']
    },
    heure_depart: {
        type: Date,
        required: [true, 'Departure time is required'],
        validate: {
            validator: function(v) {
                return v > Date.now();
            },
            message: props => `Departure time ${props.value} must be in the future`
        }
    },
    type: {
        type: String,
        enum: {
            values: ["Co-Voiturage", 'Livraison', "Taxi"],
            message: '{VALUE} is not supported'
        },
        required: [true, 'Type is required']
    },
    Vehicule: {
        type: Schema.Types.ObjectId,
        required: [true, 'Vehicule is required'],
        ref: 'Vehicule',
        validate: {
            validator: function(v) {
                return mongoose.Types.ObjectId.isValid(v);
            },
            message: props => `${props.value} is not a valid ObjectId`
        }
    }
}, { timestamps: true });

module.exports = mongoose.model("Offre", offre_schema);