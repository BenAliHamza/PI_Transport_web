const express = require('express');
const router = express.Router();
const reclamationController = require('../controllers/Reclamation');
const {verifyToken} = require("../middlewares/auth");

router.post('/', verifyToken, reclamationController.createReclamation);
router.get('/', verifyToken, reclamationController.getReclamations);
router.get('/:id', verifyToken, reclamationController.getReclamationById);
router.put('/:id',verifyToken,  reclamationController.updateReclamation);
router.delete('/:id',verifyToken,  reclamationController.deleteReclamation);

module.exports = router;
