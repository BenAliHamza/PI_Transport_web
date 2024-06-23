const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middlewares/auth');
const categorieFavorieController = require('../controllers/categorieFavorieController');

router.post('/', verifyToken, categorieFavorieController.createCategorieFavorie);
router.get('/', verifyToken, categorieFavorieController.getAllCategorieFavoriesUser);
router.get('/admin', verifyToken, verifyAdmin, categorieFavorieController.getAllCategorieFavoriesAdmin);
router.get('/:id', verifyToken, categorieFavorieController.getCategorieFavorieById);
router.put('/:id', verifyToken, categorieFavorieController.updateCategorieFavorieById);
router.delete('/:id', verifyToken, categorieFavorieController.deleteCategorieFavorieById);
router.delete('/user/:userId', verifyAdmin, categorieFavorieController.deleteCategorieFavoriesByUser);
module.exports = router;
