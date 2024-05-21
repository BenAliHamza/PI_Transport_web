// userValidation.js
const { body, validationResult } = require('express-validator');
const {EMAIL_REGEX, PASSWORD_REGEX} = require("../../shared/services/commonService");
const HttpResponseError = require("../../shared/services/httpResponseError");

const validateUser = [
  body('pseudo')
    .notEmpty().withMessage('Pseudo is required.')
    .isString().withMessage('Pseudo must be a string.'),
  body('firstname')
    .notEmpty().withMessage('First name is required.')
    .isString().withMessage('First name must be a string.'),
  body('lastname')
    .notEmpty().withMessage('Last name is required.')
    .isString().withMessage('Last name must be a string.'),
  body('email')
    .notEmpty().withMessage('Email is required.')
    .matches(EMAIL_REGEX).withMessage('Email is not valid.'),
  body('password')
    .notEmpty().withMessage('Password is required.')
    .matches(PASSWORD_REGEX).withMessage('Password is not valid.'),
  body('phone')
    .optional()
    .isNumeric().withMessage('Phone must be a number.'),
  body('image')
    .optional()
    .isString().withMessage('Image must be a string.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg).join(', ');
      return next(new HttpResponseError(400, errorMessages));
    }
    next();
  }
];
module.exports = { validateUser };
