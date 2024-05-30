const express = require('express');
const router = express.Router();
const reclamationController = require('../controllers/Reclamation');

router.post('/', reclamationController.createReclamation);
router.get('/', reclamationController.getReclamations);
router.get('/:id', reclamationController.getReclamationById);
router.patch('/:id', reclamationController.updateReclamation);
router.delete('/:id', reclamationController.deleteReclamation);

module.exports = router;
