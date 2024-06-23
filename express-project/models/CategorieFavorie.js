const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorieFavorieSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  favoriteCategory: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});


const CategorieFavorie = mongoose.model('CategorieFavorie', categorieFavorieSchema);

module.exports = CategorieFavorie;
