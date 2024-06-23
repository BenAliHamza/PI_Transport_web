const mongoose = require('mongoose');

const categorieAccessoireSchema = new mongoose.Schema({
    nom: { type: String, required: true, unique: true },
    description: { type: String },

}, { timestamps: true });

const CategorieAccessoire = mongoose.models.CategorieAccessoire || mongoose.model('CategorieAccessoire', categorieAccessoireSchema);

module.exports = CategorieAccessoire;
