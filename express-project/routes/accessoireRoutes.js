
const express = require('express');
const accessoireController = require('../controllers/Accessoire');
const router = express.Router();

router.post('/', accessoireController.createAccessoire);
router.get('/', accessoireController.getAllAccessoires);
router.get('/:id', accessoireController.getAccessoireById);
router.patch('/:id', accessoireController.updateAccessoire);
router.delete('/:id', accessoireController.deleteAccessoire);

module.exports = router;
