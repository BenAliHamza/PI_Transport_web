
const express = require('express');
const accessoireController = require('../controllers/Accessoire');
const userController = require('../controllers/userController');
const auth= require('../middlewares/auth')
const {verifyToken} = require("../middlewares/auth");
const router = express.Router();
const { uploaderSingle} = require('../middlewares/multer')
//
router.post('/',verifyToken,  uploaderSingle,accessoireController.createAccessoire);
router.get('/user', verifyToken, accessoireController.getUserAccessoires);
router.get('/',verifyToken,accessoireController.getAllAccessoires);
router.get('/:id',verifyToken,accessoireController.getAccessoireById);
router.patch('/:id',verifyToken,accessoireController.updateAccessoire);
router.delete('/:id',verifyToken,accessoireController.deleteAccessoire);

module.exports = router;
