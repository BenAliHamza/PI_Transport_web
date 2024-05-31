// routes/vehicule.js
const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const Vehicule = require('../models/Vehicule');
const User = require('../models/User');
const { AddVehiculeValidator, GetVehiculesValidator } = require('../validators/Vehicule');
const { DeleteVehiculeController , AddVehiculeController, GetVehiculesController, GetVehiculeController } = require('../controllers/Vehicule');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', AddVehiculeValidator, verifyToken,validate, AddVehiculeController);

router.delete('/:id', [
  param('id').isMongoId().withMessage('Invalid vehicule ID')
],validate,
DeleteVehiculeController);

router.get('/',GetVehiculesValidator,validate, verifyToken, GetVehiculesController);

router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid vehicule ID')
], validate , GetVehiculeController);

module.exports = router;
