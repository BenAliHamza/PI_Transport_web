
const express = require('express');
const accessoireController = require('../controllers/Accessoire');
const userController = require('../controllers/userController');
const auth= require('../middlewares/auth')
const {verifyToken} = require("../middlewares/auth");
const router = express.Router();
//
router.post('/',verifyToken, accessoireController.createAccessoire);
router.get('/',verifyToken,accessoireController.getAllAccessoires);
router.get('/:id',verifyToken,accessoireController.getAccessoireById);
router.patch('/:id',verifyToken,accessoireController.updateAccessoire);
router.delete('/:id',verifyToken,accessoireController.deleteAccessoire);

module.exports = router;
