const { body, param, query, validationResult } = require('express-validator');

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

exports.registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required')
];

exports.loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required')
];

exports.listingValidation = [
  body('title').trim().isLength({ min: 10, max: 100 }).withMessage('Title must be 10-100 characters'),
  body('description').trim().isLength({ min: 50, max: 5000 }).withMessage('Description must be 50-5000 characters'),
  body('propertyType').notEmpty().withMessage('Property type is required'),
  body('roomType').notEmpty().withMessage('Room type is required'),
  body('accommodates').isInt({ min: 1 }).withMessage('Accommodates must be at least 1'),
  body('bedrooms').isInt({ min: 0 }).withMessage('Bedrooms must be 0 or more'),
  body('beds').isInt({ min: 1 }).withMessage('Beds must be at least 1'),
  body('bathrooms').isFloat({ min: 0.5 }).withMessage('Bathrooms must be at least 0.5'),
  body('pricing.basePrice').isFloat({ min: 0 }).withMessage('Base price must be 0 or more')
];

exports.bookingValidation = [
  body('listing').isMongoId().withMessage('Valid listing ID required'),
  body('checkInDate').isISO8601().withMessage('Valid check-in date required'),
  body('checkOutDate').isISO8601().withMessage('Valid check-out date required'),
  body('numberOfGuests.adults').isInt({ min: 1 }).withMessage('At least 1 adult required')
];

exports.reviewValidation = [
  body('booking').isMongoId().withMessage('Valid booking ID required'),
  body('rating.overall').isInt({ min: 1, max: 5 }).withMessage('Overall rating must be 1-5'),
  body('comment').trim().isLength({ min: 10, max: 2000 }).withMessage('Comment must be 10-2000 characters')
];
