const { body, param , query, validationResult } = require('express-validator');

const AddOffreValidator = [
  body('expediteur')
      .notEmpty().withMessage('Expediteur is required')
      .isMongoId().withMessage('Expediteur must be a valid ObjectId'),
  body('titre')
      .notEmpty().withMessage('Title is required')
      .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
  body('lieu_depart')
      .notEmpty().withMessage('Departure location is required'),
  body('lieu_arrive')
      .notEmpty().withMessage('Arrival location is required'),
  body('heure_depart')
      .notEmpty().withMessage('Departure time is required')
      .isISO8601().withMessage('Departure time must be a valid date')
      .custom((value) => {
          if (new Date(value) <= Date.now()) {
              throw new Error('Departure time must be in the future');
          }
          return true;
      }),
  body('type')
      .notEmpty().withMessage('Type is required')
      .isIn(['Co-Voiturage', 'Livraison', 'Taxi']).withMessage('Type must be one of Co-Voiturage, Livraison, Taxi'),
  body('vehicule')
      .notEmpty().withMessage('Vehicule is required')
      .isMongoId().withMessage('Vehicule must be a valid ObjectId')
]


const UpdateOffreValidator =  [
  body('titre')
      .optional()
      .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
  body('lieu_depart')
      .optional()
      .notEmpty().withMessage('Departure location is required'),
  body('lieu_arrive')
      .optional()
      .notEmpty().withMessage('Arrival location is required'),
  body('heure_depart')
      .optional()
      .isISO8601().withMessage('Departure time must be a valid date')
      .custom((value) => {
          if (new Date(value) <= Date.now()) {
              throw new Error('Departure time must be in the future');
          }
          return true;
      }),
  body('type')
      .optional()
      .isIn(['Co-Voiturage', 'Livraison', 'Taxi']).withMessage('Type must be one of Co-Voiturage, Livraison, Taxi'),
  body('vehicule')
      .optional()
      .isMongoId().withMessage('Vehicule must be a valid ObjectId')
]

const GetOffreValidator = [
  param('id').isMongoId().withMessage('Invalid Offer Id')
]


const GetOffresValidator = [
    query('expediteur').optional().isMongoId().withMessage('Invalid expediteur ID'),
    query('titre').optional().isString(),
    query('lieu_depart').optional().isString(),
    query('lieu_arrive').optional().isString(),
    query('heure_depart').optional().isISO8601().toDate().withMessage('Invalid departure time'),
    query('type').optional().isIn(["Co-Voiturage", 'Livraison', "Taxi"]).withMessage('Invalid type'),
    query('vehicule').optional().isMongoId().withMessage('Invalid vehicule ID')
  ]
module.exports = { AddOffreValidator, GetOffreValidator, UpdateOffreValidator, GetOffresValidator }
