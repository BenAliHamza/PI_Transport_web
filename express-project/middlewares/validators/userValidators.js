// userValidation.js
const { body, validationResult } = require('express-validator');
const {EMAIL_REGEX, PASSWORD_REGEX , PHONE_REGEX , ROLE_REGEX , STATUS_REGEX} = require("../../shared/services/commonService");

const validateUserCreation = [
  body('firstname')
    .notEmpty().withMessage('First name is required.')
    .isString().withMessage('First name must be a string.')
    .matches(/^[A-Za-z]+( [A-Za-z]+)*$/).withMessage('firstname  must contain only letters.')
,
  body('lastname')
    .notEmpty().withMessage('Last name is required.')
    .isString().withMessage('Last name must be a string.')
    .matches(/^[A-Za-z]+( [A-Za-z]+)*$/).withMessage('lastname  must contain only letters.'),
  body('email')
    .notEmpty().withMessage('Email is required.')
    .matches(EMAIL_REGEX).withMessage('Email is not valid.'),
  body('password')
    .notEmpty().withMessage('Password is required.')
    .matches(PASSWORD_REGEX)
    .withMessage('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.'),
  body('phone')
    .optional()
    .isNumeric().withMessage('Phone must be a number.')
    .isLength({ min: 8, max: 8 }).withMessage('Phone must be exactly 8 digits long.'),
  body('image')
    .optional()
    .isString().withMessage('Image must be a string.'),
  body('ville')
    .notEmpty().withMessage('Ville is required.')
    .isString().withMessage('Ville must be a string.'),
  body('role')
    .optional()
    .custom((value, { req }) => {
      if (!value) {
        req.body.role = 'DEFAULT';  // Default to 'DEFAULT' if empty string or null
        return true;  // Validation passes
      }
      return ROLE_REGEX.test(value);  // Validate against ROLE_REGEX
    })
    .withMessage('Role must be one of DEFAULT,ADMIN or TAXI.'),
  body('status')
    .optional()
    .custom((value, { req }) => {
      if (!value) {
        req.body.status = 'PENDING';  // Default to 'PENDING' if empty string or null
        return true;  // Validation passes
      }
      return STATUS_REGEX.test(value);  // Validate against regex
    })
    .withMessage('Status must be one of PENDING, APPROVED, REJECTED, or BANNED.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(403).json ({ errors: validationResult(req).array() });
    } else {
      next();
    }
  }
];

const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email cannot be empty')
    .isEmail().withMessage('Email must be a valid email address'),
    body("password")
    .trim()
    .notEmpty().withMessage('Password cannot be empty')
]
module.exports = { validateUserCreation, validateLogin };
