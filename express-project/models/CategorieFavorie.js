const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorieFavorieSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async function (v) {
        const user = await mongoose.model('User').findById(v);
        return user !== null;
      },
      message: props => `User with ID ${props.value} does not exist!`
    }
  },
  favoriteCategory: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
      validator: async function (v) {
        const category = await mongoose.model('Category').findById(v);
        return category !== null;
      },
      message: props => `Category with ID ${props.value} does not exist!`
    }
  }
});
const CategorieFavorie = mongoose.model('CategorieFavorie', categorieFavorieSchema);

module.exports = CategorieFavorie;