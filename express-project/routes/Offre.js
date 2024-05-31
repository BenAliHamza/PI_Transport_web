const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const Offre = require('../models/Offre'); // Adjust the path as needed
const { AddOffreValidator, UpdateOffreValidator, GetOffresValidator, GetOffreValidator } = require('../validators/Offre')
const { verifyToken } = require("./../middlewares/auth");
const { AddOffreController, GetOffreController, GetOffresController, UpdateOffreController } = require("./../controllers/Offre");



const checkVehiculeExists = async (req, res, next) => {
  const vehiculeId = req.body.vehicule || req.query.vehicule || req.params.vehicule;
  if (vehiculeId) {
    const exists = await User.findById(vehiculeId);
    if (!exists) {
      return res.status(404).json({ error: 'Proprietaire not found' });
    }
  }
  next();
}


const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', AddOffreValidator, checkVehiculeExists,validate, AddOffreController);

router.post(
  '/',
  verifyToken,
  AddOffreValidator,
  validate,
  AddOffreController
);

router.patch(
  '/:id',
  UpdateOffreValidator
  ,
  validate,
  verifyToken,
  UpdateOffreController
);

router.get('/:id', verifyToken, GetOffreValidator, validate, GetOffreController);

router.get('/', GetOffresValidator, validate, GetOffresController);

module.exports = router;
