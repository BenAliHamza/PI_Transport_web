const express = require('express');
const categorieAccessoireController = require('../controllers/categorieAccessoire');
const router = express.Router();

router.post('/', categorieAccessoireController.createCategory);
router.get('/', categorieAccessoireController.getAllCategories);
router.get('/:id', categorieAccessoireController.getCategoryById);
router.patch('/:id', categorieAccessoireController.updateCategory);
router.delete('/:id', categorieAccessoireController.deleteCategory);

module.exports = router;
