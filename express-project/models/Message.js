const mongoose = require('mongoose');
const Reclamation = require('./Reclamation');

const messageSchema = mongoose.Schema({
    expediteur:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    reclamation:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Reclamation'
    },
    contenu: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Message', message_schema);