import { body, param } from 'express-validator';

export const createPricingValidator = [
  body('serviceType').isIn(['airport', 'outstation', 'tours']).withMessage('Invalid service type'),
  body('tripMode').notEmpty().withMessage('Trip mode is required'),
  body('vehicleCategoryId').isMongoId().withMessage('Invalid vehicle category ID'),
  body('baseFare').isNumeric().withMessage('Base fare must be a number'),
  body('perKmRate').isNumeric().withMessage('Per km rate must be a number'),
  body('minimumKm').optional().isNumeric(),
  body('driverAllowance').optional().isNumeric(),
  body('packagePrice').optional().isNumeric(),
];

export const updatePricingValidator = [
  param('id').isMongoId().withMessage('Invalid pricing ID'),
  body('baseFare').optional().isNumeric(),
  body('perKmRate').optional().isNumeric(),
  body('minimumKm').optional().isNumeric(),
  body('driverAllowance').optional().isNumeric(),
  body('packagePrice').optional().isNumeric(),
  body('isActive').optional().isBoolean(),
];

export const pricingIdValidator = [
  param('id').isMongoId().withMessage('Invalid pricing ID'),
];
