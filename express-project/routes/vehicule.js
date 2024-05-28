// routes/vehicule.js
const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const Vehicule = require('../models/Vehicule');
const User = require('../models/User');
const { AddVehiculeValidator, GetVehiculesValidator } = require('../validators/Vehicule');
const { DeleteVehiculeController , AddVehiculeController, GetVehiculesController, GetVehiculeController } = require('../controllers/Vehicule');

const router = express.Router();
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
const checkProprietaireExists= async (req, res, next) => {
  const proprietaireId = req.body.proprietaire || req.query.proprietaire || req.params.proprietaire;
  if (proprietaireId) {
    const userExists = await User.findById(proprietaireId);
    if (!userExists) {
      return res.status(404).json({ error: 'Proprietaire not found' });
    }
  }
  next();
}
router.post('/', AddVehiculeValidator, checkProprietaireExists,validate, AddVehiculeController);

router.delete('/:id', [
  param('id').isMongoId().withMessage('Invalid vehicule ID')
],validate,
DeleteVehiculeController);

router.get('/',GetVehiculesValidator,validate, checkProprietaireExists, GetVehiculesController);

// Get a single vehicule by ID
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid vehicule ID')
], validate , GetVehiculeController);

module.exports = router;
