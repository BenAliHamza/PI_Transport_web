
const { body } = require("express-validator")
const AddVehiculeValidator = [
  body('proprietaire').isMongoId().withMessage('Invalid proprietaire ID'),
  body('marque').isString().withMessage('Marque must be a string'),
  body('model').isString().withMessage('Model must be a string'),
  body('places').isInt({ min: 1 }).withMessage('Places must be at least 1')
]


module.exports = {AddVehiculeValidator}
