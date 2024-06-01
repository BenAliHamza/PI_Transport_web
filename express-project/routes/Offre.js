const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const Offre = require('../models/Offre'); // Adjust the path as needed
const { AddOffreValidator, UpdateOffreValidator, GetOffresValidator, GetOffreValidator } = require('../middlewares/validators/Offre')
const { verifyToken } = require("./../middlewares/auth");
const { AddOffreController, GetOffreController, GetOffresController, UpdateOffreController , DeleteOffreController, ConsulterOffresController } = require("./../controllers/Offre");
const User = require('./../models/User');
const Vehicule = require('../models/Vehicule');


const checkVehiculeExists = async (req, res, next) => {
  const vehiculeId = req.body.vehicule || req.query.vehicule || req.params.vehicule;
  if (vehiculeId) {
    console.log(vehiculeId);
    const exists = await Vehicule.findById(vehiculeId);
    if (!exists) {
      return res.status(404).json({ error: 'Vehicule not found' });
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

router.post('/', AddOffreValidator, validate,checkVehiculeExists,verifyToken, AddOffreController);

router.patch(
  '/:id',
  UpdateOffreValidator,
  validate,
  verifyToken,
  UpdateOffreController
);
router.get('/consulter', verifyToken, GetOffreValidator, ConsulterOffresController);

router.get('/:id', verifyToken, GetOffreValidator, validate, GetOffreController);


router.get('/', GetOffresValidator, validate, verifyToken, GetOffresController);
router.delete('/:id', GetOffreValidator, validate, verifyToken , DeleteOffreController );

module.exports = router;
