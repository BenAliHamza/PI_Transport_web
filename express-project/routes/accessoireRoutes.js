
const express = require('express');
const accessoireController = require('../controllers/Accessoire');
const userController = require('../controllers/userController');
const auth= require('../middlewares/auth')
const router = express.Router();
//
router.post('/',/*auth.verifyToken, */accessoireController.createAccessoire);
router.get('/', /*auth.verifyToken,*/accessoireController.getAllAccessoires);
router.get('/:id',/* auth.verifyToken,*/accessoireController.getAccessoireById);
router.patch('/:id', /*auth.verifyToken,*/accessoireController.updateAccessoire);
router.delete('/:id', /*auth.verifyToken,*/accessoireController.deleteAccessoire);

module.exports = router;
