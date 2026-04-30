import { body, param } from 'express-validator';

export const createCategoryValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('seats').isInt({ min: 1 }).withMessage('Seats must be at least 1'),
  body('luggage').isInt({ min: 0 }).withMessage('Luggage must be at least 0'),
  body('ac').optional().isBoolean(),
  body('baseDisplayPrice').optional().isNumeric(),
  body('sortOrder').optional().isInt(),
];

export const updateCategoryValidator = [
  param('id').isMongoId().withMessage('Invalid category ID'),
  body('name').optional().trim().notEmpty(),
  body('seats').optional().isInt({ min: 1 }),
  body('luggage').optional().isInt({ min: 0 }),
  body('ac').optional().isBoolean(),
  body('baseDisplayPrice').optional().isNumeric(),
  body('sortOrder').optional().isInt(),
];

export const categoryIdValidator = [
  param('id').isMongoId().withMessage('Invalid category ID'),
];
