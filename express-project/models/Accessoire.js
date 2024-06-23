const mongoose = require('mongoose');

const accessoireSchema = new mongoose.Schema({
    expediteur: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: {
        type: String,
        required: true,
        default: ""
    },
    titre: {
        type: String,
        required: true,
        default: ""
    },
    prix: {
        type: Number,
        min: 0
    },
    etat: {
        type: String,
        enum: ["Vendue", "Disponible"],
        default: "Disponible"
    },
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategorieAccessoire',
        required: true,
        default : ""
    },
    image: {
        type: String, // You can store the URL or file path
        default: ""
    }
}, { timestamps: true });

const Accessoire = mongoose.models.Accessoire || mongoose.model('Accessoire', accessoireSchema);

module.exports = Accessoire;
