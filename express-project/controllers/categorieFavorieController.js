// controllers/categorieFavorieController.js

const CategorieFavorie = require('../models/CategorieFavorie');
const User = require('../models/User');
const CategorieAccessoire = require('../models/categorieAccessoire');


// Create a new CategorieFavorie
exports.createCategorieFavorie = async (req, res) => {
  const { user, favoriteCategory } = req.body;

  try {
    // Validate user
    const userExists = await User.findById(user);
    if (!userExists) {
      return res.status(400).json({ error: `User with ID ${user} does not exist` });
    }

    // Validate category
    const categoryExists = await CategorieAccessoire.findById(favoriteCategory);
    if (!categoryExists) {
      return res.status(400).json({ error: `Category with ID ${favoriteCategory} does not exist` });
    }

    const newCategorieFavorie = new CategorieFavorie({
      user,
      favoriteCategory
    });

    const savedCategorieFavorie = await newCategorieFavorie.save();
    res.status(201).json(savedCategorieFavorie);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create CategorieFavorie', details: error.message });
  }
};

// Get all CategorieFavorie records
exports.getAllCategorieFavories = async (req, res) => {
  try {
    const categorieFavories = await CategorieFavorie.find().populate('user').populate('favoriteCategory');
    res.status(200).json(categorieFavories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch CategorieFavories', details: error.message });
  }
};

// Get a single CategorieFavorie by ID
exports.getCategorieFavorieById = async (req, res) => {
  const { id } = req.params;

  try {
    const categorieFavorie = await CategorieFavorie.findById(id).populate('user').populate('favoriteCategory');
    if (!categorieFavorie) {
      return res.status(404).json({ error: 'CategorieFavorie not found' });
    }
    res.status(200).json(categorieFavorie);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch CategorieFavorie', details: error.message });
  }
};

// Update a CategorieFavorie by ID
exports.updateCategorieFavorieById = async (req, res) => {
  const { id } = req.params;
  const { user, favoriteCategory } = req.body;

  try {
    // Validate user
    if (user) {
      const userExists = await User.findById(user);
      if (!userExists) {
        return res.status(400).json({ error: `User with ID ${user} does not exist` });
      }
    }

    // Validate category
    if (favoriteCategory) {
      const categoryExists = await CategorieAccessoire.findById(favoriteCategory);
      if (!categoryExists) {
        return res.status(400).json({ error: `Category with ID ${favoriteCategory} does not exist` });
      }
    }

    const updatedCategorieFavorie = await CategorieFavorie.findByIdAndUpdate(
      id,
      { user, favoriteCategory },
      { new: true, runValidators: true }
    );

    if (!updatedCategorieFavorie) {
      return res.status(404).json({ error: 'CategorieFavorie not found' });
    }

    res.status(200).json(updatedCategorieFavorie);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update CategorieFavorie', details: error.message });
  }
};

// Delete a CategorieFavorie by ID
exports.deleteCategorieFavorieById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategorieFavorie = await CategorieFavorie.findByIdAndDelete(id);

    if (!deletedCategorieFavorie) {
      return res.status(404).json({ error: 'CategorieFavorie not found' });
    }

    res.status(200).json({ message: 'CategorieFavorie deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete CategorieFavorie', details: error.message });
  }
};