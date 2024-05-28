const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const Offre = require('../models/Offre'); // Adjust the path as needed
const { AddOffreValidator, UpdateOffreValidator, GetOffresValidator, GetOffreValidator } = require('../validators/Offre')
const { verifyToken } = require("./../middlewares/auth");
const { AddOffreController, GetOffreController, GetOffresController, UpdateOffreController } = require("./../controllers/Offre");
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


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
  verifyToken,
  validate,
  UpdateOffreController
);

router.get('/:id', verifyToken, GetOffreValidator, validate, GetOffreController);

router.get('/', GetOffresValidator, validate, GetOffresController);

module.exports = router;
