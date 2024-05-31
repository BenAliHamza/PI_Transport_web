
const { body, query } = require("express-validator")
const AddVehiculeValidator = [
  body('marque').isString().withMessage('Marque must be a string'),
  body('model').isString().withMessage('Model must be a string'),
  body('places').isInt({ min: 1 }).withMessage('Places must be at least 1')
]

const GetVehiculesValidator =  [
  query('proprietaire').optional().isMongoId().withMessage('Invalid proprietaire ID'),
  query('marque').optional().isString(),
  query('model').optional().isString(),
  query('places').optional().isInt({ min: 1 })
]
module.exports = {AddVehiculeValidator, GetVehiculesValidator}
