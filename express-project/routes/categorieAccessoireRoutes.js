const express = require('express');
const categorieAccessoireController = require('../controllers/categorieAccessoire');
const router = express.Router();
const {verifyAdmin, verifyToken} = require("../middlewares/auth");

router.post('/', verifyAdmin,categorieAccessoireController.createCategory);
router.get('/', verifyToken,categorieAccessoireController.getAllCategories);
router.get('/:id', verifyToken,categorieAccessoireController.getCategoryById);
router.patch('/:id',verifyAdmin, categorieAccessoireController.updateCategory);
router.delete('/:id', verifyAdmin,categorieAccessoireController.deleteCategory);

module.exports = router;
