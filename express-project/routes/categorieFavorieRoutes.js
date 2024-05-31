// routes/categorieFavorieRoutes.js

const express = require('express');
const router = express.Router();
const categorieFavorieController = require('../controllers/categorieFavorieController');

// Create a new CategorieFavorie
router.post('/', categorieFavorieController.createCategorieFavorie);

// Get all CategorieFavorie records
router.get('/', categorieFavorieController.getAllCategorieFavories);

// Get a single CategorieFavorie by ID
router.get('/:id', categorieFavorieController.getCategorieFavorieById);

// Update a CategorieFavorie by ID
router.put('/:id', categorieFavorieController.updateCategorieFavorieById);

// Delete a CategorieFavorie by ID
router.delete('/:id', categorieFavorieController.deleteCategorieFavorieById);

module.exports = router;