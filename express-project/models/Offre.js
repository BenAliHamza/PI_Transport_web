const mongoose = require('mongoose');
const Vehicule = require('./Vehicule');
const Subscription = require('./Subscription');
const { SendSubscriptionEmail } = require('../shared/services/transporter');
const { Schema } = mongoose;
const { SendSubcriptionEmail } = require("../shared/services/transporter");

const locationSchema = new mongoose.Schema({
    ville: {
        type: String,
        required: [true, 'Ville is required'],
    },
    adresse: {
        type: String,
        required: [true, 'Adresse is required'],
    },
}, { _id: false });


const offre_schema = new Schema({
    expediteur: {
        type: Schema.Types.ObjectId,
        required: [true, 'Expediteur is required'],
        ref: 'User',
        validate: {
            validator: function (v) {
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
        type: locationSchema,
        required: [true, 'Departure location is required']
    },
    lieu_arrive: {
        type: locationSchema,
        required: [true, 'Arrival location is required']
    },
    heure_depart: {
        type: Date,
        required: [true, 'Departure time is required'],
        validate: {
            validator: function (v) {
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
    vehicule: {
        type: Schema.Types.ObjectId,
        required: [true, 'Vehicule is required'],
        ref: 'Vehicule',
        validate: {
            validator: function (v) {
                return mongoose.Types.ObjectId.isValid(v);
            },
            message: props => `${props.value} is not a valid ObjectId`
        }
    }
}, { timestamps: true });

offre_schema.post('save', async function (doc) {
    const subscriptions = await Subscription.find({
        $or: [
          { topic: new RegExp(doc.lieu_depart.adresse, 'i') },
          { topic: new RegExp(doc.lieu_arrive.adresse, 'i') },  
          { topic: new RegExp(doc.lieu_depart.ville, 'i') },
          { topic: new RegExp(doc.lieu_arrive.ville, 'i') }
        ]
      }).populate('user');

    subscriptions.forEach(async sub => {
        {
            try {
                await SendSubscriptionEmail(sub.user, doc, sub);
                console.log('Emails sent successfully');
            } catch (error) {
                console.error('Error sending email:', error);
            }
        }

    });


});
module.exports = mongoose.model("Offre", offre_schema);
